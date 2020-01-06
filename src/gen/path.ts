import { Config, ParsedSchemaObject, ParsedSchema } from "../utils";
import { uniq, isEmpty } from "lodash";
import { formatCode } from "../utils";
import { Api, ApiCollection } from "../parse/path";

const RELATIVE_PATH = "./interface"; // interface 的相对路径

const isParsedSchemaObject = (
  paramsInterface: ParsedSchema
): paramsInterface is ParsedSchemaObject =>
  Object.keys(paramsInterface).some(
    // @ts-ignore
    key => typeof paramsInterface[key] !== "object"
  );

const genParsedSchema = (paramsInterface?: ParsedSchema): string => {
  if (!paramsInterface || isEmpty(paramsInterface)) return "";

  if (isParsedSchemaObject(paramsInterface)) {
    return paramsInterface.type;
  } else {
    return `{
    ${Object.entries(paramsInterface)
      .map(
        ([propName, prop]) =>
          `"${propName}"${prop.required ? "" : "?"}: ${prop.type}`
      )
      .join(",")}
      }`;
  }
};

const genIParams = ({
  pathParamsInterface,
  queryParamsInterface,
  bodyParamsInterface,
  method
}: Api): { IPathParams: string; IParams: string } => ({
  IParams: genParsedSchema(
    method === "get" ? queryParamsInterface : bodyParamsInterface
  ),
  IPathParams: genParsedSchema(pathParamsInterface)
});

const genImportRequestLibraryCode = (
  customImportCode: Config["customImportCode"]
): string => customImportCode || `import axios from "axios";`;

const genImportInterfaceCode = (apiCollection: ApiCollection): string => {
  const importsInterface = uniq(
    Object.keys(apiCollection)
      .map(key => apiCollection[key])
      .reduce<string[]>((acc, cur) => [...acc, ...cur.imports], [])
  );
  if (isEmpty(importsInterface)) return "";
  return `import {${importsInterface.join(",")}} from "${RELATIVE_PATH}";`;
};
// 生成单个 ts 文件中的所有 path
const genPaths = (
  apiCollection: ApiCollection,
  { template: templateFn, customImportCode, lang }: Config
): string => {
  let code =
    lang === "ts"
      ? `// @ts-nocheck \n/* eslint-disable */\n`
      : "/* eslint-disable */\n";
  code += lang === "ts" ? genImportInterfaceCode(apiCollection) : "";
  code += genImportRequestLibraryCode(customImportCode);

  Object.entries<Api>(apiCollection).forEach(([name, api]) => {
    const { IPathParams, IParams } = genIParams(api);
    code += templateFn!({
      name,
      method: api.method,
      url: api.url,
      responseType: api.responseInterface.isBinary ? "blob" : "json",
      deprecated: api.deprecated,
      summary: api.summary,
      IResponse: api.responseInterface.type,
      IParams,
      IPathParams
    });
  });
  return formatCode(code, lang);
};

export { genPaths };

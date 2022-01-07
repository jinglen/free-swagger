export function getMagicRgeExp(pathName) {
  //   var template = "/resources/extra/list/2323";
  // var  template = '/resources/extra/list/{id}'
  const stand = "isadsafadassfdadsaffsdljkjkjk";

  const final = pathName
    .replaceAll("/", "\\/")
    .replaceAll("-", "\\-")
    .replaceAll("_", "\\_")
    .replace(/[0-9]{1,}/g, `\{${stand}}`)
    .replaceAll(stand, "\\w{1,}");

  return new RegExp(`^${final}$`);
}

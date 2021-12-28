module.exports = {
  env: {
    node: true
  },
  parserOptions: {
    parser: "babel-eslint"
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  "rules": {
    "linebreak-style": [1,"windows"]
  }
};

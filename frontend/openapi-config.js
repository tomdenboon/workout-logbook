/** @type {import("@rtk-query/codegen-openapi").ConfigFile} */
const config = {
  schemaFile: 'http://localhost/api/docs',
  apiFile: './src/store/emptyMonkeylogApi.ts',
  apiImport: 'emptyMonkeylogApi',
  responseSuffix: 'Response',
  requestSuffix: 'Request',
  argSuffix: 'Arg',
  outputFile: './src/store/baseMonkeylogApi.ts',
  exportName: 'baseMonkeylogApi',
};

export default config;

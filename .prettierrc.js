/** @type {import("prettier").Config} */
export default {
  singleQuote: true,
  trailingComma: 'es5',
  semi: true,
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: ['<THIRD_PARTY_MODULES>', '^[@lib]', '^[@demo]', '^[./]'],
};

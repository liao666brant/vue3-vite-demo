module.exports = {
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
  },
  env: {
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser', // 然后使用 @typescript-eslint/parser 来解析 typescript
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  //定义eslint依赖的插件
  plugins: ['@typescript-eslint', 'prettier', 'simple-import-sort'],
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier'],
  rules: {
    'no-unused-vars': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'vue/no-mutating-props': 'off',
    '@typescript-eslint/no-explicit-any': ['off'],
    'vue/require-default-prop': 'off',
    'vue/component-tags-order': [
      'error',
      {
        order: [['template', 'script'], 'style'],
      },
    ],
    'vue/multi-word-component-names': [
      'warn',
      {
        ignores: ['index'],
      },
    ],
    'sort-imports': 'off',
    'import/order': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};

module.exports = {
    root: true,
    env: {
      node: true,
    },
    extends: [
      'plugin:vue/vue3-essential',
      'eslint:recommended',
      '@vue/eslint-config-typescript',
    ],
    parserOptions: {
      parser: '@typescript-eslint/parser',
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      // เพิ่มกฎอื่นๆ ตามต้องการ
    },
  }
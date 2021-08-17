module.exports = {
    root: true, //此项是用来告诉eslint找当前配置文件不能往父级查找
    env: {
      node: true //此项指定环境的全局变量，下面的配置指定为浏览器环境
    },
    'extends': [
      'plugin:vue/essential',
      '@vue/standard'
    ],
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      "no-irregular-whitespace": 0,//不能有不规则的空格
      "max-len" : ["error", {code : 500}] ,//一行编码最多不能超过300字符。
      "eol-last":'off',
      'eqeqeq': 'off', // 关闭===代替==的告警
      "no-unused-vars": [0, {"vars": "all", "args": "after-used"}],//不能有声明后未被使用的变量或参数
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      // 暂时关闭锁进限制
      "indent": 'off',
      // "vue/html-indent": ["error", 2, {
      //   "attribute": 1,
      //   "baseIndent": 1,
      //   "closeBracket": 0,
      //   "alignAttributesVertically": true,
      //   "ignores": []
      // }]
    },
    parserOptions: {
      parser: 'babel-eslint'
    }
  }
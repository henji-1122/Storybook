module.exports = plop => {
  // 通过setGenerator创建生成器
  plop.setGenerator('component', {
    description: 'create a custom component',
    // 交互式的方式提示用户输入组件的名字
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'component name',
        default: 'MyComponent'
      }
    ],
    // 基于模板创建的文件放在指定的目录中
    actions: [
      {
        type: 'add',
        path: 'packages/{{name}}/src/{{name}}.vue',
        templateFile: 'plop-template/component/src/component.hbs'
      },
      {
        type: 'add',
        path: 'packages/{{name}}/__tests__/{{name}}.test.js',
        templateFile: 'plop-template/component/__tests__/component.test.hbs'
      },
      {
        type: 'add',
        path: 'packages/{{name}}/stories/{{name}}.stories.js',
        templateFile: 'plop-template/component/stories/component.stories.hbs'
      },
      {
        type: 'add',
        path: 'packages/{{name}}/index.js',
        templateFile: 'plop-template/component/index.hbs'
      },
      {
        type: 'add',
        path: 'packages/{{name}}/LICENSE',
        templateFile: 'plop-template/component/LICENSE'
      },
      {
        type: 'add',
        path: 'packages/{{name}}/package.json',
        templateFile: 'plop-template/component/package.hbs'
      },
      {
        type: 'add',
        path: 'packages/{{name}}/README.md',
        templateFile: 'plop-template/component/README.hbs'
      }
    ]
  })
}
## 项目介绍
* 创建Monorepo的项目结构，在一个项目中管理多个包，这种方式更适合管理组件库和发布每个组件；
* 使用Storybook搭建项目,让用户快速预览组件；
* 使用yarn workspace管理所有包的依赖；
* 使用lerna发布项目，将每个包发布到npm上；
* 测试和打包
* 使用plop基于模板生成组件基本结构



### monorepo的方式来管理的本项目
* 开发的组件库为了让别人使用方便，会将每个组件打包成单独包发布到NPM上，其他人使用时只需要下载他需要的组件，当然也可以将所有的组件一起打包发布
* 有两种项目的组织方式
  - Multirepo(Multiple Repository 多仓库)
    * 每一个包对应一个项目，(都需要有自己的脚手架，都需要下载和管理自己的依赖，都需要单独发布，多个组件可能会有相同的依赖，避免不了这些依赖的重复下载，占用硬盘空间).
  - Monorepo(Monolithic Repository)
    * 一个项目仓库中管理多个模块/包(根目录只放脚手架，所有的组件都放在根目录下的同一个目录packages下,每一个组件在此目录下配置一个子文件夹设置为包，因为所有的组件管理都比较类似，相关的配置都放在根目录，不同的组件可能有相同的依赖，只需要下载一份，将来测试、打包、发布都可以在当前项目进行统一的管理，这样管理项目对组件库的开发会更方便。很多知名的开源库都采用这种管理方式，如vue3、react、angular、babel、react-router、create-react-app...)

* 通过Monorepo的方式组织项目结构，让每个包单独测试、单独发布以及统一管理他们的依赖
* 通过Monorepo管理项目结构： 
    ```JS                 
    packages （所有要开发的组件）                            
    |__ button          
    ---|__ > tests：测试相关代码             
    ---|__ > dist：打包的目录                             
    ---|__ > src：当前包的源码(.vue文件)                      
    ---|__ index.js：打包时入口                            
    ---|__ LICENSE：版权，存放开源协议的描述(MIT)       
    ---|__ README.md：相关文档             
    ---|__ api-extractor.json：配置文件          
    ---|__ package.json：包的描述           
    |__ form           
    |__ formItem         
    |__ input         
    |__ steps  
    ```      



### yarn storybook
* Storybook是一个开发组件库必备的开源库
* 可以将每一个组件想象成一个故事，Storybook就像是讲述一个个故事

* Storybook介绍
  - 可视化的组件展示平台
  - 在隔离的开发环境中，以交互式的方式展示组件
  - Storybook在主程序外运行，用户可以独立开发组件库，而不必担心应用程序特定的依赖关系，也就是将程序的开发和组件的开发分离，在Storybook中开发组件预览并测试，组件开发完成可以在主程序或别人直接使用开发好的组件
  - 支持很多框架，支持开发以下库的组件
      * React、React Native、Vue、Angular
      * Ember、HTML、Svelte、Mithril、Riot
  - Storybook支持很多的插件，并提供灵活的API，可以根据需要自定义Storybook，还可以构建Storybook的静态版本并将其部署到服务器

* 结合vue讲解Storybook的使用
  - 自动安装
      * npx -p @storybook/cli sb init --type vue
        - 通过npx使用storybook的最新命令行工具在一个已有的项目中进行初始化，这个命令行工具会在当前项目中创建一个示例的button和welcome组件，init命令会自动检查当前项目使用的框架，如果使用空项目就可以通过--type强制使用vue的方式进行初始化，同时会安装必要的依赖
      * yarn add vue
        - 安装vue，这里使用yarn因为后面还要用到yarn的工作区
      * yarn add vue-loader vue-template-compiler --dev
  - 手动安装：看文档

  - 安装完成后storybook就初始化完毕，在package.json中记录了所有的依赖，scripts中初始化了两个命令：
        ```js
        "scripts": {          
            "storybook": "start-storybook -p 6006", // 启动storybook            
            "build-storybook": "build-storybook" // 打包生成一个静态的网站              
        }
        ```
  - 使用Monorepo的方式管理项目
  - 编写Storybook中的stories
      * 组件库packages放在项目根目录下，并给每个组件文件夹下新建一个stories文件夹
      * 修改配置文件.storybook/main.js，修改stories的路径
      * 每个组件中stories文件夹下创建：xxx.stories.js
  - 运行：yarn storybook（启动预览组件效果）
      * 构建完成后回自动打开浏览器，预览组件的story
  - 构建：yarn build-storybook
      * 会生成一个storybook-static的静态文件夹，把这个项目构建成静态网站，可以把这个文件夹下的构建结果直接在浏览器打开预览或发布到web服务器。
      * 我们可以在此项目中先开发组件，等组件开发完然后再写story来查看组件的渲染结果
      * 在storybook中可以方便的查看组件，并以交互的方式展示组件



### 开启yarn workspace工作区
  - 项目根目录的package.json中开启yarn的工作区  
        ```bash
        "private": true, // 组件库开发完后发布到npm上，而工作区的根目录一般是脚手架，不需要发布，这里是防止意外把根目录的提交内容暴露出去               
        "workspaces":  [         
            "./packages/*"  // 管理的所有包的路径，使用 * 指定packages下的任意包           
        ] 
        ```  
  - 可以把所有包具有的依赖都安装在工作区根目录下的node_modules中
  - 给工作区根目录安装开发依赖
      * yarn add jest -D -W （jest是Facebook出的单元测试工具，-D是开发依赖，-W是工作区指安装到工作区的根目录）
  - 给指定工作区安装依赖
      * yarn workspace wxc-button add lodash@4 （wxc-button：包名，这里的包名是package.json中的name，不是文件夹的名字）
  - 给所有的工作区安装依赖
      * yarn install （如果所有的包中都有各自的依赖，别人从github上获取项目后可直接install安装所有包的依赖，无需一个个包来安装，如果多个包依赖相同的包，会自动提升到工作区的根目录下的node_modules中，防止重复下载节约空间，不需要在每个包的node_modules中存储）

  * 如果各自的包中有各自的依赖，此时多数情况下会将依赖提升到根目录下的node_modules中，让所有的包去复用，如果有不同版本，会给这个包单独下载安装防止意外。
  * Monorepo的项目结构一般都会配合yarn workspaces来管理包的依赖，vue3和react项目中都开启了workspaces，目的就是方便管理依赖。




### Lerna
  当组件都开发完成，想要把组件提交到github或者npm，可以使用lerna，方便把项目中的包统一发布
  * lerna介绍
      - lerna是babel自己用来维护自己的Monorepo并开源出的一个项目
      - lerna是一个优化使用git和npm管理多包仓库的工作流工具
      - 用于管理具有多个包的javascript项目
      - 它可以一键把代码提交到git和npm仓库
      - lerna也可以管理包的依赖，他可以选择使用mpm还是yarn管理依赖，需要单独配置，如果使用yarn的话也可以开启yarn的workspace，一般会将lerna和yarn workspace配合使用：使用lerna发布，使用yarn workspace管理依赖
  
  * lerna使用
      - 全局安装
          * yarn global add lerna
      - 初始化
          * lerna init (初始化后如果当前项目没有被git管理的话会进行git的初始化，在项目根目录下自动创建一个lerna.json的配置文件，在package.json中添加开发依赖)
      - 创建.gitignore文件，忽略node_modules
      - package.json的scripts中添加发布命令："lerna": "lerna publish"
      - 发布
          * git add .
          * git commit -m "init"
          * github上创建空仓库
          * git remote add origin https://github.com/xxxx/xxxx.git
          * git push -u origin master
          * 登录npm (npm whoami查看是否登录到npm)
          * 发布前检查npm的镜像源是否为npmjs(npm config get registry)
          * 执行：yarn lerna （会执行lerna publish）进行发布
          * 此时会询问此次发布的版本号、是否要提交这些包 (先在github创建远程仓库、登录到npm，再运行时会同时将项目提交到github，所有的包发布到npm)
    
    * 如果npm上有重名的包则无法发布成功
      - 当执行lerna publish后会把当前提交的版本和当前提交的git最新的hash值都记录在了每个包的package.json中：
          * "version": "0.0.2",
          * "gitHead": "06cf8581dfe223b4b06f719cf3f2362a8daef6fb"
      - 将发布失败的包名重新修改后再次发布:yarn lerna
      - 此时发布成功，但是提示包名修改也不能提交
      - 此时需要将所有包重新提交一次：
          * git add .
          * git commit -m 'second'
          * yarn lerna
          * 提示更新到版本号、是否发布包
          * 提示执行成功
      - 在https://www.npmjs.com/中查看是否发布成功



### Vue组件的单元测试
* 在组件开发完毕发布之前，应该对组件进行单元测试
* 单元测试就是对一个函数的输入和输出进行测试，使用断言的方式，就是根据输入判断实际的输出和预测的输出是否相同
* 配置单元测试的环境
    - 安装依赖
        * Vue Test Utils (vue官方提供的单元测试库，需要结合一个测试框架一起使用)
        * Jest (facebook出的单元测试框架，和vue的配合比较方便、配置最少)
        * vue-jest (Jest可以进行单元测试，但是并不支持单文件组件，所以需要一个预处理器，把vue单文件组件编译后的结果即js代码交给Jest处理，vue官方提供了一个为jest服务的预处理器vue-jest，他支持单文件组件的大多数功能)
        * babel-jest(测试文件中会使用到ESModule的语法和一些ES新特性的语法，需要使用babel-jest插件对测试代码进行降级处理)
    - 安装测试时需要的开发依赖
        * yarn add jest @vue/test-utils vue-jest babel-jest -D -W

    - 配置测试脚本
        * package.json 配置运行单元测试的脚本 
            ```js                
            "scripts": {              
                "test": "jest",               
                ....                            
            }
            ``` 

    - Jest配置文件
        * jest.config.js 项目根目录下创建 
            ```js          
            module.exports = {                 
                "testMatch": ["**/__tests__/**/*.[jt]s?(x)"],  // jest默认找__tests__下的测试文件            
                "moduleFileExtensions": [ // 测试文件中导入的文件后缀                        
                    "js",          
                    "json",                 
                    // 告诉jest处理"*.vue"文件           
                    "vue"             
                ],            
                "transform": {            
                    // 用'vue-jest'处理'*.vue'文件            
                    ".*\\.(vue)$": "vue-jest",            
                    // 用babel-jest处理js            
                    ".*\\.(js)$": "babel-jest"            
                }            
            }  
            ```

    - Babel配置文件           
        * babel.config.js 项目根目录下创建 
            ```js          
            module.exports =  {            
                presets: [            
                    [            
                        '@babel/preset-env'            
                    ]            
                ]            
            } 
            ```
    - babel桥接
        * 由于项目中安装的babel版本是babel7，而jest依赖的是babel6，所以运行测试时提示找不到babel，还需安装一个babel的桥接
        * 先更改各个包文件夹下的__test__为__tests__因为jest默认找的是__tests__，这相当于是个约定
        * yarn add babel-core@bridge -D -W (-D是安装开发依赖，-W是安装在根目录的工作区中) 

* 编写测试文件   
    - 先了解Jest和vue test utils提供的API,然后基于这些API创建测试文件：
    - Jest常用API
        * 全局函数
            - describe(name, fn) 把相关测试组合在一起
            - test(name, fn) 测试方法
            - expect(value) 断言
        * 匹配器
            - toBe(value)判断值是否相等
            - toEqual(obj)判断对象是否相等
            - toContain(value)判断数组或字符串是否包含
        * 快照
            - toMatchSnapshot() 第一次调用会把expect的值以字符串的方式存储到文本文件中，以后再运行快照会对比当前expect函数中的值和快照文件中的结果，如果相同则测试通过
    - Vue Test Utils常用API
        * mount() 创建一个包含被挂载和渲染的Vue逐渐的Wrapper
        * Wrapper
            - vm--wrapper包裹的组件实例
            - props()--返回vue实例选项中的props对象
            - html()--组件生产的HTML标签
            - find()--通过选择器返回匹配到的组件中的DOM元素
            - trigger()--触发DOM原生事件，自定义事件使用wrapper.vm.$emit() 
    - 编写测试文件：
        * 先在package.json中配置测试脚本
            - "test": "jest" // 当运行test时会执行jest，找到__tests__下的测试文件运行并输出结果
        * 给input组件写测试文件
            - __tests__下创建input.test.js 
    - 运行测试：yarn test可以查看是否测试通过 




### Rollup打包                          
* 在将组件发布出去之前，需要进行打包处理
* **Rollup**
    - Rollup是一个模块打包器(很多前端开源库或者框架都使用其打包，如vue、React等)
    - Rollup支持Tree-shaking(可静态分析代码中的import，排除未使用的代码，webpack虽然也支持Tree-shaking，但需要配置)
    - 打包的结果比webpack要小
    - 开发框架/组件库的时候使用Rollup更适合
* 安装依赖
    - Rollup
    - rollup-plugin-terser（对代码进行压缩）
    - rollup-plugin-vue@5.1.9（把单文件组件编译成js代码，这里需要指定版本，因为最新版本是把vue3.0的组件编译成js代码）
    - vue-template-compiler（把单文件组件编译成js代码过程中需要编译器）
    - 因为管理的包都需要打包，所以Rollup以及他的插件都需要安装在工作区的根目录中
        ```bash
        yarn add rollup rollup-plugin-terser rollup-plugin-vue@5.1.9 vue-template-compiler -D -W
        ```
* 可以单独打包一个组件，也可以通过一个命令打包所有的组件
* **Rollup打包所有组件**
    * 如果所有组件一起打包，则还需要安装以下插件：
        - @rollup/plugin-json（让rollup可将json文件作为模块加载，配置文件中会用到）
        - rollup-plugin-postcss（rollup的插件）
        - @rollup/plugin-node-resolve（在打包的过程中将第三方包的依赖打包进来，如form-item中依赖了async-validate）
        ```bash
        yarn add @rollup/plugin-json rollup-plugin-postcss @rollup/plugin-node-resolve -D -W
        ```
    * 在项目根目录下创建rollup.config.js并编写配置，因为当前项目中管理的包打包方式都是一样的，所以可以为所有包动态生成rollup的配置文件
    * 这个配置文件本质上是个node程序，他的作用是为packages下的所有包生成rollup的配置
    * 在根目录的package.json中配置scripts脚本
        ```bash
        "script":{
            "build": "rollup -c" // 加载配置文件进行打包
        }
        ```
    * 给packages下的每个包中的package.json中配置main和module，这是打包的出口，也是别人使用这个包的入口
        ```bash
        "main": "dist/cjs/index.js", // 存储cjs模块化打包的结果
        "module": "dist/es/index.js", // 存储es模块化打包的结果
        ```
    * 运行测试：yarn build --->此时在dist中生成cs和cjs的打包结果
* **配置环境变量**
    - 通过环境变量来判断当前是否是开发环境，若果是开发环境的打包不压缩代码           
    - 安装cross-env,可以跨平台设置环境变量           
        ```bash           
        yarn add cross-env -D -W           
        ```           
    - 修改根目录package.json中的打包命令build           
        ```bash           
        "script":{           
            "build:prod": "cross-env NODE_ENV=production rollup -c",           
            "build:dev": "cross-env NODE_ENV=development rollup -c"           
        }           
        ```           
    - 打包测试：yarn build:prod           
        ```bash           
        yarn build:prod //打包后的代码是被压缩的           
        yarn build:dev           
        ```           




### 清理
* 清理所有包中的node_modules：使用lerna clean命令
    - 给根目录的package.json中配置scripts脚本
        ```bash
        "scripts": {
            "clean": "lerna clean"
        }
        ```
    - 运行清除：yarn clean，确认删除后所有包中的node_modules都被删除

* 清理所有包中的dist：使用第三方包rimraf，指定要删除的目录
    - 安装rimraf(也需要全局安装)             
        yarn add rimraf -D -W               
    - 给每个包的package.json中配置scripts脚本 
        ```bash              
        "scripts": {                  
            "del": "rimraf dist"              
        } 
        ```               
    - 运行清除，不可能进入每个包进行删除操作，采用yarn workspaces进行统一删除 
        ```bash                 
        yarn workspaces run del       
        ```                




### 基于模板生成组件基本结构
* 每个组件都有相同的文件和结构，之前由于组件的结构还不稳定，对结构还不够了解，之前都是手动复制的所有结构，当对应组件的包结构固定以后，就可以将组件中相同的部分提取出来做成模板，然后通过plop基于模板快速生成一个新的组件的结构，方便后续大规模的组件开发。
* 使用plop需要几个步骤：
    - 安装：yarn add plop -W -D           
    - 写模板：在项目根目录下创建plop-template/component的组件结构           
    - 写plop的配置文件：项目根目录下plopfile.js           
    - 配置脚本命令(根目录package.json)："plop": "plop"           
    - 运行：yarn plop （输入组件名xxx，就会在packages下生成xxx的组件结构）           
* 实现基于模板生成的link组件并运行测试：yarn storybook           



### 打包发布
* yarn build:prod
* yarn lerna
### monorepo的方式来管理的本项目
* 我们开发的组件库为了让别人使用方便会将每个组件打包成单独包发布到NPM上，其他人使用时只需要下载他需要的组件，当然也可以将所有的组件一起打包发布
* 有两种项目的组织方式
  - Multirepo(Multiple Repository 多仓库)
    * 每一个包对应一个项目，(都需要有自己的脚手架，都需要下载和管理自己的依赖，都需要单独发布，多个组件可能会有相同的依赖，避免不了这些依赖的重复下载，占用硬盘空间).
  - Monorepo(Monolithic Repository)
    * 一个项目仓库中管理多个模块/包(根目录只放脚手架，所有的组件都放在根目录下的同一个目录下packages,每一个组件在此目录下配置一个子文件夹设置为包，因为所有的组件管理都比较类似相关的配置都放在根目录，不同的组件可能有相同的依赖，只需要下载一份，将来的测试、打包、发布都可以在当前项目进行统一的管理，这样管理项目对组件库的开发会更方便。很多知名的开源库都采用这种管理方式，如vue3、react、angular、babel、react-router、create-react-app...)

* 通过Monorepo的方式组织项目结构，让每个包单独测试、单独发布以及统一管理他们的依赖
* 通过Monorepo管理项目结构：    
    packages （所有要开发的组件）       
    |__button       
    ---|____> tests：测试相关代码       
    ---|____> dist：打包的目录       
    ---|____> src：当前包的源码(.vue文件)         
    ---|____ index.js：打包时入口      
    ---|____ LICENSE：版权，存放开源协议的描述(MIT)       
    ---|____ README.md：相关文档             
    ---|____ api-extractor.json：配置文件          
    ---|____ package.json：包的描述           
    |__form           
    |__formItem         
    |__input         
    |__steps        



### yarn storybook
* Storybook是一个开发组件库必备的开源库
* 可以将每一个组件想象成一个故事，Storybook就像是讲述一个个故事
* 安装使用Storybook

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
      * 通过npx使用storybook的最新命令行工具在一个已有的项目中进行初始化，这个命令行工具会在当前项目中创建一个示例的button和welcome组件，init命令会自动检查当前项目使用的框架，如果使用空项目就可以通过--type强制使用vue的方式进行初始化，同时会安装必要的依赖
      * yarn add vue
      * 安装vue，这里使用yarn因为后面还要用到yarn的工作区
      * yarn add vue-loader vue-template-compiler --dev
  - 手动安装：看文档

  - 安装完成后storybook就初始化完毕，在package.json中记录了所有的依赖，scripts中初始化了两个命令：            
      "scripts": {          
        "storybook": "start-storybook -p 6006",// 启动storybook            
        "build-storybook": "build-storybook" // 打包生成一个静态的网站              
      }            
  - 使用Monorepo的方式管理项目
  - 编写Storybook中的stories
      * 组件库packages放在项目跟目录下，并给每个组件文件夹下新建一个stories文件夹
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
    "private": true, // 组件库开发完后发布到npm上，而工作区的更目录一般是脚手架，不需要发布，这里是防止意外把根目录的提交内容暴露出去               
    "workspaces":  [         
      "./packages/*"  // 管理的所有包的路径，使用*指定packages下的任意包           
    ]             
  - 可以把所有包具有的依赖都安装在工作区根目录下的node_modules中
  - 给工作区根目录安装开发依赖
      * yarn add jest -D -W （jest是Facebook出的单元测试工具，-D是开发依赖，-W是工作区指安装到工作区的根目录）
  - 给指定工作区安装依赖
      * yarn workspace wxc-button add lodash@4 （wxc-button：包名，这里的包名是package.json中的name，不是文件夹的名字）
  - 给所有的工作区安装依赖
      * yarn install （如果所有的包中都有各自的依赖，别人从github上获取项目后可直接install安装所有包的依赖，无需一个个包来安装，如果多个包依赖相同的包，会自动提升到工作区的根目录下的node_modules中，防止重复下载节约空间，不需要在每个包的node_modules中存储）

  * 如果各自的包中有各自的依赖，此时多数情况下会将依赖提升到根目录下的node_modules中，让所有的包可以去复用，如果有不同版本，会给这个包单独下载安装防止意外。
  * Monorepo的项目结构一般都会配合yarn workspaces来管理包的依赖，在vue3和react项目结构时看过他们的package.json,都开启了workspaces，目的就是方便管理依赖。




### Lerna
  当组件都开发完成，想要把组件提交到github或者npm，可以使用lerna，方便把项目中的包统一发布
  * lerna介绍
      - lerna是babel自己用来维护自己的Monorepo并开源出的一个项目
      - lerna是一个优化使用git和npm管理多包仓库的工作流工具
      - 用于管理具有多个包的javascript项目
      - 它可以一键把代码提交到git和npm仓库
      - lerna也可以管理包的依赖，他可以选择使用mpm还是yarn管理依赖，需要单独配置，如果使用yarn的话也可以开启yarn的workspace，一般会将lerna和yarn workspace配合使用，使用lerna发布，使用yarn workspace管理依赖
  
  * lerna使用
      - 全局安装
          * yarn global add lerna
      - 初始化
          * lerna init (初始化后如果当前项目没有被git管理的话ui进行git的初始化，在项目根目录创建一个lerna.json的配置文件，在package.json中添加开发依赖)
      - 发布
          * lerna publish (先在github创建远程仓库、登录到npm，再运行时会同时将项目提交到github，所有的包发布到npm)
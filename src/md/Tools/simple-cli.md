# 构建自己的 CLI

## 什么是 CLI

CLI 是 command line interface 的简称，也就是命令行界面。用户可在提示符下键入可执行指令，然后计算机执行，它通常不支持鼠标。前端开发中也会用到很多 CLI，最典型的就是 react 对应的 create-react-app，vue 对应的 vue-cli。以 vue-cli 为例，我们是这么创建 vue 项目的

```Shell
vue create my-app
```

然后再命令行中回答一些项目相关的问题，最终根据问题的答案来生成相应的项目文件。所以，我们要构建自己的 CLI，就是自定义这些操作，来帮助完成一些工作，比如代码检查。

## 相关概念

- 命令

命令就是操作的名称，比如上面的`create`就是命令，代表创建项目的操作。我们可以执行`vue --help`来看有哪些命令：

```Shell
Usage: vue <command> [options]

Options:
  -V, --version                              output the version number
  -h, --help                                 output usage information

Commands:
  create [options] <app-name>                create a new project powered by vue-cli-service
  add [options] <plugin> [pluginOptions]     install a plugin and invoke its generator in an already created project
  invoke [options] <plugin> [pluginOptions]  invoke the generator of a plugin in an already created project
  inspect [options] [paths...]               inspect the webpack config in a project with vue-cli-service
  serve [options] [entry]                    serve a .js or .vue file in development mode with zero config
  build [options] [entry]                    build a .js or .vue file in production mode with zero config
  ui [options]                               start and open the vue-cli ui
  init [options] <template> <app-name>       generate a project from a remote template (legacy API, requires @vue/cli-init)
  config [options] [value]                   inspect and modify the config
  outdated [options]                         (experimental) check for outdated vue cli service / plugins
  upgrade [options] [plugin-name]            (experimental) upgrade vue cli service / plugins
  migrate [options] [plugin-name]            (experimental) run migrator for an already-installed cli plugin
  info                                       print debugging information about your environment

  Run vue <command> --help for detailed usage of given command.
```

- 选项

选项就是命令的配置，比如执行`vue create --help`,可以看到：

```Shell
Usage: create [options] <app-name>

create a new project powered by vue-cli-service

Options:
  -p, --preset <presetName>       Skip prompts and use saved or remote preset
  -d, --default                   Skip prompts and use default preset
  -i, --inlinePreset <json>       Skip prompts and use inline JSON string as preset
  -m, --packageManager <command>  Use specified npm client when installing dependencies
  -r, --registry <url>            Use specified npm registry when installing dependencies (only for npm)
  -g, --git [message]             Force git initialization with initial commit message
  -n, --no-git                    Skip git initialization
  -f, --force                     Overwrite target directory if it exists
  --merge                         Merge target directory if it exists
  -c, --clone                     Use git clone when fetching remote preset
  -x, --proxy <proxyUrl>          Use specified proxy when creating project
  -b, --bare                      Scaffold project without beginner instructions
  --skipGetStarted                Skip displaying "Get started" instructions
  -h, --help                      output usage information
```

其中以`-`或`--`开头就是配置选项的名称

- 参数

传递给命令的值，就好比命令就是函数，该值就是函数执行时的实参。`vue create my-app`中`my-app`就是参数，表示项目名称

## 开始

首先，写一个 JavaScript 脚本`index.js`:

```js
#!/usr/bin/env node

console.log('test');
```

> `#!/usr/bin/env node` ,简单的理解，就是输入命令后，会有在一个新建的 shell 中执行指定的脚本，在执行这个脚本的时候，我们需要来指定这个脚本的解释程序是 node。

然后，修改`package.json`

```json
{
  "bin": {
    "simple": "./index.js"
  }
}
```

在执行`npm link`，然后就能执行`simple`命令了

## 配置命令行选项

这里推荐使用[commander.js](https://github.com/tj/commander.js)

```Shell
yarn add commander --save
```

```js
program.option('-ig,--initgit', 'init git');
```

`console.log('Options: ', program.opts());`可以得到选项值

## 第一个命令

就像`vue create`一样，我们要完成一个创建项目的命令，并且可以配置模版，以及是否初始化 git

```js
const { program } = require('commander');

const handleCreate = (params, options) => {
  console.log(params, options);
};

program
  .command('create <name> [destination]')
  .description('create a project')
  .action((name, destination) => {
    handleCreate({ name, destination }, program.opts());
  });

program.option('-ig,--initgit', 'init git');

program.parse(process.argv);
```

`.command()`用于配置命令及参数，其中`<>`表示参数是必须的，`[]`表示参数是可选的;

`.description()`添加命令描述

`.action()`用于添加操作函数，入参就是配置命令时候的参数

`program.parse(process.argv);`处理命令行参数

## 用户交互问题

这里用到[Inquirer.js](https://github.com/SBoudrias/Inquirer.js),点击查看文档

```Shell
yarn add inquirer --save
```

```js
const handleCreate = (params, options) => {
  console.log(params, options);
  inquirer
    //用户交互
    .prompt([
      {
        type: 'input',
        name: 'author',
        message: 'author name?'
      },
      {
        type: 'list',
        name: 'template',
        message: 'choose a template',
        choices: ['tpl-1', 'tpl-2']
      }
    ])
    .then((answers) => {
      //根据回答以及选项，参数来生成项目文件
      genFiles({ ...answers, ...params, ...options });
    })
    .catch((error) => {
      console.error(error);
    });
};
```

## 按需生成项目文件

在项目中创建`templates`目录用于存放模版文件

```
+-- templates
|   +-- tpl-1
    |   +-- package.json
|   +-- tpl-2
    |   +-- package.json
```

然后，就是复制文件到指定目录.

这里用到[Metalsmith](https://github.com/segmentio/metalsmith),可以很方便地复制文件到指定目录，指定目录若不存在，则创建新目录

```js
//获得命令运行时的路径
const getCwd = () => process.cwd();

const genFiles = (options) => {
  //模版的目录
  const templateSrc = path.resolve(__dirname, `./templates/${options.template}`);
  //项目指定生成目录，如果命令中没有有配置目录，则在当前命令运行的目录下生成以项目名称为名字的新目录
  const destination = options.destination
    ? path.resolve(options.destination)
    : path.resolve(getCwd(), options.name);

  Metalsmith(__dirname)
    .source(templateSrc)
    .destination(destination)
    .build((err) => {
      if (err) {
        console.error(err);
      }
    });
};
```

`.source()`和`.destination()`分别配置复制源目录和目标目录，最好使用绝对路径

但这里还有一个问题，就是生成的`package.json`中的`name`,`author`等值是固定的，应当是随着项目名称而变化才对。所以`package.json`必须是一个模版文件，在生成的同时要根据实际情况渲染成目标文件;

模版采用[ejs](https://github.com/mde/ejs)

```Shell
yarn add ejs --save
```

修改模版文件：

然后在`.destination()`和`.build()`之间加入处理程序

```js
const ejs = require('ejs');

Metalsmith(__dirname)
  .source(templateSrc)
  .destination(destination)
  .use((files) => {
    Object.keys(files).forEach((key) => {
      const file = files[key];
      // 原内容
      const str = file.contents.toString();
      // 新内容
      const newContents = ejs.render(str, options);
      // 将新内容写到文件中
      file.contents = Buffer.from(newContents);
    });
  })
  .build((err) => {
    if (err) {
      console.error(err);
    }
  });
```

这样，一个简单 CLI 完成，更多命令可以自己添加。

## 更多

- 模版下载

大部分 CLI 工具的模版并不在本地，而是从网上下载。可以用[download-git-repo](https://www.npmjs.com/package/download-git-repo)这个库，以及[github API](https://developer.github.com/v3/)

- 命令行等待优化

遇到命令执行比较耗时的情况，友好地提示等待也是必须的，[ora](https://github.com/sindresorhus/ora)可以帮助你

- 命令行美化

[chalk](https://github.com/chalk/chalk)给你的命令行添加样式。

谢谢。

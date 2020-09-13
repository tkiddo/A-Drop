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

## 开发

我们知道，再node环境下运行js文件只要在命令行中执行`node filename.js`即可，但是vue cli的运行并不是这样的，而是直接运行`vue create my-app`
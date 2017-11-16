#!/usr/bin/env node

'use strict';

const path = require('path');
const fs = require('fs');
const shelljs = require('shelljs');
const program = require('commander');
const inquirer = require('inquirer');
const pkg = require('../package.json');
var prompt = inquirer.createPromptModule();

const validateName = function (input) {
  var done = this.async();

  if (input.trim() === '') {
    done('项目名不能为空')
  }
  done(null, true);
};

const styles = {
  'bold'          : '\x1B[1m%s\x1B[22m',
  'italic'        : '\x1B[3m%s\x1B[23m',
  'underline'     : '\x1B[4m%s\x1B[24m',
  'inverse'       : '\x1B[7m%s\x1B[27m',
  'strikethrough' : '\x1B[9m%s\x1B[29m',
  'white'         : '\x1B[37m%s\x1B[39m',
  'grey'          : '\x1B[90m%s\x1B[39m',
  'black'         : '\x1B[30m%s\x1B[39m',
  'blue'          : '\x1B[34m%s\x1B[39m',
  'cyan'          : '\x1B[36m%s\x1B[39m',
  'green'         : '\x1B[32m%s\x1B[39m',
  'magenta'       : '\x1B[35m%s\x1B[39m',
  'red'           : '\x1B[31m%s\x1B[39m',
  'yellow'        : '\x1B[33m%s\x1B[39m',
  'whiteBG'       : '\x1B[47m%s\x1B[49m',
  'greyBG'        : '\x1B[49;5;8m%s\x1B[49m',
  'blackBG'       : '\x1B[40m%s\x1B[49m',
  'blueBG'        : '\x1B[44m%s\x1B[49m',
  'cyanBG'        : '\x1B[46m%s\x1B[49m',
  'greenBG'       : '\x1B[42m%s\x1B[49m',
  'magentaBG'     : '\x1B[45m%s\x1B[49m',
  'redBG'         : '\x1B[41m%s\x1B[49m',
  'yellowBG'      : '\x1B[43m%s\x1B[49m'
};

program
  .version(`${pkg.version}`)
  .option('-C, --chdir <path>', 'change the working directory')
  .option('-c, --config <path>', 'set config path. defaults to ./deploy.conf')
  .option('-T, --no-tests', 'ignore test hook')

program
  .command('help')
  // .description('还没有帮助文件')
  // .option('-a, --all', 'Whether to display hidden files')
  .action(function (options) {
    console.log(process.argv)
  })

program
  .command('init')
  .action(function () {
    let sep = path.sep;
    let defaultPath = `.${sep}`;
    var questions = [];
    var projectInfo = {
      name: '',
      path: defaultPath
    };
    var args = process.argv;
    if (args.length === 3) {
      questions = [
        {
          type: 'input',
          name: 'project_name',
          message: '请输入项目名称',
          validate: validateName
        },
        {
          type: 'input',
          name: 'project_path',
          message: '请输入项目路径',
          default: defaultPath
        }
      ]
    } else if (args.length === 4) {
      projectInfo.name = args[3];
      projectInfo.path = defaultPath;
      // questions = [
      //   {
      //     type: 'input',
      //     name: 'project_path',
      //     message: '请输入项目路径',
      //     default: defaultPath
      //   }
      // ]
    } else {
      projectInfo = {
        name: args[3],
        path: args[4]
      }
    }
    prompt(questions).then(function (answers) {
      if (answers.project_name) {
        projectInfo.name = answers.project_name;
      }
      if (answers.project_path) {
        projectInfo.path = answers.project_path;
      }
      var realPath = path.resolve(process.cwd(), projectInfo.path);
      realPath += sep + projectInfo.name;
      fs.exists(realPath, function (exists) {
        if (!exists) {
          shelljs.exec(`mkdir ${realPath}`);
        }
        try {
          shelljs.cp('-R', `${path.join(__dirname, '.' + sep)}template${sep}*`, `${realPath}`)
          console.log(`${styles.green}`, `\n   模板添加成功`);
          console.log(`${styles.grey}`, `\n   cd ${projectInfo.name}`);
          console.log(`${styles.grey}`, '\n   npm install');
          console.log(`${styles.grey}`, '\n   npm run dev\n\n');
        } catch (err) {
          console.log(`${styles.magenta}`, '\n   模板添加失败');
        }
        // shelljs.exec(`cp -r ${path.join(__dirname, './template')}/* ${realPath}`, {silent:true}, function (code, stdout, stderr) {
        //   if (code === 0) {
        //     console.log(`${styles.grey}`, `\n\n   cd ${projectInfo.name}`);
        //     console.log(`${styles.grey}`, '\n   npm install');
        //     console.log(`${styles.grey}`, '\n   npm run dev\n\n');
        //   } else {
        //     console.log(`${styles.magenta}`, stderr);
        //   }
        // });
      });
    })
  });

program.parse(process.argv)


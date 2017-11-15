#!/usr/bin/env node

'use strict';


// console.log('Hello World');

const path = require('path');
const fs = require('fs');
const shelljs = require('shelljs');
const program = require('commander');
const inquirer = require('inquirer');
var prompt = inquirer.createPromptModule();
program
  .version('0.0.1')
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
    var questions = [];
    var projectInfo = {
      name: '',
      path: './'
    };
    var args = process.argv;
    if (args.length === 3) {
      questions = [
        {
          type: 'input',
          name: 'project_name',
          message: '请输入项目名称'
        },
        {
          type: 'input',
          name: 'project_path',
          message: '请输入项目路径',
          default: './'
        }
      ]
    } else if (args.length === 4) {
      projectInfo.name = args[3];
      questions = [
        {
          type: 'input',
          name: 'project_path',
          message: '请输入项目路径',
          default: './'
        }
      ]
    } else {
      projectInfo = {
        name: args[3],
        path: args[4]
      }
    }

    // const questions = [
    //   {
    //     type: 'input',
    //     name: 'name',
    //     message: '你的名字是：',
    //     default: process.env.USER
    //   },
    //   {
    //     type: 'input',
    //     name: 'phonenum',
    //     message: '你的手机号是：',
    //     // validate: function (input) {
    //     //   const done = this.async();
    //     //
    //     //   setTimeout(function () {
    //     //     if (isNaN(input)) {
    //     //       done('请输入数字');
    //     //       return;
    //     //     }
    //     //     if (!/1[3578]\d{9}/.test(input)) {
    //     //       done('手机号不正确');
    //     //       return;
    //     //     }
    //     //     done(null, true);
    //     //   }, 300);
    //     // }
    //   },
    //   {
    //     type: 'checkbox',
    //     name: 'hobbit',
    //     message: '你的爱好是？ ',
    //     default: true,
    //     choices: [
    //       {
    //         name: '电影',
    //         value: '电影'
    //       },
    //       {
    //         name: '音乐',
    //         value: '音乐'
    //       },
    //       {
    //         name: '游戏',
    //         value: '游戏'
    //       }
    //     ]
    //   }
    // ];
    prompt(questions).then(function (answers) {
      if (answers.project_name) {
        projectInfo.name = answers.project_name;
      }
      if (answers.project_path) {
        projectInfo.path = answers.project_path;
      }
      var realPath = path.resolve(process.env.PWD, projectInfo.path);
      realPath += '/' + projectInfo.name;
      fs.exists(realPath, function (exists) {
        // console.log(`目录${realPath}是否存在：${exists}`);
        if (!exists) {
          shelljs.exec(`mkdir ${realPath}`);
        }
        console.log(process.env.PWD)
      });
      // console.log('real path: ', realPath)
      // shelljs.cp('./bin/', '/Keith/git/ls/')
      // shelljs.exec('cp -r ./bin /Keith/git/ls & open ' + shelljs.pwd())
    })
  });

program.parse(process.argv)


#!/usr/bin/env node

'use strict';

const path = require('path');
const fs = require('fs');
const shelljs = require('shelljs');
const program = require('commander');
const inquirer = require('inquirer');
var prompt = inquirer.createPromptModule();
program
  .version('0.0.2')
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
        shelljs.exec(`cp -r ${process.env.PWD}/template/* ${realPath}`);
      });
    })
  });

program.parse(process.argv)


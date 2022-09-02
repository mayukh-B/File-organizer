#!/usr/bin/env node

// How to take input
let inputArr = process.argv.slice(2)
let helper = require('./commands/help')
let organizer = require('./commands/organize')
let treeMaker = require('./commands/tree')

let types = {
  media: ['mp4', 'mkv', 'jpg', 'jpeg', 'png', 'JPEG', 'JPG'],
  archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', 'xz'],
  documents: [
    'docx',
    'doc',
    'pdf',
    'xlsx',
    'xls',
    'odt',
    'ods',
    'odp',
    'odg',
    'odf',
    'txt',
    'ps',
    'tex',
  ],
  app: ['exe', 'dmg', 'pkg', 'deb'],
}
// console.log(inputArr)

//node main.js tree "directoryPath"

//node main.js organize "directoryPath"

//node main.js help

let command = inputArr[0]

switch (command) {
  case 'tree':
    treeMaker.treeKey(inputArr[1])
    break
  case 'organize':
    organizer.organizeKey(inputArr[1])
    break
  case 'help':
    helper.helpKey()
    break
  default:
    console.log('No such command found')
    break
}

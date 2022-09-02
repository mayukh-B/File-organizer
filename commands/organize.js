let fs = require('fs')
const { type } = require('os')
let path = require('path')

function organizeFn(dirPath) {
  // console.log(" Organize cmd implemented for ", dirPath)
  // input -> directory path given
  let destPath

  if (dirPath == undefined) {
    destPath = process.cwd()
    return
  } else {
    let doesExist = fs.existsSync(dirPath)
    if (doesExist) {
      // create-> organized_files ->directory
      destPath = path.join(dirPath, 'organized_files')
      if (fs.existsSync(destPath) == false) fs.mkdirSync(destPath)
      else {
        console.log('Folder with same name already exists')
      }
    } else {
      console.log('No such path found')
      return
    }
  }

  // check all files and identify which category they belong
  // copy/ cut files to that organized directory inside of any of the category folders

  organizeHelper(dirPath, destPath)
}

function organizeHelper(src, dest) {
  let childNames = fs.readdirSync(src)
  //   console.log(childNames)
  for (let i = 0; i < childNames.length; i++) {
    let childAddress = path.join(src, childNames[i])
    let isFile = fs.lstatSync(childAddress).isFile()
    if (isFile) {
      currExt = path.extname(childNames[i])
      currExt = currExt.slice(1)
      let category = getCategory(childNames[i], currExt)
      console.log(childNames[i], 'belongs to -> ', category)

      sendFiles(childAddress, dest, category)
    }
  }
}

function getCategory(name, ext) {
  for (let type in types) {
    let currType = types[type]
    for (let i = 0; i < currType.length; i++) {
      if (ext == currType[i]) {
        return type
      }
    }
  }
  return 'others'
}

function sendFiles(srcFilePath, dest, category) {
  let categoryPath = path.join(dest, category)

  if (fs.existsSync(categoryPath) == false) {
    fs.mkdirSync(categoryPath)
  }
  let fileName = path.basename(srcFilePath)
  let destFilePath = path.join(categoryPath, fileName)
  fs.copyFileSync(srcFilePath, destFilePath)
  fs.unlinkSync(srcFilePath)
  console.log(`${fileName} copied to ${category}`)
}

module.exports = {
  organizeKey: organizeFn,
}

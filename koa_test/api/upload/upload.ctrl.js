const fs = require('fs');
const path = require('path');
const dateFormat = require('../comm/dateFormat.js')
const upload= {
    UPLOAD: '/upload',
    IMAGE: '/image/',
    FILE: '/file/',
    MAXFILESIZE: 200 * 1024 * 1024, //Upload file size
}

// 업로드 즉, multipart 는 아래처럼 별도로 선언하여 사용한다.
// 세 가지 솔루션중 2 번째것 사용함...
// https://stackoverflow.com/questions/33751203/how-to-parse-multipart-form-data-body-with-koa
//const Koa2formidable = require('koa2-formidable');
exports.upload = async (ctx) => {

    //console.log(ctx.request.body);
    console.log(ctx.request.files.files);
    
    var time = Date.parse(new Date())
    let date = dateFormat.dateFormat(time, 'yyyyMMddhhmmss');
    let file = ctx.request.files.files;

    let fileYear = date.substring(4, 8) + '/' +date.substring(8, 10);
    let tail = file.name.split('.').pop()

    //let filePath = fileYear + date + '.' + tail; 

    let filePath = "./files/" + file.name

    //console.log("file.path : " + file.path);
    console.log("filePath : " + filePath);

    let tmp_dir = file.path;

    
    // Create a file directory
    const mkdirFile = (path) => {
        let pathList = path.split('/');
        let fileDir = ''
        pathList.forEach(i => {
            if(i) {
                fileDir += ('/' + i)
                if(!fs.existsSync(fileDir)) {
                    fs.mkdirSync(fileDir, err => {
                        LogFile.info('Create failure', err)
                        return
                    });
                }
            }
        })
    }
    //Save file -> 현재 overwrite 임 ...
    const saveFile = (file, path) => {
        return new Promise((resolve, reject) => {
            let render = fs.createReadStream(file);
            // Create a write stream
            let upStream = fs.createWriteStream(path);
            render.pipe(upStream);
            upStream.on('finish', () => {
                resolve(path)
            });
            upStream.on('error', (err) => {
                reject(err)
            });
        })
    }


    //await mkdirFile(fileName + fileYear)         //Create a file directory

    await saveFile(tmp_dir, filePath).then(su => {
        let uplaod_img = su.substring(upload.UPLOAD.length, su.length)
        ctx.body = {
            error_code: 0,
            error_message: 'Successful upload of files',
            realName: uplaod_img
        }
    }).catch(err => {
        ctx.body = {
            error_code: 20008,
            error_message: 'Failed to upload file!',
        }
    })

}
import { extname } from "path";
import * as fs from 'fs';

export const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|pdf|gif)$/)) {
      return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
  };

  export const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    const randomName = Array(6)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
  };

  export const fileDestination = async (req, file, callback) => {
    if (file.fieldname === "signature") { // if uploading resume
      console.log("seen")
      const dir = './files/signature'
      await fs.promises.access(dir, fs.constants.F_OK)
           .then(() => console.log("seen"))
           .catch(() => {
              fs.promises.mkdir(dir, { recursive: true }).catch(console.error);
           })
        return callback(null, dir);
    } else if(file.fieldname === "pictures"){
      const dir = './files/pictures'
          console.log(file.fieldname);
          return callback(null, dir);
    } else { // else uploading image
      const dir = './files/user-images'
       await fs.promises.access(dir, fs.constants.F_OK)
           .then(() => console.log("seen"))
           .catch(() => {
              fs.promises.mkdir(dir, { recursive: true }).catch(console.error);
           })
        return callback(null, dir);
    }
  }

  export const fileFilter = (req, file, cb) => {
    if (file.fieldname === "image") { // if uploading resume
      if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
      ) { // check file type to be pdf, doc, or docx
        cb(null, true);
      } else {
        // cb(null, false); // else fails
        return cb(new Error('File format for image uploaded not supported'), false);
      }
    } else { // else uploading image
      if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
      ) { // check file type to be png, jpeg, or jpg
        cb(null, true);
      } else {
        cb(null, false); // else fails
        // return cb(new Error('File format for product brochure not supported'), false);
      }
    }
  };
import { Injectable, Logger } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';

@Injectable()
export class S3FilesService {
    AWS_S3_BUCKET_NAME: string;
    s3:any;
    constructor() {
        this.AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
        this.s3 = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION
        })
    }

    async uploadPublicFile(dataBuffer: Buffer, filename: string) {
      return new Promise((resolve, reject) => {
        this.s3.upload({
            Bucket: this.AWS_S3_BUCKET_NAME,
            Body: dataBuffer,
            Key: `${uuid()}-${filename}`
          }, (err, data) => {
            if (err) {
                Logger.error(err);
                reject(err.message);
            }
            resolve(data);
          });
        });
        return await this.s3.putObject({
          Bucket: this.AWS_S3_BUCKET_NAME,
          Body: dataBuffer,
          Key: `${uuid()}-${filename}`
        })
          .promise().then(res =>res).catch(err => {
            console.log(err)
              Logger.error(err);
          });
    }

    async getFileObject() {
      // return await this.s3.getObject({
      //   Bucket: this.AWS_S3_BUCKET_NAME,
      //   Key: "bf0eb171-8607-4533-aa50-19f4545571c5-Screenshot_2021.09.07_15.08.49.053.png",
      // }).createReadStream();
      // return await this.s3.getObject({
      //   Bucket: this.AWS_S3_BUCKET_NAME,
      //   Key: "bf0eb171-8607-4533-aa50-19f4545571c5-Screenshot_2021.09.07_15.08.49.053.png",
      // }).promise().then(file => {
      //   console.log(file.Body.toString());
      // });
      return  this.s3.getSignedUrl('getObject',{
        Bucket: this.AWS_S3_BUCKET_NAME,
        Key: "bf0eb171-8607-4533-aa50-19f4545571c5-Screenshot_2021.09.07_15.08.49.053.png",
        Expires: 60 * 5
      })
    }

    async deletePublicFile(key) {
      return await this.s3.deleteObject({
        Bucket: this.AWS_S3_BUCKET_NAME,
        Key: key,
      }).promise();
    }
}

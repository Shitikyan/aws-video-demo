import AWS from 'aws-sdk';

class AWSService {
  constructor() {
    this.config = {
      bucketName: process.env.REACT_APP_BUCKET_NAME,
      dirName: process.env.REACT_APP_DIR_NAME,
      region: process.env.REACT_APP_REGION,
      accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
    };

    this.s3 = new AWS.S3({
      accessKeyId: this.config.accessKeyId,
      secretAccessKey: this.config.secretAccessKey,
      region: this.config.region,
    });
  }

  uploadFile = (file) => {
    const objectParams = {
      Bucket: this.getDirName,
      Key: file.name,
      Body: file,
    };

    return new Promise((resolve, reject) => {
      this.s3.upload(objectParams, function (data, err) {
        if (err) {
          reject(err);
        }

        resolve(data);
      });
    });
  }

  getFilesFromBucket = () => {
    const objectParams = {
      Bucket: this.config.bucketName,
      MaxKeys: 100,
    };
    
    return new Promise((resolve, reject) => {
      this.s3.listObjects(objectParams, function (err, data) {
        if (err) {
          reject(err);
        }
  
        resolve({
          bucketUrl: this.request.httpRequest.endpoint.href + objectParams.Bucket + '/',
          data: data.Contents
        });
      });
    });
  }

  get getDirName () {
    return this.config.bucketName + '/' + this.config.dirName;
  }
}

export default new AWSService();
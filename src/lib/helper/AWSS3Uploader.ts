import * as AWS from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import * as path from "path";
import { Upload, UploadResponse } from "../../types/ts/interfaces";
import { Service } from "typedi";
import * as stream from "stream";

const BucketName: "mogac" = "mogac";
const uploadPath: "upload/" = "upload/";

export interface IUploader {
  uploadSingleImage: ({ file }: { file: Upload }) => Promise<UploadResponse>;
}

type S3UploadStream = {
  writeStream: stream.PassThrough;
  promise: Promise<AWS.S3.ManagedUpload.SendData>;
};

@Service()
export class AWSS3Uploader implements IUploader {
  private s3: AWS.S3;

  constructor() {
    AWS.config.update({
      region: "ap-northeast-2",
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

    this.s3 = new AWS.S3();
  }

  private createDestinationFilePath(
    filename: string,
    mimetype: string,
    encoding: string
  ): string {
    return filename;
  }

  private createUploadStream(key: string): S3UploadStream {
    const pass = new stream.PassThrough();
    return {
      writeStream: pass,
      promise: this.s3
        .upload({
          Bucket: BucketName,
          Key: key,
          Body: pass,
        })
        .promise(),
    };
  }

  async uploadSingleImage({ file }: { file: Upload }): Promise<UploadResponse> {
    const { createReadStream, filename, mimetype, encoding } = await file;

    //  s3에 저장할 파일 경로 생성
    const filePath = this.createDestinationFilePath(
      filename,
      mimetype,
      encoding
    );

    // S3로 가는 업로드 스트림 생성
    const uploadStream = this.createUploadStream(filePath);

    // 파일 데이터와 업로드 스트림 파이프
    createReadStream().pipe(uploadStream.writeStream);

    // 스트림 시작
    const result = await uploadStream.promise;

    // 업로드된 파일 링크 가져오기
    const link = result.Location;

    // 링크 DB에 저장
    //

    return { filename, mimetype, encoding, url: result.Location };
  }
}
/*
// set s3 params
// - Bucket : AWS S3에 만들어 놓은 버킷 이름이다.
// - Key     : S3에 저장될 위치. 참고로 존재하지 않는 디렉터리를 명시하면 자동으로 디렉터리가 생성된다. 따라서 실제로 image/logo.png 형태로 저장된다.
// -  ACL   : S3에 사전 정의된 권한 부여 집합이다. 각 옵션에 대한 설명은 공식 사이트에서 확인 바란다.
// - Body   : 저장되는 데이터이다. String, Buffer, Stream 이 올 수 있다.
// - ContentType : MIME 타입이다.

export const uploadImage = (fileName: string) => {
  const parmas = {
    Bucket: BucketName,
    Key: uploadPath,
    ACL: "public-read",
    Body: createReadStream(fileName),
    ContentType: "image/*",
  };
  S3.upload(parmas, function (err: Error, data: AWS.S3.ManagedUpload.SendData) {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully ${data.Location}!`);
  });
};

const getImageFromS3 = (fileName: string) => {
  const params = {
    Bucket: BucketName,
    key: uploadPath,
  };
  S3.getSignedUrl("getObject", params, function (err, url) {
    if (err) {
      throw err;
    }
    console.log(url);
  });
};
*/

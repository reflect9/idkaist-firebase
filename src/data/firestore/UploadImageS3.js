import React ,{useState} from 'react';
import AWS from 'aws-sdk'

const S3_BUCKET ='idkaist-image';
const REGION ='ap-northeast-2';


AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION,
})

const UploadImageS3 = () => {
    const [progress , setProgress] = useState(0);
    const [uploadedFile , setUploadedFile] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const uploadFile = (file) => {
        const params = {
            ACL: 'public-read',
            Body: file,
            Bucket: S3_BUCKET,
            Key: "images/"+file.name
        };
        myBucket.upload(params)
            .on('httpUploadProgress', (evt) => {
                setProgress(Math.round((evt.loaded / evt.total) * 100))
            })
            .send((err, data) => {
                if (err) console.log(err);
                if (data) {
                    console.log(data);
                    setUploadedFile(data.Location);
                } 
                // console.log("https://idkaist-image.s3.ap-northeast-2.amazonaws.com/images/"+file.name);
            });
    }
            

    return (<div className="uploadImageS3">
        <input type="file" onChange={handleFileInput}/>
        <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
        <div>Upload Progress: {progress}%</div>
        <div>File URI: <button onClick={()=>{
            navigator.clipboard.writeText(uploadedFile);
        }}>COPY TO CLIPBOARD</button>{uploadedFile}</div>
    </div>);
}

export default UploadImageS3;
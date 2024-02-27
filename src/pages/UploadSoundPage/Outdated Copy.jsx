// import AWS from "aws-sdk";
// import { useState } from "react";


// export default function UploadSoundPage() {
// // Create state to store file  
//   const [file, setFile] = useState(null);

//   const uploadFile = async () => {
//     const S3_BUCKET = "mpc-maps-bucket";
//     const REGION = "us-west-1";

//     AWS.config.update({
//       accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//       secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     });
//     const s3 = new AWS.S3({
//       params: { Bucket: S3_BUCKET },
//       region: REGION,
//     });

//     const params = {
//       Bucket: S3_BUCKET,
//       Key: file.name,
//       Body: file,
//     };

//     var upload = s3
//       .putObject(params)
//       .on("httpUploadProgress", (evt) => {
//         console.log(
//           "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
//         );
//       })
//       .promise();

//     await upload.then((err, data) => {
//       console.log(err);
//       alert("File uploaded successfully.");
//     });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setFile(file);
//   };
//   return (
//     <div className="Uploader">
//       <div>
//         <input type="file" onChange={handleFileChange} />
//         <button onClick={uploadFile}>Upload</button>
//       </div>
//     </div>
//   );
// }



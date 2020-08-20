import React, { useEffect, useState } from 'react';
import AWSService from '../services/AWSService';

const VideosPreview = () => {
  let [bucketUrl, setBucketUrl] = useState(null);
  let [files, setFiles] = useState([]);

  useEffect(() => {
    AWSService.getFilesFromBucket().then(({ data, bucketUrl }) => {
      setFiles(data);
      setBucketUrl(bucketUrl);
    });
  }, []);

  return (
    <div>
      {files &&
        files.map((video) => (
          <video
            controls
            key={video.Key}
            src={bucketUrl + encodeURIComponent(video.Key)}
          ></video>
        ))}
    </div>
  );
};

export default VideosPreview;

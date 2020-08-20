import React, { useRef, useState } from 'react';
import VideoRecorder from '../video-recorder';
import AWSService from '../services/AWSService';
import { v4 as uuidv4 } from 'uuid';
import VideosPreview from '../videos-preview';

import './Demo.scss';

const MAX_WIDTH = 640;
const MIN_WIDTH = 50;
const CHANGE_DELTA = 100;

const Demo = () => {
  const $RecorderRef = useRef(null);

  const [version, setVersion] = useState(0);
  const [width, setWidth] = useState(450);
  const [height, setHeight] = useState(450);

  const onStart = () => console.log('Start.');
  const onStop = () => console.log('Stop.');
  const onProgress = (e) => console.log(`Propgress ${e}`);
  const onDownload = () => console.log('Download');

  const upload = () => {
    const blob = $RecorderRef.current.getBlob();
    if (!blob) return;

    const file = new File([blob], `${uuidv4()}.mp4`, { type: blob.type });
    AWSService.uploadFile(file).then(() => setVersion(version + 1));
  };

  return (
    <div>
      <div className='buttons'>
        <button onClick={() => $RecorderRef.current.start()}>START</button>

        <button onClick={() => $RecorderRef.current.stop()}>STOP</button>

        <button onClick={() => $RecorderRef.current.download()}>
          DOWNLOAD
        </button>

        <button onClick={() => upload()}>UPLOAD</button>
        <button
          onClick={() => {
            if (width < MAX_WIDTH) {
              setWidth((oldState) => oldState + CHANGE_DELTA);
              setHeight((oldState) => oldState + CHANGE_DELTA);
            }
          }}
        >
          Make Container Larger
        </button>
        <button
          onClick={() => {
            if (width > MIN_WIDTH) {
              setWidth((oldState) => oldState - CHANGE_DELTA);
              setHeight((oldState) => oldState - CHANGE_DELTA);
            }
          }}
        >
          Make Container Smaller
        </button>
      </div>
      <div style={{ width: width, height: height }}>
        <VideoRecorder
          ref={$RecorderRef}
          onStart={onStart}
          onStop={onStop}
          onProgress={onProgress}
          onDownload={onDownload}
          timeLimit={10}
          audio={true}
          className='test-web-cam'
        />
      </div>

      <VideosPreview key={version} />
    </div>
  );
};
export default Demo;

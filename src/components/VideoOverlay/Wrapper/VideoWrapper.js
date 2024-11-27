import React, { useState, useEffect } from 'react';
import VideoPlayer from '../Player';

const VideoWrapper = (
  {
    id, 
    src,
    poster, 
    paused=false,
    onLoad, 
    onProgress
    }) => {

  return (
    <VideoPlayer
      id={id}
      src={src}
      poster={poster}
      isPaused={paused}
      onLoad={onLoad}
      onProgress={onProgress}
    />
  );
};

export default VideoWrapper;

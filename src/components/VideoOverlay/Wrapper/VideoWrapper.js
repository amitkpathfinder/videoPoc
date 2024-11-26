import React, { useState, useEffect } from 'react';
import VideoPlayer from '../Player';

const VideoWrapper = ({paused=false, fullscreen=false,  onDurationChange, src, poster, onProgress}) => {
  
  const [isPaused, setIsPaused] = useState(paused);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(fullscreen);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    console.log('VideoWrapper:Loading video list');
    setIsPaused(paused);
    setIsFullscreen(fullscreen);
    console.log('VideoWrapper', paused);
  }, [paused, fullscreen]);

  const handleLoad = ({ duration }) => {
    setDuration(duration);
    if (onDurationChange) {
      onDurationChange(duration); // Send the duration to VideoOverlay
    }
  };

  const handleProgress = ({ currentTime }) => setCurrentTime(currentTime);

  const handleSeek = (time) => setCurrentTime(time);

  const handleDoubleTapSeekForward = () => {
    const newTime = Math.min(currentTime + 10, duration);
    setCurrentTime(newTime);
  };

  const handleDoubleTapSeekBackward = () => {
    const newTime = Math.max(currentTime - 10, 0);
    setCurrentTime(newTime);
  };

  const handleToggleFullscreen = (fullscreen) => setIsFullscreen(fullscreen);

  return (
    <VideoPlayer
      src={src}
      poster={poster}
      isPaused={isPaused}
      duration={duration}
      currentTime={currentTime}
      isFullscreen={isFullscreen}
      showControls={showControls}
      onLoad={handleLoad}
      onProgress={onProgress}
      onSeek={handleSeek}
      onToggleFullscreen={handleToggleFullscreen}
      onDoubleTapSeekForward={handleDoubleTapSeekForward}
      onDoubleTapSeekBackward={handleDoubleTapSeekBackward}
    />
  );
};

export default VideoWrapper;

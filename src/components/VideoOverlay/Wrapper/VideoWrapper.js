import React, { useState, useEffect } from 'react';
import VideoPlayer from '../Player';

const VideoWrapper = ({Paused=false, onDurationChange, src}) => {
  
  const [isPaused, setIsPaused] = useState(Paused);
  const [isBuffering, setIsBuffering] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    setIsPaused(Paused);
    console.log('VideoWrapper', Paused);
  }, [Paused]);

  const handleTogglePlayPause = (paused) => setIsPaused(paused);

  const handleBuffer = ({ isBuffering }) => setIsBuffering(isBuffering);

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
      isPaused={isPaused}
      isBuffering={isBuffering}
      duration={duration}
      currentTime={currentTime}
      isFullscreen={isFullscreen}
      showControls={showControls}
      onTogglePlayPause={handleTogglePlayPause}
      onBuffer={handleBuffer}
      onLoad={handleLoad}
      onProgress={handleProgress}
      onSeek={handleSeek}
      onToggleFullscreen={handleToggleFullscreen}
      onDoubleTapSeekForward={handleDoubleTapSeekForward}
      onDoubleTapSeekBackward={handleDoubleTapSeekBackward}
    />
  );
};

export default VideoWrapper;

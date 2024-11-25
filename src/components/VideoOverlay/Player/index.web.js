import React, { useEffect, useRef, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import Hls from 'hls.js';

const VideoPlayer = ({
  id,
  src,
  isPaused,
  poster,
  onLoad,
  showControls,
  showSeekIndicator,
  progress,
  onEnded,
  onDoubleTapSeekForward,
  onDoubleTapSeekBackward,
  onTogglePlayPause,
  onFullscreenToggle
}) => {
  const videoRef = useRef(null);

  let controlTimeoutRef = useRef(null);
  let lastTap = useRef(0);

  // Toggle play/pause and show controls briefly
  const handleVideoClick = useCallback(() => {
    if (onTogglePlayPause) onTogglePlayPause(!isPaused); // Notify parent for play/pause change
    if (videoRef.current) {
      // Toggle play/pause directly on the video element
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }

    if (controlTimeoutRef.current) clearTimeout(controlTimeoutRef.current);
    controlTimeoutRef.current = setTimeout(() => {
      // Hide controls after a timeout
    }, 3000);
  }, [onTogglePlayPause]);

  // Seek on double tap with progress indicator
  const handleDoubleTapSeek = useCallback((direction) => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      if (direction === 'forward' && onDoubleTapSeekForward) {
        onDoubleTapSeekForward();
      } else if (direction === 'backward' && onDoubleTapSeekBackward) {
        onDoubleTapSeekBackward();
      }
    }
    lastTap.current = now;
  }, [onDoubleTapSeekForward, onDoubleTapSeekBackward]);

  // Set up HLS stream
  useEffect(() => {
    if (videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(videoRef.current);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
            if (isPaused) {
                videoRef.current.pause();
              } else {
                videoRef.current.play();
              }
        });
      } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        videoRef.current.src = src;
        videoRef.current.addEventListener('loadedmetadata', () => {
            if (isPaused) {
                videoRef.current.pause();
              } else {
                videoRef.current.play();
              }
        });
      }
    }
  }, [src]);

  // Auto play/pause based on parent-controlled state
  useEffect(() => {
    if (videoRef.current) {
      if (isPaused) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  }, [isPaused]);

  // Fullscreen toggle
  const toggleFullScreen = useCallback(() => {
    if (onFullscreenToggle) onFullscreenToggle();
    // Fullscreen logic
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.mozRequestFullScreen) { // Firefox
        videoRef.current.mozRequestFullScreen();
      } else if (videoRef.current.webkitRequestFullscreen) { // Chrome, Safari, Opera
        videoRef.current.webkitRequestFullscreen();
      }
    }
  }, [onFullscreenToggle]);

  const handleMetadataLoaded = () => {
    if (onLoad) {
      onLoad({ duration: videoRef.current.duration }); // Send the duration
    }
  };

  return (
    <View style={styles.container}>
      <video
        ref={videoRef}
        id={id}
        src={src}
        poster={poster}
        controls={false}
        autoPlay
        playsInline
        muted
        preload="auto"
        onLoadedMetadata={handleMetadataLoaded} 
        onEnded={onEnded}
        onClick={handleVideoClick}
        style={styles.video}
      />
      {/* Double-tap handlers */}
      {/* <div
        style={styles.touchableLeftSide}
        onClick={() => handleDoubleTapSeek('backward')}
      /> */}
      {/* <div
        style={styles.touchableRightSide}
        onClick={() => handleDoubleTapSeek('forward')}
      /> */}

      {/* Seek Indicator */}
      {/* {showSeekIndicator && (
        <div style={styles.seekIndicator}>
          {showSeekIndicator}
        </div>
      )} */}

      {/* Play/Pause and Fullscreen Controls */}
      {/* {showControls && (
        <div style={styles.controls}>
          <button onClick={handleVideoClick} style={styles.playPauseButton}>
            {isPaused ? '▶' : '⏸️'}
          </button>
          <button onClick={toggleFullScreen} style={styles.fullscreenButton}>
            🔲
          </button>
        </div>
      )} */}

      {/* Seekbar */}
      {/* {showControls && (
        <div style={styles.seekbarContainer}>
          <div style={{ ...styles.seekbar, width: `${progress}%` }} />
        </div>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    justifyContent: 'center',
    height: '100%',
  },
  video: {
    cursor: 'pointer',
    width: '100%',
    height: '100%',
  },
  controls: {
    position: 'absolute',
    bottom: '50%',
    left: '50%',
    transform: 'translate(-50%, 50%)',
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
    borderRadius: 5,
    zIndex: 100
  },
  playPauseButton: {
    fontSize: 20,
    color: 'white',
    backgroundColor: 'transparent',
    border: 'none',
  },
  fullscreenButton: {
    fontSize: 20,
    color: 'white',
    backgroundColor: 'transparent',
    border: 'none',
  },
  touchableLeftSide: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '30%',
    height: '100%',
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  touchableRightSide: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: '30%',
    height: '100%',
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  seekIndicator: {
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: 18,
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 8,
    borderRadius: 5,
  },
  seekbarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: '#555',
  },
  seekbar: {
    height: '100%',
    backgroundColor: '#fff',
  },
});

export default VideoPlayer;

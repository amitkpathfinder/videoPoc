import React, { useRef, useEffect } from 'react';
import { 
  View, 
  Text,
  StyleSheet, 
  ActivityIndicator, 
  Dimensions, 
  TouchableOpacity,
  TouchableWithoutFeedback 
} from 'react-native';
import Slider from '@react-native-community/slider';
import Video from 'react-native-video';
import { Maximize2, PauseCircle, PlayCircle } from 'lucide-react-native';

const VideoPlayer = ({
  src,
  isPaused,
  poster,
  duration,
  currentTime,
  isFullscreen,
  showControls,
  onLoad,
  onProgress,
  onSeek,
  onToggleFullscreen,
  onDoubleTapSeekForward,
  onDoubleTapSeekBackward,
  onEnded,
}) => {
  const videoRef = useRef(null);
console.log('posterUrl',poster);
  // useEffect(() => {
  //   if (showControls && onTogglePlayPause) {
  //     const timeout = setTimeout(() => onTogglePlayPause(false), 3000);
  //     return () => clearTimeout(timeout);
  //   }
  // }, [showControls, onTogglePlayPause]);

  // const handleDoubleTap = (side) => {
  //   if (side === 'left' && onDoubleTapSeekBackward) {
  //     onDoubleTapSeekBackward();
  //   } else if (side === 'right' && onDoubleTapSeekForward) {
  //     onDoubleTapSeekForward();
  //   }
  // };

  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        <Video
          ref={videoRef}
          source={{ uri: src }}
          onLoad={(e) => onLoad({ duration: e.duration })}
          style={styles.backgroundVideo}
          autoplay
          paused={isPaused}
          controls={false}
          // fullscreen={isFullscreen}
          muted
          // repeat
          resizeMode="none"
          // onBuffer={onBuffer}
          // onLoad={onLoad}
          // renderLoader={<Text>loading...</Text>}
          poster={{
            source: { uri: poster },
            // resizeMode: "cover",
          }}
          onProgress={onProgress}
          onEnd={onEnded}
          onFullscreenPlayerWillPresent={() => onToggleFullscreen(true)}
          onFullscreenPlayerWillDismiss={() => onToggleFullscreen(false)}
        />
        
        {/* <TouchableWithoutFeedback onPress={() => handleDoubleTap('left')}>
          <View style={styles.touchableLeftSide} />
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => handleDoubleTap('right')}>
          <View style={styles.touchableRightSide} />
        </TouchableWithoutFeedback>

        <TouchableOpacity 
          style={styles.centerContainer} 
          onPress={() => onTogglePlayPause(!isPaused)}
          activeOpacity={1}>
          {showControls && (
            <View style={styles.playPauseIcon}>
              {isPaused ? (
                <PlayCircle color="white" size={50} />
              ) : (
                <PauseCircle color="white" size={50} />
              )}
            </View>
          )}
        </TouchableOpacity>

        {isBuffering && (
          <View style={styles.bufferingContainer}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        )} */}
      </View>
      
      {/* {showControls && (
        <View style={styles.controlsContainer}>
          <View style={styles.seekbarContainer}>
            <Slider
              style={styles.seekbar}
              value={currentTime}
              minimumValue={0}
              maximumValue={duration}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              thumbTintColor="#FFFFFF"
              onSlidingComplete={onSeek}
            />
          </View>
          
          <TouchableOpacity 
            style={styles.fullscreenButton}
            onPress={() => onToggleFullscreen(!isFullscreen)}
          >
            <Maximize2 color="#ffffff" size={24} />
          </TouchableOpacity>
        </View>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
 
  videoContainer: {
    width: '100%',
    position: 'relative',
  },
  backgroundVideo: {
    width: '100%',
    height: '100%',
  },

  touchableLeftSide: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '30%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  touchableRightSide: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: '30%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  centerContainer: {
    position: 'absolute',
    left: '30%',
    width: '40%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playPauseIcon: {
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 1000,
  },
  bufferingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  seekbarContainer: {
    flex: 1,
    marginRight: 40,
  },
  seekbar: {
    width: '100%',
    height: 40,
  },
  fullscreenButton: {
    position: 'absolute',
    right: 8,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default VideoPlayer;

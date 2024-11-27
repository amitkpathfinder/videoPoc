import React, { useRef, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  Platform,
} from 'react-native';
import Video from 'react-native-video';

const VideoPlayer = ({
  id,
  src,
  isPaused,
  poster,
  onLoad,
  onProgress
}) => {
  const videoRef = useRef(null);
  useEffect(() => {
    console.log('posterUrl', poster);
  }, [poster]); 

  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        <Video
          videoID={id}
          ref={videoRef}
          source={{ uri: src }}
          onLoad={(e) => onLoad({ duration: e.duration })}
          style={styles.backgroundVideo} 
          paused={isPaused}
          resizeMode="none"
          {...(Platform.OS !== 'ios' && {
            poster: { source: { uri: poster } },
          })}
          onProgress={(data) => onProgress(data.currentTime)}
        />
      </View>
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
  }
});

export default VideoPlayer;

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Dimensions, PanResponder } from 'react-native';
import VideoWrapper from './Wrapper/VideoWrapper';
// import backendData from './backend.json'; // Ensure the path to backend.json is correct

// const { width } = Dimensions.get('window');

const VideoOverlay = () => {
  const [paused, setPaused] = useState(true);
  const [videoDuration, setVideoDuration] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [videos, setVideos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // Load the video list from backend.json
  // useEffect(() => {
  //   setVideos(backendData);
  // }, []);

  useEffect(() => {
    console.log('VideoOverlay:Loading video list');
    const fetchVideos = async () => {
        const response = await fetch('http://10.112.4.67:8080/backend.json');
        const data = await response.json();
        setVideos(data);
    };
    fetchVideos();
}, []);

  const togglePlayPause = () => setPaused((prev) => !prev);
  const toggleFullscreen = () => setFullscreen((prev) => !prev);


  const handleSwipe = (direction) => {
    if (direction === 'left' && currentIndex < videos.length - 1) {
      setCurrentIndex(currentIndex + 1);
     // setPaused(true); // Pause new video by default
    } else if (direction === 'right' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
     // setPaused(true); // Pause new video by default
    }
  };

  // PanResponder for swipe gestures
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) =>
      Math.abs(gestureState.dx) > 20, // Start gesture if swipe distance is significant
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dx > 50) {
        handleSwipe('right'); // Swipe right
      } else if (gestureState.dx < -50) {
        handleSwipe('left'); // Swipe left
      }
    },
  });

  if (videos.length === 0) {
    return <Text>Loading...</Text>;
  }


  const currentVideo = videos[currentIndex];

  return (
    <View style={[styles.container, fullscreen ? styles.containerFull : '']} {...panResponder.panHandlers}>
      
      {/* Video Player */}
      <VideoWrapper
        src={currentVideo.video}
        poster={currentVideo.poster}
        onDurationChange={setVideoDuration}
        paused={paused}
        fullscreen={fullscreen}
        onProgress={setCurrentTime}
      />

      {/* Overlay Controls */}
      <View style={styles.overlayBox}>
        <View style={styles.contentContainer}>
          <Text style={styles.heading}>{currentVideo.heading}</Text>
          <Text style={styles.description}>{currentVideo.description}</Text>
          <Text style={styles.component}>{currentVideo.component}</Text>
        </View>
        <View style={styles.controls}>
          <TouchableOpacity onPress={togglePlayPause}>
            <Text style={styles.controlText}>{paused ? 'Play' : 'Pause'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleFullscreen}>
            <Text style={styles.controlText}>{fullscreen ? 'Exit Fullscreen' : 'Go FullScreen'}</Text>
          </TouchableOpacity>
          <Text style={styles.controlText}>Duration: {videoDuration.toFixed(2)}/{currentTime.toFixed(2)} seconds</Text>
        </View>
        <View style={styles.navigation}>
          <TouchableOpacity
            onPress={() => handleSwipe('right')}
            disabled={currentIndex === 0}
          >
            <Text style={[styles.navButton, currentIndex === 0 && styles.disabled]}>
              Previous
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSwipe('left')}
            disabled={currentIndex === videos.length - 1}
          >
            <Text style={[styles.navButton, currentIndex === videos.length - 1 && styles.disabled]}>
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width:'100%',
    height:300,
    position: 'relative',
  },
  containerFull:{
    height:'100%',
  },
  overlayBox: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    top: 0,
    zIndex: 1000,
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  contentContainer: {
    padding: 20,
  },
  heading: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    color: '#ccc',
    fontSize: 18,
    marginBottom: 5,
  },
  component: {
    color: '#aaa',
    fontSize: 16,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
  },
  controlText: {
    color: '#fff',
    fontSize: 16,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  navButton: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  disabled: {
    color: '#555',
  },
});

export default VideoOverlay;

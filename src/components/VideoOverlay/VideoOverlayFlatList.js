import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableWithoutFeedback } from 'react-native';
import VideoWrapper from './Wrapper/VideoWrapper';

const { width, height } = Dimensions.get('window');

const VideoOverlayFlatList = () => {
  const [videos, setVideos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);

  useEffect(() => {
    const fetchVideos = async () => {
    //   const response = await fetch('http://192.168.1.15:8080/backend.json');
      const response = await fetch('http://10.112.4.67:8080/backend.json');
      const data = await response.json();
      setVideos(data);
    };
    fetchVideos();
  }, []);

  const onViewableItemsChanged = React.useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const newIndex = viewableItems[0].index;
      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
        setPaused(false); // Ensure the new video starts playing
      }
    }
  });

  const onScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const newIndex = Math.round(offsetY / height);

    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
      setPaused(false); // Ensure the video at the new index plays
    }
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 0, // Ensure any part of the video is visible
  };

  const togglePlayPause = () => {
    console.log('Toggle Play');
    setPaused((prev) => !prev);
  };

  const handleOnLoad = ({ duration }) => {
    setVideoDuration(duration);
  }

  const renderVideoItem = ({ item, index }) => (
    <View style={[styles.videoContainer, fullscreen && styles.fullscreen]}>
      <TouchableWithoutFeedback onPress={togglePlayPause}>
        <View>
            <VideoWrapper
                id={item.id}
                src={item.video}
                poster={item.poster}
                paused={index !== currentIndex || paused}
                onLoad={handleOnLoad}
                onProgress={setCurrentTime}
            />  
            
            <View style={styles.overlayBox}>
                <View style={styles.contentContainer}>
                <Text style={styles.heading}>{item.heading}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.component}>{item.component}</Text>
                </View>
            </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );

  if (videos.length === 0) {
    return <Text>Loading...</Text>;
  }

  return (
    <FlatList
      data={videos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderVideoItem}
      horizontal={false} // Change to `true` for horizontal scrolling
      pagingEnabled
      showsVerticalScrollIndicator={false}
      onViewableItemsChanged={onViewableItemsChanged.current}
      viewabilityConfig={viewabilityConfig}
      onScroll={onScroll} // Detect scroll to update current index
      scrollEventThrottle={16} // Optimize scroll event calls
    />
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    width: width,
    height: height,
    position: 'relative',
    backgroundColor: 'black',
  },
  fullscreen: {
    height: '100%',
  },
  overlayBox: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'space-between',
    paddingVertical: 20,
    zIndex: 1000,
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
});

export default VideoOverlayFlatList;

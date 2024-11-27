import React from 'react';
import { View, Text } from 'react-native';
import VideoOverlay from './components/VideoOverlay/VideoOverlay';
import VideoOverlayFlatList from './components/VideoOverlay/VideoOverlayFlatList';

const App = () => {
  return (
    <View style={{height:'100%'}}>
        {/* <VideoOverlay /> */}
        <VideoOverlayFlatList />
    </View>
  );
};

export default App;

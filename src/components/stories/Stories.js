import React from 'react';
import StoryViewer from './StoryViewer';

const stories = [
    "https://path-to-video1.mp4",
    "https://path-to-video2.mp4",
    "https://path-to-video3.mp4",
    // Add more video URLs here
];

export default function App() {
    return <StoryViewer stories={stories} />;
}

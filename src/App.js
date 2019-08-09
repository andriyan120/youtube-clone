import React from 'react';

import {
    SearchBar,
    VideoDetail,
    VideoList,
} from './components';

import { Grid } from '@material-ui/core';
import youtube from './api/youtube';

class App extends React.Component {
    state = {
        videos: [],
        selectedVideo: null,
    }

    handleSubmit = async (searchTerm) => {
        const response = await youtube.get('search', {
            params: {
                part: 'snippet',
                maxResults: 5, 
                key: 'AIzaSyBHXW-kp_v5nEyk3lT6WSYa6PirjlD9-2c',
                q: searchTerm,
            }
        });
        
        this.setState({ videos: response.data.items, selectedVideo: response.data.items[0] })
    }

    onVideoSelect = (video) => {
        this.setState({ selectedVideo: video })
    }

    render() {
        const {selectedVideo, videos} = this.state;
        return (
            <Grid style={{ justifyContent: 'center' }} container spacing={10}>
                <Grid item xs={11}>
                    <Grid container spacing={10}>
                        <Grid item xs={12}>
                            <SearchBar onFormSubmit={this.handleSubmit} />
                        </Grid>
                        <Grid item xs={8}>
                           <VideoDetail video={selectedVideo}/>
                        </Grid>
                        <Grid item xs={4}>
                            <VideoList videos={videos} onVideoSelect={this.onVideoSelect} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default App;
import React from 'react';
import VideoForm from '../withData/VideoForm';
import { Provider } from 'mobx-react';
import video from '../../store/models/Video';
import { Typography } from '@material-ui/core';
class NewVideo extends React.Component{

    componentDidMount(){

    }

    render(){
        return (
            <React.Fragment>
                <br/>
                <Typography style={{
                    textAlign: 'center',
                }} variant="display1" component="h1">
                    新建视频
                </Typography>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <Provider video={video}>

                <VideoForm />
                </Provider>
            </React.Fragment>
        )
    }

}

export default NewVideo;
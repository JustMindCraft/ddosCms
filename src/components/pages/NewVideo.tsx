import React from 'react';
import VideoForm from '../withData/VideoForm';
import { Provider } from 'mobx-react';
import video from '../../store/models/Video';
import { Typography, Button, createStyles, withStyles, Fab } from '@material-ui/core';
import { Link } from 'react-router-dom';
const BackListLink = (props:any) => <Link to='/videos' {...props} />

const styles = createStyles({
    button: {
        position: 'fixed',
        zIndex: 100,
    }
})

class NewVideo extends React.Component<any, any>{

    componentDidMount(){

    }

    render(){
        const { classes } = this.props;
        return (
            <React.Fragment>
                <br/>
                <Typography style={{
                    textAlign: 'center',
                }} variant="display1" component="h1">
                    新建视频
                </Typography>
                <Fab className={classes.button} component={BackListLink} variant="extended" color="primary">--返回视频列表---></Fab>
                <Provider video={video}>
                    <VideoForm />
                </Provider>
            </React.Fragment>
        )
    }

}

export default withStyles(styles)(NewVideo);
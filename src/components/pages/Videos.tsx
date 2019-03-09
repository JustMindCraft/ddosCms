import React from 'react';
import { Typography, Divider, createStyles, withStyles } from '@material-ui/core';
import VideoList from '../withData/VideoList';

const styles = createStyles({
  typography: {
    textAlign: "center",
  }
})

interface IVideosProps{
    classes: any
}

class Videos extends React.Component<IVideosProps> {
  
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
          <br/>
          <Typography className={classes.typography} variant="h4">视频管理</Typography>
          <br/>
          <VideoList />
      </React.Fragment>
       
     
    );
  }
}

export default withStyles(styles)(Videos);
import React from 'react';
import { Typography, Divider, createStyles, withStyles } from '@material-ui/core';
import PostList from '../withData/PostList';

const styles = createStyles({
  typography: {
    textAlign: "center",
  }
})

interface IPostsProps{
    classes: any
}

class Posts extends React.Component<IPostsProps> {
  
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
          <br/>
          <Typography className={classes.typography} variant="h4">文章管理</Typography>
          <br/>
          <PostList />
      </React.Fragment>
       
     
    );
  }
}

export default withStyles(styles)(Posts);
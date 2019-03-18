import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { RootNode } from '../../gunDB';
import Cards from '../containers/Cards';
import { Typography } from '@material-ui/core';
const styles = (theme: any) => createStyles({
 
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "space-around",
    alignItems: "baseline",
    flexWrap: "wrap",
    flexShrink: "initial",
    paddingLeft: 5,
    width: "100%",
    maxWidth: 1336
  },
  
  
});

interface IHomePageProps {
  classes: any,
}

class HomePage extends React.Component<IHomePageProps, any> {

  constructor(props:any){
    super(props);
    this.state = {
      videos: [],
      posts: []
    }
  }

  componentWillMount(){
    const { videos, posts} = this.state;
    RootNode.get("videos")
    .map(
      (video:any) => (video && video.status === "published") ? video:undefined
    ).once((data: any, key:string)=>{
      if(data===null){
        return false;
      }

      videos.unshift(data);
      this.setState({
        videos,
      })
      
    })
    RootNode.get("posts")
    .map(
      (post:any) => (post && post.status === "published") ? post:undefined
    ).once((data: any, key:string)=>{
      if(data===null){
        return false;
      }
      
      posts.unshift(data);
      this.setState({
        posts,
      })
      
    })
  }

  render() {
    const { classes } = this.props;

    const { videos, posts } = this.state;

    document.title = "叉烧俱乐部"
    
    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.container}>
        <div style={{
          width: "100%",
          marginTop: 30
        }}>
          <Typography variant="title">最新文章</Typography>
        </div>
        <Cards list={posts} source="posts" />
        
         <hr style={{
          width: "100%"
        }}/>

         <div style={{
          width: "100%",
          marginTop: 30
        }}>
          <Typography variant="title">最新视频</Typography>
        </div>
       
        <Cards list={videos} source="videos" />
          
        
        </main>
       
      </React.Fragment>
    )
  }

}

export default withStyles(styles)(HomePage);
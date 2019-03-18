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

class Videos extends React.Component<IHomePageProps, any> {

  constructor(props:any){
    super(props);
    this.state = {
      videos: [],
      hotVideos: [],
      rVideos: [],
    }
  }

  componentWillMount(){
    const { videos, hotVideos, rVideos} = this.state;
    
   
    //===================hostPost
    RootNode.get("videos")
    .map(
      (post:any) => (post && post.visited >= 2) ? post:undefined
    ).once((data: any, key:string)=>{
      if(data===null){
        return false;
      }
      
      hotVideos.unshift(data);
      this.setState({
        hotVideos,
      })
      
    })

    //==================最新
    RootNode.get("videos")
    .map(
      (post:any) => (post && post.status === "published") ? post:undefined
    ).once((data: any, key:string)=>{
      if(data===null){
        return false;
      }
      
      videos.unshift(data);
      this.setState({
        videos,
      })
      
    })
    //======推荐
    RootNode.get("videos")
    .map(
      (post:any) => (post && post.isRecommend) ? post:undefined
    ).once((data: any, key:string)=>{
      if(data===null){
        return false;
      }
      
      rVideos.unshift(data);
      this.setState({
        rVideos,
      })
      
    })
  }

  render() {
    const { classes } = this.props;

    const { videos, hotVideos, rVideos } = this.state;

    document.title = "叉烧俱乐部"
    
    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.container}>
        <div style={{
          width: "100%",
          marginTop: 30
        }}>
          <Typography variant="title">推荐视频</Typography>
        </div>
        <Cards list={rVideos} source="videos" />
        
         
        <hr style={{
          width: "100%"
        }}/>
        <div style={{
          width: "100%",
          marginTop: 30
        }}>
          <Typography variant="title">热点视频</Typography>
        </div>
        <Cards list={hotVideos} source="videos" />
        
         
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

export default withStyles(styles)(Videos);
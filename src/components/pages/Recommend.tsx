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

class Recommend extends React.Component<IHomePageProps, any> {

  constructor(props:any){
    super(props);
    this.state = {
      rPosts: [],
      rVideos: [],
    }
  }

  componentWillMount(){
    const { rVideos, rPosts} = this.state;
    
   
    //===================推荐视频
    RootNode.get("videos")
    .map(
      (video:any) => (video && video.isRecommend ) ? video:undefined
    ).once((data: any, key:string)=>{
      if(data===null){
        return false;
      }
      
      rVideos.unshift(data);
      this.setState({
        rVideos,
      })
      
    })

   
    //======推荐
    RootNode.get("posts")
    .map(
      (post:any) => (post && post.isRecommend) ? post:undefined
    ).once((data: any, key:string)=>{
      if(data===null){
        return false;
      }
      
      rPosts.unshift(data);
      this.setState({
        rPosts,
      })
      
    })
  }

  render() {
    const { classes } = this.props;

    const { rVideos, rPosts } = this.state;

    document.title = "叉烧俱乐部"
    
    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.container}>
        <div style={{
          width: "100%",
          marginTop: 30
        }}>
          <Typography variant="title">推荐文章</Typography>
        </div>
        <Cards list={rPosts} source="posts" />
        
         
        <hr style={{
          width: "100%"
        }}/>
         <div style={{
          width: "100%",
          marginTop: 30
        }}>
          <Typography variant="title">推荐视频</Typography>
        </div>
        <Cards list={rVideos} source="posts" />
        
        
        
        </main>
       
      </React.Fragment>
    )
  }

}

export default withStyles(styles)(Recommend);
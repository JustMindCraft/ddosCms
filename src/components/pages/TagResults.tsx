import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { RootNode } from '../../gunDB';
import Cards from '../containers/Cards';
import { Typography, Chip } from '@material-ui/core';
import { withRouter } from 'react-router';
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
  tag:  {
    maxWidth: 250,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
    cursor: "pointer",
    textDecoration: "none",
   
  },
  
  
});

interface IHomePageProps {
  classes: any,
  match: any
}

class TagResults extends React.Component<IHomePageProps, any> {

  constructor(props:any){
    super(props);
    this.state = {
      posts: [],
      videos: []
    }
  }

  componentWillReceiveProps(nextProps:any){
      if(this.props !== nextProps){
        const tagName = nextProps.match.params.tag;
        console.log('g更新了');
        
        this.setState({
            posts: [],
            videos: []
          })
        this.change(tagName);
      }
    
      
  }

  change = (tagName:string) => {
   
    
    RootNode.get("tags").map((tag:any)=> (tag && tag.name===tagName)? tag: undefined).once((data:any, key:string)=>{
        if(data===null){
            return false;
        }
        
        RootNode.get("posts/"+data.contentId).once((data:any, key:string)=>{
            const { posts } = this.state;
           
            if(data && data.status==="published"){
                posts.unshift(data)
                this.setState({
                    posts,
                })
            }
            
        })
        RootNode.get("videos/"+data.contentId).once((data:any, key:string)=>{
            const { videos } = this.state;
            
            if(data && data.status==="published"){
                videos.unshift(data)
                this.setState({
                    videos,
                })
            }
            
        })
        
    })
  }

  componentWillMount(){
      
      const { match } = this.props;
      this.change(match.params.tag)
    
  }

  componentWillUnmount(){
      console.log("unmount");
      
    this.setState({
        posts: [],
        videos: []
      })
  }

  render() {
    const { classes, match } = this.props;

    const { posts, videos } = this.state;

    document.title = "叉烧俱乐部 | 标签云"
    
    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.container}>
            <div style={{
                width: "100%",
                marginTop: 30
            }}>
            <Typography variant="title">标签:{match.params.tag}</Typography>
            </div>
            <hr style={{
                width: "100%"
                }}/>
            <div style={{
            width: "100%",
            marginTop: 30
            }}>
            <Typography variant="title">相关文章</Typography>
            </div>
            <Cards list={posts} source="posts" />
            
            <hr style={{
            width: "100%"
            }}/>

            <div style={{
                width: "100%",
                marginTop: 30
                }}>
            <Typography variant="title">相关视频</Typography>
            </div>
            <Cards list={videos} source="videos" />
            
        </main>
       
      </React.Fragment>
    )
  }

}

export default withRouter(withStyles(styles)(TagResults) as any) as any;
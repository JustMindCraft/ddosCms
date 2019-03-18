import React from 'react';
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Paper, Typography, Divider } from '@material-ui/core';
import { RootNode } from '../../gunDB';

const styles = (theme: any) => createStyles({
  
  cardHeader: {
    backgroundColor: theme.palette.grey[200],
    
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing.unit * 2,
  },
  cardActions: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing.unit * 2,
    },
  },
  footer: {
    marginTop: theme.spacing.unit * 8,
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit * 6}px 0`,
    textAlign: "center",
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "space-around",
    alignItems: "baseline",
    flexWrap: "wrap",
    flexShrink: "initial",
    paddingLeft: "5%",
    paddingRight: "5%",
    width: "100%"
  },
  cardItem:  {
    maxWidth: 300,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
    cursor: "pointer",
    [theme.breakpoints.down('xs')]: {
      width: "40%"
    },
  },
  cardTitle: {

  }
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
      console.log(data);

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
        {
          posts.length!==0 && posts.map((post:any, index:number)=>
            <Paper className={classes.cardItem} key={index}>
              <img src={post.coverUrl} alt={post.title} style={{
              width: "100%"
                
              }} />
              <div style={{
                padding: 5
              }}>
                <Typography variant="title">{post.title}</Typography>
                <Typography variant="subtitle2" style={{
                  textAlign: "right"
                }}>阅读(0)</Typography>
              </div>
             
            </Paper>
          )
        }
         <hr style={{
          width: "100%"
        }}/>
         <div style={{
          width: "100%",
          marginTop: 30
        }}>
          <Typography variant="title">最新视频</Typography>
        </div>
       
        {
          videos.length!==0 && videos.map((video:any, index:number)=>
            <Paper className={classes.cardItem} key={index}>
              <img src={video.coverUrl} alt={video.title} style={{
              width: "100%"
                
              }} />
              <div style={{
                padding: 5
              }}>
              <Typography variant="title">{video.title}</Typography>
              <Typography variant="subtitle2" style={{
                textAlign: "right"
              }}>观看(0)</Typography>
              </div>
              
            </Paper>
          )
        }
          
        
        </main>
        {/* Footer */}
        <footer className={classNames(classes.footer, classes.layout)}>
          CopyRight@JustMindCraft.co
          <br/>
          <Link to="/admin">管理中心</Link>
        </footer>
        {/* End footer */}
      </React.Fragment>
    )
  }

}

export default withStyles(styles)(HomePage);
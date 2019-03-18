import React from 'react';
import SearchInput from '../public/SearchInput';
import { createStyles, CssBaseline, withStyles, Typography, Paper } from '@material-ui/core';
import { RootNode } from '../../gunDB';
import Cards from '../containers/Cards';
import { Link } from 'react-router-dom';


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
    cardItem:  {
        maxWidth: 250,
        marginTop: 10,
        marginBottom: 10,
        marginRight: 10,
        cursor: "pointer",
        textDecoration: "none",
        [theme.breakpoints.down('xs')]: {
          width: 165
        },
      },
    
  });

class SearchPage extends React.Component<any, any>{

    constructor(props:any){
        super(props);
        this.state = {
            posts: [],
            videos: [],
            tags: [],
            searchText: "",
        }
    }

    findTags = (text:string) => {
        const { tags } = this.state;
        RootNode.get("tags")
        .map((tag:any)=>(tag && tag.name===text)? tag : undefined)
        .on((data:any, key:any)=>{

                console.log("获取标签");
                
                console.log(key, data);
                RootNode.get("videos/"+data.contentId).once((data:any, key:string)=>{
                    if(data && data.status==="published"){
                        tags.unshift(data);
                        this.setState({
                            tags,
                        })
                    }
                    
                })
                RootNode.get("posts/"+data.contentId).once((data:any, key:string)=>{
                    if(data && data.status==="published"){
                        tags.unshift(data);
                        this.setState({
                            tags,
                        })
                    }
                    
                })
                
            
        })
    }

    findPosts = (text:string) => {
        const { posts } = this.state;
        
        RootNode.get("posts")
            .map(
            (post:any) => {
                if(post && post.status === "published"){
                    if(post.body.toString().indexOf(text)>=0){
                        return post;
                    }
                    if(post.title.toString().indexOf(text)>=0){
                        return post;
                    }
                   
                }
                return undefined
            }
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


    findVideos = (text:string) => {
        const { videos } = this.state;
        
        RootNode.get("videos")
            .map(
            (video:any) => {
                if(video && video.status === "published"){
                    if(video.description.toString().indexOf(text)>=0){
                        return video;
                    }
                    if(video.title.toString().indexOf(text)>=0){
                        return video;
                    }
                   
                }
                return undefined
            }
            ).once((data: any, key:string)=>{
                if(data===null){
                    return false;
                }
            
                videos.unshift(data);
                this.setState({
                    videos,
                })
            
            })
    }


    handleOnChange = (text:string) => {
        this.setState(
            {
                posts: [],
                videos: [],
                tags: [],
                searchText: text,
            }
        )
        if(text===""){
            return false;
        }
        
        this.findPosts(text);
        this.findTags(text);
        this.findVideos(text);
        

    }
    render(){
        
        const { classes } = this.props;
        const {  posts, videos, tags, searchText } = this.state;
        
        return (
            <React.Fragment>
                 <CssBaseline />
                 <main className={classes.container}>
                    <SearchInput autoFocus={true} onChange={this.handleOnChange} />
                    <div style={{
                        width: "100%",
                        marginTop: 30
                    }}>
                    <Typography variant="title">相关文章</Typography>
                     </div>
                     <hr style={{
                        width: "100%"
                        }}/>
                    <Cards list={posts} source="posts" />
                     <div style={{
                        width: "100%",
                        marginTop: 30
                    }}>
                    <Typography variant="title">相关视频</Typography>
                    </div>
                    <hr style={{
                        width: "100%"
                        }}/>
                    
                    <Cards list={videos} source="videos" />
                    
                   
                    <div style={{
                        width: "100%",
                        marginTop: 30
                    }}>
                    <Typography variant="title">相关标签:{searchText}</Typography>
                    
                    <hr style={{
                        width: "100%"
                        }}/>
                    </div>
                   
                    {
                        tags.length!==0 && tags.map((item:any, index:number)=>
                            <Link key={index} to={"/"+(item.body?"posts":"videos")+"/"+item.id}  className={classes.cardItem}>

                            <Paper className={classes.cardItem} key={index}>
                                <img src={item.coverUrl} alt={item.title} style={{
                                    width: "100%"
                                    
                                }} />
                                <div style={{
                                    padding: 5
                                }}>
                                    <Typography variant="title">{item.title}</Typography>
                                    <Typography variant="subtitle2" style={{
                                    textAlign: "right"
                                    }}>{item.body?"阅读":"观看"}(0)</Typography>
                                </div>
                            
                            </Paper>
                            </Link>
                        )
                    }

                 </main>

            </React.Fragment>
        )
    }
}


export default withStyles(styles)(SearchPage); 
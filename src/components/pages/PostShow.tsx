import React from 'react';
import { Paper, createStyles, withStyles, CircularProgress, Typography } from '@material-ui/core';
import { observer, inject } from 'mobx-react';
import TagSmallList from '../containers/TagSmallList';
import renderHTML from 'react-render-html';
import { Link, withRouter } from 'react-router-dom';
import { RootNode } from '../../gunDB';


const styles = createStyles({
    paper: {
        paddingTop: 20,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        alignCentent: 'center',
        justifyContent: 'space-around',
        color: 'black',
    },
    
    body:{
        paddingTop: 20,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        alignCentent: 'baseline',
        justifyContent: 'space-around',
        maxWidth: 1366,
        wordBreak:"break-all",
        width:"100%"
    }
    
})

class PostShow extends React.Component<any, any> {
    constructor(props:any) {
        super(props);
        RootNode.get('status').put("online");
        this.state = {
            post: {},
            loading: true,
            loadingVisited: true,
        }
        
    }

    handleTagClick = (tag:string) => {
        const { history } = this.props;
        history.push('/tags/'+tag);

    }

   
    componentDidMount(){
    
        // this.updateCount();
        console.log("did mount");
        const { match } = this.props;
        
        RootNode.get("posts").map((post:any)=>(post && post.id===match.params.id)?post: undefined)
        .once((data:any, key:string)=>{
            const { post, loading} = this.state;
            if(loading ===false && post.id){
                return false;
            }
            console.log(key, data);
            document.title =  data.title;
            
            let updateCount = data.visited;
            if(!updateCount){
                updateCount=0
            }
            this.setState({
                post: data,
                loading: false,
            })
            RootNode.get("posts").get(key).get("visited").put(updateCount+1, (ack:any)=>{
                console.log(ack);
                this.setState({
                    loadingVisited: false,
                })
               
            });

        })
        
       
        
    }

    render(){
        const { classes } = this.props;
        const { post, loading, loadingVisited} = this.state;
        return (
            <React.Fragment>
             
                {
                    loading ? 
                    <div>
                        <CircularProgress />
                    </div>
                    :
                    <React.Fragment>
                        <div style={{
                            background: `url(${post.coverUrl}) no-repeat`,
                            backgroundSize: 'contain',
                            width: "80%",
                            padding: 30,
                            backgroundPosition: "center",

                        }}>
                        <Typography variant="title" component="div" >
                            <div style={{
                            textAlign: 'center',
                            background: "rgba(20, 20, 20, 0.63)",
                            padding: 20,
                            color: "white"
                                }}>
                                {post.title}
                            </div>
                        </Typography>
                         
                         <div>
                             <br />
                         </div>
                         <div style={{
                            textAlign: 'center'
                        }}>
                             <TagSmallList source="posts" 
                             recordId={post.id} onClick={this.handleTagClick}/>
                         </div>
                         <div>
                             <br />
                         </div>
                        
                         <div>
                             <br />
                         </div>
                        </div>
                        
                         <Paper className={classes.body}>
                            <Typography variant="body1" component="div" >
                                {   
                                    post.body ? 
                                    renderHTML(post.body) 
                                    : 
                                    renderHTML("<span></span>")
                                }
                            </Typography>
                            <div>阅读量：{loadingVisited? "统计中" : post.visited}</div>
                         </Paper>
                    </React.Fragment>
                }

                 
                 
            </React.Fragment>
            
        )
    }
}

export default  withRouter(withStyles(styles)(PostShow) as any) as any;
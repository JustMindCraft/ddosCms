import React from 'react';
import { Paper, createStyles, withStyles, CircularProgress, Typography } from '@material-ui/core';
import { observer, inject } from 'mobx-react';
import TagSmallList from '../containers/TagSmallList';
import renderHTML from 'react-render-html';
import { Link, withRouter } from 'react-router-dom';
import TorrentVideoPlayer from '../withData/TorrentVideoPlayer';
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
        width: "100%"

    },
    player: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        alignCentent: 'center',
        justifyContent: 'baseline',
        width: "100%"
    },
    description:{
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
        width: "100%"

    }
    
})

@inject('torrentClient')
@observer
class VideoShow extends React.Component<any, any> {
    constructor(props:any) {
        super(props);
        this.state = {
            video: {},
            loading: true,
            loadingVisited: true,
            gettingDownloadUrl: true,
        }
        
    }

    getFiles = (files:any) => {
        console.log(files);
        
        
       files.forEach( (file:any) => {
                console.log(file);
                
                file.getBlobURL((err:any, url:any)=>{
                    if (err) throw err;
                    console.log(url);
                    
                    const link:any = this.refs.downloadlink;
                    link.download = file.name;
                    link.href = url;
                    link.textContent = '开始下载 ' + file.name;
                    console.log(link);
                    
                    this.setState({
                        gettingDownloadUrl: false,
                    })
                    
                    
                })
            })
            
    }

    componentDidMount(){
        const { match } = this.props;
        
        RootNode.get("videos").map((video:any)=>(video && video.id===match.params.id)?video: undefined)
        .once((data:any, key:string)=>{
            const { video, loading} = this.state;
            if(loading ===false && video.id){
                return false;
            }
            document.title =  data.title;
            
            let updateCount = data.visited;
            if(!updateCount){
                updateCount=0
            }
            this.setState({
                video: data,
                loading: false,
            })

            
            RootNode.get("videos").get(key).get("visited").put(updateCount+1, (ack:any)=>{
                console.log(ack);
                this.setState({
                    loadingVisited: false,
                });
                console.log(data.magnetURI);
                
               
            });

        })
    }

    handleTagClick = (tag:string) => {
        
        const { history } = this.props;
        history.push('/tags/'+tag);
    }

    render(){
        const { classes } = this.props;
        const { video, loading, loadingVisited, gettingDownloadUrl} = this.state;
        return (
            <React.Fragment>
                
                <div className={classes.player}>
                    <TorrentVideoPlayer getFiles={this.getFiles} torrentId={video.magnetURI} videoer={video.coverUrl} />
                 </div>
                {
                    loading ? 
                    <div>
                        <CircularProgress />
                    </div>
                    :
                    <React.Fragment>
                        <Typography variant="subheading" component="div" >
                            <div style={{
                            textAlign: 'center'
                                }}>
                                {video.title}
                            </div>
                        </Typography>
                         
                         <div>
                             <br />
                         </div>
                         <div style={{
                            textAlign: 'center',
                            width: "100%"
                        }}>
                             <TagSmallList source="videos" 
                             recordId={video.id} onClick={this.handleTagClick}/>
                         </div>
                         <div>
                             <br />
                         </div>
                         <div style={{
                             width: "50%",
                             textAlign:"center"

                         }}>
                         {
                             !gettingDownloadUrl && <a href="" ref="downloadlink">下载视频</a>
                         }
                              
                             
                         </div>
                         <div style={{
                                width: "90%",
                                minWidth: 260,
                                minHeight: 76
                            }} >
                             <Typography variant="subtitle1">磁力地址：</Typography>
                            <textarea style={{
                                width: "100%",
                                minWidth: 260,
                                minHeight: 76
                            }}  defaultValue={video.magnetURI} />
                                
                         </div>
                         <div>
                             <br />
                         </div>
                         <Paper className={classes.description}>
                            <Typography variant="subtitle1">视频介绍:</Typography>
                            <Typography variant="body1" component="div" >
                                {   
                                    video.description ? 
                                    renderHTML(video.description) 
                                    : 
                                    renderHTML("<span></span>")
                                }
                            </Typography>
                            <div>观看量：{loadingVisited? "统计中" : video.visited}</div>
                         </Paper>
                    </React.Fragment>
                }

                 
            </React.Fragment>
            
        )
    }
}

export default withRouter(withStyles(styles)(VideoShow) as any) as any;
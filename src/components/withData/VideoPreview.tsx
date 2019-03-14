import React from 'react';
import { Paper, createStyles, withStyles, CircularProgress, Typography } from '@material-ui/core';
import { observer, inject } from 'mobx-react';
import TorrentVideoPlayer from './TorrentVideoPlayer';
import TagSmallList from '../containers/TagSmallList';
import renderHTML from 'react-render-html';


const styles = createStyles({
    paper: {
        paddingTop: 20,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        alignCentent: 'center',
        justifyContent: 'space-around',
        color: 'black',
    },
    player: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        alignCentent: 'center',
        justifyContent: 'baseline',
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
    }
    
})

@inject('dataProvider')
@observer
class VideoPreview extends React.Component<any, any> {
    constructor(props:any) {
        super(props)
        
    }

    componentWillMount(){
        const { id, source, dataProvider } = this.props;
        const { setAction, doAction, setOperateId } = dataProvider;
        setAction("view");
        setOperateId(id);
        doAction(source);
        console.log(id);
        console.log(source);
        
    }

    handleTagClick = (tag:string) => {
        console.log(tag);
        

    }

    render(){
        const { classes, dataProvider } = this.props;
        const { singleData, oneLoading } = dataProvider;
        return (
            <React.Fragment>
                <div className={classes.player}>
                    <TorrentVideoPlayer torrentId={singleData.magnetURI} poster={singleData.coverUrl} />
                 </div>
                 <Paper className={classes.paper}>
                {
                    oneLoading ? 
                    <div>
                        <CircularProgress />
                    </div>
                    :
                    <React.Fragment>
                        <Typography variant="subheading" component="div" >
                            <div style={{
                            textAlign: 'center'
                                }}>
                                {singleData.title}
                            </div>
                        </Typography>
                         
                         <div>
                             <br />
                         </div>
                         <div style={{
                            textAlign: 'center'
                        }}>
                             <TagSmallList source="videos" 
                             recordId={singleData.id} onClick={this.handleTagClick}/>
                         </div>
                         <div>
                             <br />
                         </div>
                         <div>
                             <Typography variant="subtitle1">磁力地址：</Typography>
                            <textarea style={{
                                width: "90%",
                                minWidth: 260,
                                minHeight: 76
                            }} defaultValue={singleData.magnetURI} />
                                
                         </div>
                         <div>
                             <br />
                         </div>
                         <Paper className={classes.description}>
                            <Typography variant="subtitle1">视频介绍:</Typography>
                            <Typography variant="body1" component="div" >
                                {   
                                    singleData.description ? 
                                    renderHTML(singleData.description) 
                                    : 
                                    renderHTML("<span></span>")
                                }
                            </Typography>
                         </Paper>
                    </React.Fragment>
                }

                 </Paper>
            </React.Fragment>
            
        )
    }
}

export default withStyles(styles)(VideoPreview);
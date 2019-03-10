import React from 'react';
import { TextField, Paper, Button, withStyles, createStyles, CircularProgress } from '@material-ui/core';
import ImageUploader from './ImageUploader';
import VideoUploader from './VideoUploader';
import { observer, inject } from 'mobx-react';
import TextEditor from './TextEditor';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { VideoNode, RootNode } from '../../gunDB';
import { withRouter } from 'react-router';
import {Image, CloudinaryContext, Transformation} from 'cloudinary-react';
import TorrentVideoPlayer from './TorrentVideoPlayer';





const styles = createStyles({
    paper: {
        paddingTop: 20,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 100,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 800,
        alignItems: 'center',
        alignCentent: 'center',
        justifyContent: 'space-around',
    },
    form: {
        display: "flex",
        flexDirection: 'column',
        minHeight: 500,
        alignItems: 'center',
        alignCentent: 'center',
        justifyContent: 'space-around',
        width: "80%"
    }
})


@inject('message')
@inject('torrentClient')
@observer
class VideoForm extends React.Component<any, any> {


    constructor(props: any){
        super(props);
        this.state = {
            editorState: "",
            videoUploading: false,
            magnetURI: "",
            imageUploading: false,
            coverUrl: "http://res.cloudinary.com/ddycd5xyn/image/upload/a_0,c_fill,w_300/default.jpg",
            publicId: "",
            cloudName: "",
        }

    }
    componentWillMount(){
        RootNode.get('status').put("online");
    }

    componentWillUnmount(){
        // client.remove(this.state.magnetURI);
        RootNode.get('status').bye().put("offline");
    }

    componentWillReact(){
        
    }

    
    handleVideoUploaderChange = (params:any) => {
        console.log(params);
        
       this.setState({
           magnetURI: params.magnetURI,
           videoUploading: params.loading,
       })
        
    }

    handleImageUploaderChange = (params:any) => {
        
        this.setState({
            coverUrl: params.coverUrl,
            imageUploading: params.loading,
            publicId: params.publicId,
            cloudName: params.cloudName,
        })
    }
   
    render(){
        const { classes, torrentClient } = this.props;
        const { magnetURI, videoUploading, imageUploading, coverUrl, cloudName, publicId } = this.state;
        

        const locked = videoUploading || imageUploading;
        console.log(magnetURI);
        
        
        return (
            <Paper className={classes.paper}>
                <form className={classes.form}>
                   
                    <TextField disabled={locked} style={{
                        minWidth: 310,
                        width: "50%",
                        marginBottom:70,
                    }} label="视频标题"  placeholder="标题"  />

                    <ImageUploader disabled={locked} onChange={this.handleImageUploaderChange} />
                    {
                        imageUploading ? <CircularProgress  color="secondary" /> :
                        <div>
                            <img src={coverUrl} alt=""/>
                        </div>
                    }
                    <VideoUploader disabled={locked} onChange={this.handleVideoUploaderChange}  />
                   
                        <div>
                            <TorrentVideoPlayer torrentId={magnetURI} poster={coverUrl} />
                        </div>
                    
                    {
                        !locked &&
                        <div>
                            <h2 style={{
                                textAlign: 'center',
                            }}>视频介绍或描述</h2>
                            {/* <TextEditor getRawHtml={this.getRawHtml} /> */}
                        
                        </div>

                    }
                    
                    <br/>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: "80%",
                        marginBottom: 100,
                        marginTop: 100
                    }}>
                        <Button disabled={locked }  variant="contained" color="secondary">保存草稿</Button>
                        <Button disabled={locked } variant="contained"  color="secondary">直接发布</Button>
                    </div>
                </form>

            </Paper>
        )
    }
}


export default withRouter(withStyles(styles)(VideoForm) as any);
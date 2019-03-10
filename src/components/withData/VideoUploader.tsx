import React from 'react';
import { Typography, CircularProgress, Divider } from '@material-ui/core';
import 'react-html5video/dist/styles.css';
import { observer, inject } from 'mobx-react';
import VideoPlayer from './VideoPlayer';

@inject('message')
@inject('torrentClient')
@observer
class VideoUploader extends React.Component<any, any>{

    constructor(props: any){
        super(props);
        this.state = {
            seeding: false,
            marginURI: '',
            blobURI: "",
            torrentFileBlobURL: "",
            torrentName: '',
        }
    }
    

    uploadFile = (file:any) => {
        const { message, torrentClient } = this.props;
        const { seedFile } = torrentClient;
        return seedFile(file, (m:any, torrent:any)=>{
            message.show(m);
            this.props.onChange({
                magnetURI: torrent.magnetURI,
                loading: false,
            })
            
        })
    }

    hanleFileInputClick = (e:any) => {
        this.setState({
            seeding: false,
            marginURI: '',
        })
    }

    handleFileChange = (e:any) => {
        const { message } = this.props;
        this.setState({
            seeding: false,
            marginURI: '',
        })
        this.props.onChange({
            loading: true,
        })
        const extensionValid = /[.](webm|mp4)$/;
        const alertText = '格式不正确,支持webm|mp4'
        const files = e.target.files;
        if(files.length === 0){
            this.setState({
                seeding: false,
                marginURI: '',
            })
        }
        for (let index = 0; index < files.length; index++) {
            const file = files[index];
            if(!extensionValid.test(file.name)){
                return message.show(alertText);
                
            }else{
                this.setState({
                    seeding: true,
                    marginURI: '',
                })
                this.uploadFile(file);
            }
        }
        
        
    }

    render(){
        const { torrentClient, disabled } = this.props;
        const { seeding } = torrentClient;
        
        return(
            <div style={{
                display: 'flex',
                flexDirection: 'column',
            }}>
               
                <Typography variant="headline" >{seeding? '正在上传视频，开始做种' : "上传视频"}</Typography> <br/>
                    <input disabled={seeding || disabled} onClick={this.hanleFileInputClick} type="file"  onChange={this.handleFileChange} multiple={false} accept="video/*"  capture='camcorder' />
                <Divider />
            
            </div>
               
        )
    }
}

export default VideoUploader;
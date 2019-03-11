import React from 'react';
import { Typography, CircularProgress, Divider, Paper, Grid } from '@material-ui/core';
import 'react-html5video/dist/styles.css';
import { observer, inject } from 'mobx-react';

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
            // const ti = setInterval(()=>{
            //     console.log("ratio", torrent.ratio);
            //     console.log("progress", torrent.progress);
            //     console.log("uploaded", torrent.uploadSpeed);
                
            // }, 1000);
            this.setState({
                marginURI:  torrent.magnetURI
            })
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
        const { disabled } = this.props;
        const { seeding, marginURI } = this.state;;
        console.log(marginURI);
        
        return(
            <Paper style={{
                display: 'flex',
                flexDirection: 'column',
                padding: 10,
                width: "100%"
            }}>
                <Divider />
                <Grid container spacing={8} alignItems="baseline"
                    direction="column"
                    justify="flex-start">
                    <Grid item>
                        <Typography variant="headline" >{seeding? '正在上传视频，开始做种' : "上传视频"}</Typography> <br/>
                        <input disabled={seeding || disabled} onClick={this.hanleFileInputClick} type="file"  onChange={this.handleFileChange} multiple={false} accept="video/*"  capture='camcorder' />
                     </Grid>
                   
                     <Grid item style={{
                         wordBreak:"break-all",
                     }}>
                            磁力链接(请复制做种):&nbsp;<br/>{marginURI}
                     </Grid>
                </Grid>
            
            </Paper>
               
        )
    }
}

export default VideoUploader;
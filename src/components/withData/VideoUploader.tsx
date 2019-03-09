import React from 'react';
import { Typography, CircularProgress, Divider } from '@material-ui/core';

import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';
import { observer, inject } from 'mobx-react';
import  WebTorrent from 'webtorrent';
const  client = new WebTorrent();

@inject('message')
@inject('video')
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
        const { message, video } = this.props;
        return client.seed(file, (torrent:any)=>{
            
                torrent.files.forEach((file: any)=>{
                    
                    file.getBlobURL( (err:any, url:any) => {
                        // console.log(err);
                        // console.log(url);
                        this.setState({
                            seeding: false,
                            marginURI: torrent.magnetURI,
                            blobURI: url,
                            torrentFileBlobURL: torrent.torrentFileBlobURL,
                            torrentName: torrent.name
                        });
                        video.setFileMagnetURI(torrent.magnetURI);
                        video.setTorrentDownloadURI(torrent.torrentFileBlobURL);
                        video.setUploading(false);
                        
                        message.show('视频上传成功')
                        
                    })
                    
                })
        });
    }

    hanleFileInputClick = (e:any) => {
        this.setState({
            seeding: false,
            marginURI: '',
        })
    }

    handleFileChange = (e:any) => {
        const { message, video } = this.props;
        video.setUploading(true);
        this.setState({
            seeding: false,
            marginURI: '',
        })
        const extensionValid = /[.](webm|mp4)$/;
        const alertText = '格式不正确,支持webm|mp4'
        const files = e.target.files;
        if(files.length === 0){
            video.setUploading(false);
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
        const { seeding, marginURI, blobURI, torrentFileBlobURL, torrentName } = this.state;
        const { video } = this.props;
        const { fileMagnetURI, locked, coverUrl } = video;
        
        return(
            <div style={{
                display: 'flex',
                flexDirection: 'column',
            }}>
               
                    <Typography variant="headline" >{seeding? '正在上传视频，开始做种' : "上传视频"}</Typography> <br/>
                    <input disabled={locked} onClick={this.hanleFileInputClick} type="file"  onChange={this.handleFileChange} multiple={false} accept="video/*"  capture='camcorder' />
                    <Divider />
                <br/>
                {
                    marginURI!=="" &&
                    <div style={{
                        width: '100%',
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyItems: "baseline",
                        alignContent: "space-around",
                        height: "auto",
                        justifyContent: "space-around",
                        wordBreak: "break-all"
                    }}>
                    <Typography>磁力链接(务必在本地webtorrent桌面客户端下载好，确保留存): </Typography>
                    <Typography variant="caption">
                        {fileMagnetURI}
                    </Typography>
                    <Typography>下载种子文件地址:
                         <a href={torrentFileBlobURL} target="_blank" download={torrentName+'.torrent'}>{torrentFileBlobURL}</a>
                         </Typography>
                     </div>
                }
                
                <br/>

                <div id="videoDisplay" style={{
                        width: "100%",
                        textAlign: 'center'
                        }}>
                        {
                            marginURI==="" ? 
                            seeding? <CircularProgress color="secondary" /> : <br/>
                            :
                            <Video 
                                controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
                                poster={coverUrl}
                                onCanPlayThrough={() => {
                                    // Do stuff
                                }}>
                                <source src={blobURI} type="video/mp4" />
                                <track label="中文字幕" kind="subtitles" srcLang="en" src="" default />
                            </Video>
                        }
                            

                        </div>
                    </div>
               
        )
    }
}

export default VideoUploader;
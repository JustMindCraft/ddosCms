import React from 'react';
import { observer, inject } from 'mobx-react';
import  WebTorrent from 'webtorrent';
import { LinearProgress, Typography, withWidth } from '@material-ui/core';
import { isWidthUp } from '@material-ui/core/withWidth';
import { withRouter } from 'react-router';

(window as any).WebTorrent = WebTorrent;

@inject('torrentClient')
@observer
class TorrentVideoPlayer extends React.Component<any, any>{
    file:any = null;
    constructor(props:any){
        super(props);
        this.state = {
           loading: true,
           files: [],
        }
    }


    change = (torrentId:string, poster:string) => {
        if(!torrentId){
            return this.setState({
                loading:false,
                files: []
            });
        }
        this.setState({
            loading:true,
            files: [],
        });
        const { torrentClient } = this.props;
            torrentClient.addTorrent(torrentId, (torrent:any)=>{
                if(torrent === "setTorrentId first"){
                    this.setState({
                        loading:true,
                        files: [],
                    });

                    return false;
                }
                if(!torrent){

                    return false;
                }
                if(!torrent.files || torrent.files.length === 0  )
                {

                    return false;
                    
                }
                this.setState({
                    loading: false,
                })
                const files = torrent.files;
                if(this.props.getFiles){
                    this.props.getFiles(files);
                }
                
                const file = files.find((file:any)=>{
                    return file.name.endsWith('.mp4')
                });

                if(!file){
                    return false;
                }
                if(this.file === null){
                    this.file = file;
                   
                    return file.renderTo(this.refs.dplayer,{
                        autoplay: true,
                        controls: true,
                    }, (err:any, video:any)=>{
                        if(!video){
                            return false;
                        }
                        video.style.width = "100%"
                        video.controls = true,
                        video.autoplay = true,
                        console.log(video);
                        
                        
                        this.setState({
                            loading:false,
                            files: [],
                        });
                    });

                }
                
                
                
            });
        
       
        
    }

    componentWillMount(){
        const { history } = this.props;
    }
    componentDidMount(){
        const { torrentId, poster} = this.props;
        this.change(torrentId, poster);
    }

   

    componentWillUnmount(){
       
        this.setState({
            loading:false,
            files: []
        });
        // const { torrentClient } = this.props;
        // torrentClient.destroy();
          
    }
   
    componentWillReceiveProps(nextProps: any){
        
        if(nextProps.torrentId){
           
            this.change(nextProps.torrentId, nextProps.poster);
            
        }
    }

    
    
    render(){

        const isPc = isWidthUp("sm",  this.props.width);
        
        return (
            <React.Fragment>
                <div  style={{
                    minHeight: 400,
                    display: !this.state.loading? "none" : "block",
                    textAlign: 'center',
                }}>
                    <br/>
                    <br/>
                    <LinearProgress />
                    <Typography variant="display1">视频载入中</Typography>
                    <LinearProgress />
                    <br/>
                </div>
                <div  style={{
                   display: this.state.loading? "none" : "flex", width: isPc? "65%" : "100%",
                    flexDirection: 'column',
                    alignItems: 'center',
                    alignCentent: 'center',
                    justifyContent: 'baseline',
                }}>
                    <video src=""  ref="dplayer"></video>
                
                </div>
            </React.Fragment>
            
        )
    }
}


export default withRouter(withWidth()(TorrentVideoPlayer) as any) as any;
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
        const { torrentClient, history } = this.props;
        let timer = setInterval(()=>{
            torrentClient.addTorrent(torrentId, (torrent:any)=>{
                if(torrent === "setTorrentId first"){
                    this.setState({
                        loading:true,
                        files: [],
                    });
                    clearInterval(timer);

                    return false;
                }
                console.log("files",torrent.files);
                if(!torrent){
                    clearInterval(timer);

                    return false;
                }
                if(!torrent.files || torrent.files.length === 0  )
                {
                    clearInterval(timer);

                    return false;
                    
                }

                if(document.readyState === "complete"){
                    clearInterval(timer);
                    this.setState({
                        files: torrent.files,
                        loading: false,
                    })
                   
                        
                        
                }
            });
        }, 200);
        
       
        
    }

    componentWillMount(){
        const { history } = this.props;
    }
    componentDidMount(){
        const { torrentId, poster} = this.props;
        this.change(torrentId, poster);
    }

    componentDidUpdate(){
        const { files } = this.state;
        return files.length!==0 && files.forEach((file:any)=>{

            if(!file){
                this.setState({
                    loading:false,
                    files: []
                });
            }
                
            file.renderTo(this.refs.dplayer,{
                autoplay: true,
                controls: true,
            }, (err:any, video:any)=>{
                console.log(video);
                video.style.width = "100%"
                video.controls = true,
                video.autoplay = true,
                console.log(err);
                this.setState({
                    loading:false,
                    files: [],
                });
            });
        });
    }

    componentWillUnmount(){
        clearInterval();
        const { history} = this.props;
        this.setState({
            loading:false,
            files: []
        });
        history.block((location:any, action:any) => {
            console.log(location, action);
                
        });
          
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
                <div style={{
                   display: this.state.loading? "none" : "flex", width: isPc? "65%" : "100%",
                    flexDirection: 'column',
                    alignItems: 'center',
                    alignCentent: 'center',
                    justifyContent: 'baseline',
                }}>
                    <video src="" style={{width: "100%"}}  ref="dplayer"></video>
                
                </div>
            </React.Fragment>
            
        )
    }
}


export default withRouter(withWidth()(TorrentVideoPlayer) as any) as any;
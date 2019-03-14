import React from 'react';
import { observer, inject } from 'mobx-react';
import  WebTorrent from 'webtorrent';
import { LinearProgress, Typography, withWidth } from '@material-ui/core';
import { isWidthUp } from '@material-ui/core/withWidth';

(window as any).WebTorrent = WebTorrent;

@inject('torrentClient')
@observer
class TorrentVideoPlayer extends React.Component<any, any>{
    constructor(props:any){
        super(props);
        this.state = {
           loading: true,
        }
    }

    change = (torrentId:string, poster:string) => {
        this.setState({
            loading:true,
        });
        const isPc = isWidthUp("sm",  this.props.width);
        const { torrentClient } = this.props;
        torrentClient.addTorrent(torrentId, (torrent:any)=>{
            const file = torrent.files.find((file:any)=>{
                return file.name.endsWith('.mp4')
            })
            file.renderTo(this.refs.dplayer,{
                autoplay: true,
                controls: true,
            }, (err:any, video:any)=>{
                console.log(video);
                video.style.width = "100%"
                video.controls = true,
                video.autoplay = true,
                console.log(err);
                
                
            });
            this.setState({
                loading:false,
            })
        })
       
        
    }
    componentDidMount(){
        const { torrentId, poster} = this.props;
        this.change(torrentId, poster);
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
                    <video src=""  ref="dplayer"></video>
                
                </div>
            </React.Fragment>
            
        )
    }
}


export default withWidth()(TorrentVideoPlayer);
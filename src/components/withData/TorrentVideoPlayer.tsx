import React from 'react';
import { observer, inject } from 'mobx-react';

import 'dplayer/dist/DPlayer.min.css';
import DPlayer from 'dplayer';
import  WebTorrent from 'webtorrent';
import { LinearProgress, Typography, withWidth } from '@material-ui/core';
import { isWidthDown, isWidthUp } from '@material-ui/core/withWidth';

(window as any).WebTorrent = WebTorrent;


class TorrentVideoPlayer extends React.Component<any, any>{
    constructor(props:any){
        super(props);
        this.state = {
           loading: true,
        }
    }

    change = (torrentId:string, poster:string) => {
        console.log(torrentId);
        if(torrentId==="" || !torrentId){
            return false;
        }
        
        (this.refs.dplayer as any).innerHTML = "";
        if(!torrentId && torrentId==="")
        {
            
            return false;
        }
        try {
            const dp = new DPlayer({
                container: this.refs.dplayer as any,
                hotkey: true,
                autoplay: true,
                video: {
                    url: torrentId,
                    type: 'webtorrent',
                    pic: poster,
                }
            });
            
            dp.on("loadeddata" as any, ()=>{
                console.log("loadeddata");
                dp.seek(0.01);
                this.setState({
                    loading:false,
                })
                
            })
        } catch (error) {
            console.log(error);
            
        }
        
       
        
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
                <div ref="dplayer"  style={{
                   display: this.state.loading? "none" : "flex", width: isPc? "65%" : "100%",
                    flexDirection: 'column',
                    alignItems: 'center',
                    alignCentent: 'center',
                    justifyContent: 'baseline',
                }}>
                
                </div>
            </React.Fragment>
            
        )
    }
}


export default withWidth()(TorrentVideoPlayer);
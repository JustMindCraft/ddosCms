import React from 'react';
import { observer, inject } from 'mobx-react';

import 'dplayer/dist/DPlayer.min.css';
import DPlayer from 'dplayer';
import  WebTorrent from 'webtorrent';
import { LinearProgress } from '@material-ui/core';

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


        
        return (
            <React.Fragment>
                <div  style={{
                    minHeight: 400,
                    display: !this.state.loading? "none" : "block",
                    textAlign: 'center',
                }}>
                    <LinearProgress />
                    <br/>
                    <LinearProgress />
                    <h1>播放器加载中</h1>
                </div>
                <div ref="dplayer"  style={{
                    minHeight: 400,
                    width: "90%",
                    display: this.state.loading? "none" : "block",
                }}>
                
                </div>
            </React.Fragment>
            
        )
    }
}


export default TorrentVideoPlayer;
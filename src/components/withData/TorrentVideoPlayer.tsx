import React from 'react';
import VideoPlayer from './VideoPlayer';
import { observer, inject } from 'mobx-react';

@inject('torrentClient')
@observer
class TorrentVideoPlayer extends React.Component<any, any>{

    constructor(props:any){
        super(props);
        this.state = {
            err: "",
            source: ""
        }
    }
    componentWillMount(){
        const { torrentId } = this.props;
       this.change(torrentId);
    }

    change = (torrentId:string) => {
        const { torrentClient } = this.props;
        torrentClient.addTorrent(torrentId, (torrent: any)=>{
            
            torrent.files.forEach((file:any)=>{
                console.log(file);
                
                file.getBlobURL((err:any, url:any)=>{
                    console.log(err);
                    console.log(url);
                    
                    
                    if(err){
                        return this.setState({
                            err: err.message,
                        })
                    }
                    return this.setState({
                        source: url,
                    })
                    
                })
    
            })
        });
    }

    componentWillReceiveProps(nextProps: any){
        
        if(this.props.torrentId !== nextProps.torrentId){
            this.change(nextProps.torrentId);
            
        }
    }
    
    render(){
        const { poster } = this.props;
        const { source } = this.state;

        
        
        return (
            <div>
                <VideoPlayer source={source} muted={false} poster={poster} />
            </div>
        )
    }
}


export default TorrentVideoPlayer;
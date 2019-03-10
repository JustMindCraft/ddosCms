import React from 'react';
import Clappr from 'clappr';


class VideoPlayer extends React.Component<any, any>{

    player:any;
    
    constructor(props:any){
        super(props);
        this.player = null
    }
    
    componentDidMount(){
        this.change(this.props.source);
    }

    destroyPlayer() {
        if (this.player) {
          this.player.destroy();
        }
        this.player = null;
    }
    change(source:Array<string>) {
        if (this.player) {
          this.destroyPlayer();
        }
        this.player = new Clappr.Player({
          parent: this.refs.player,
          source: source,
          width: '100%',
          height: '100%',
          hlsjsConfig: {
            enableWorker: true
          }
        });
    }

    render(){
        return (
            <div>
                <div ref="player">
                </div>
            </div>
        )
    }
}

export default VideoPlayer;


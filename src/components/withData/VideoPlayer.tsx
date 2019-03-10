import React from 'react';
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';
import videoConnect from 'react-html5video';


class VideoPlayer extends React.Component<any, any>{

  componentDidMount(){
    
  }

    componentWillReceiveProps(nextProps:any){
      
      if(nextProps.source!== this.props.source ){
        const { videoEl, source, onSourceChange }  = nextProps;
        if(onSourceChange){
          onSourceChange(source);
        }
        videoEl.load();
      }
      
    }

    render(){
      const {source, poster, muted, autoPlay } = this.props;
      return (
        <Video autoPlay={autoPlay} loop muted={muted}
                  controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
                  poster={poster==="" || !poster? 
                  "http://res.cloudinary.com/ddycd5xyn/image/upload/a_0,c_fill,w_300/default.jpg"
                  : 
                  poster
                 }
                  onCanPlayThrough={() => {
                      // Do stuff
                  }}>
                  <source src={source} type="video/mp4" />
                  <track label="zh-cn" kind="subtitles" srcLang="en" src="" default />
          </Video>
      )

      
      
        
    }
}

export default videoConnect(VideoPlayer);


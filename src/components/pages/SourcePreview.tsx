import React from 'react';
import { withRouter } from 'react-router';
import VideoPreview from '../withData/VideoPreview';


const SourcePreview = (props:any) => {
    const { match } = props;
    const { source, id } = match.params;

    switch(source){
        case "videos":
            return <VideoPreview source={source} id={id} />
        case "posts":
            return <div>加载文章</div>
        default: 
            return <div>没找到资源</div>
    }
}

export default withRouter(SourcePreview);
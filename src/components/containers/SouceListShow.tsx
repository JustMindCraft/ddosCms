import React from 'react';
import VideoListShow from './VideoListShow';

const SourceListShow = (props:any) => {
    const { source, list, onView, onDelete, onEdit } = props;
    switch (source) {
        case "videos":
            
           return (
               <VideoListShow list={list} onView={onView} onDelete={onDelete} onEdit={onEdit} />
           )
        default:
            return (
                <div>
                    未找到资源
                </div>
            )
    }
}

export default SourceListShow;
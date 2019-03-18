import React from 'react';
import VideoListShow from './VideoListShow';
import PostListShow from './PostListShow';

const SourceListShow = (props:any) => {
    const { source, list, onView, onDelete, onEdit, getTagList, onRecommend, onPublish } = props;
    switch (source) {
        case "videos":
            
           return (
                <VideoListShow onPublish={onPublish} onRecommend={onRecommend}  list={list} onView={onView} onDelete={onDelete} onEdit={onEdit} getTagList={getTagList} />
           )
        case "posts":
            return (
                <PostListShow onPublish={onPublish} onRecommend={onRecommend} list={list} onView={onView} onDelete={onDelete} onEdit={onEdit} getTagList={getTagList} />
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
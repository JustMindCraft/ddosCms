import React from 'react';
import Paper from '@material-ui/core/Paper';
import VideoIndex from '../containers/VideoIndex';
import ListSubheader from '@material-ui/core/ListSubheader';;

import TitleLayout from '../containers/TitleLayout';
import PostsIndex from '../containers/PostsIndex';


const NewHome = () => {
    return (
        <div>
            <TitleLayout title={"文章"} />
            <PostsIndex />
        </div>
    )
}

export default NewHome
import React from 'react';
import VideoForm from '../withData/VideoForm';
import { Typography, createStyles, withStyles, Fab } from '@material-ui/core';
import { withRouter, Link } from 'react-router-dom';
import PostForm from '../withData/PostForm';
import post from '../../store/models/Post';

const VideoListLink = (props:any)=> <Link to='/admin/videos' {...props} />;
const PostListLink = (props:any)=> <Link to='/admin/posts' {...props} />;
const TagListLink = (props:any)=> <Link to='/admin/tags' {...props} />;

const styles = createStyles({
    button: {
        position: 'fixed',
        zIndex: 100,
    }
})


class EditSource extends React.Component<any, any>{
        //根据不同的路由名称，加载不同的source，加载不同的新建source的表单

    constructor(props:any){
        super(props);
        this.state = {
            sourceName: ""
        }
    }

    componentDidMount(){
        const { match  } = this.props;
        if(match.params.source === "videos"){
            this.setState({
                sourceName: "视频"
            })
        }
        if(match.params.source === "posts"){
            this.setState({
                sourceName: "文章"
            })
        }
        
    }
    

    render(){
        const { classes, match } = this.props;
        const { sourceName } = this.state;
        const source = match.params.source;
        const sourceForm = (source:string) => {
            if(source==="videos"){
                return  <VideoForm />
            }
            if(source==="posts"){
                return <PostForm />
            }
        }

        const SourceListLink = (source:string) => {
            if(source==="videos"){
                return  VideoListLink
            }
            if(source==="posts"){
                return PostListLink
            }
        }
        
        

        return (
            <React.Fragment>
                <br/>
                <Typography style={{
                    textAlign: 'center',
                }} variant="display1" component="h1">
                    编辑{sourceName}
                </Typography>
                <Fab className={classes.button} 
                component={SourceListLink(source)}
                variant="extended" 
                color="primary">--返回{sourceName}列表---></Fab>
               {sourceForm(source)}
            </React.Fragment>
        )
    }

}

export default withRouter(withStyles(styles)(EditSource as any) as any) as any;
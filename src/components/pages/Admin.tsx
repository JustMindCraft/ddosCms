import React from 'react';
import { Typography, Button, createStyles, withStyles, Fab } from '@material-ui/core';
import { Link } from 'react-router-dom';
const VideosLink = (props:any) => <Link to='/admin/videos' {...props} />
const PostsLink = (props:any) => <Link to='/admin/posts' {...props} />
const TagsLink = (props:any) => <Link to='/admin/tags' {...props} />

const styles = createStyles({
    button: {
        position: 'fixed',
        zIndex: 100,
    }
})

class Admin extends React.Component<any, any>{

    componentDidMount(){

    }

    render(){
        const { classes } = this.props;
        document.title = "管理中心"
        return (
            <React.Fragment>
                <br/>
                <Typography style={{
                    textAlign: 'center', width: "100%"
                }} variant="display1" component="h1">
                    管理
                </Typography>
                <Button component={VideosLink}>视频管理</Button>
               <Button  component={PostsLink}>文章管理</Button>
               <Button  component={TagsLink}>标签管理</Button>
              
            </React.Fragment>
        )
    }

}

export default withStyles(styles)(Admin);
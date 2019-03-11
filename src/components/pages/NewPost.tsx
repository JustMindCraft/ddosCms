import React from 'react';
import PostForm from '../withData/PostForm';
import { Provider } from 'mobx-react';
import post from '../../store/models/Post';
import { Typography, Button, createStyles, withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
const BackListLink = (props:any) => <Link to='/posts' {...props} />

const styles = createStyles({
    button: {
        position: 'fixed',
        zIndex: 100,
    }
})

class NewPost extends React.Component<any, any>{

    componentDidMount(){

    }

    render(){
        const { classes} = this.props;
        return (
            <React.Fragment>
                <br/>
                <Typography style={{
                    textAlign: 'center',
                }} variant="display1" component="h1">
                    新建文章
                </Typography>
                <Button className={classes.button} component={BackListLink} variant="outlined" color="primary">--返回视频列表---></Button>
                <Provider post={post}>
                    <PostForm />
                </Provider>
            </React.Fragment>
        )
    }

}

export default withStyles(styles)(NewPost);
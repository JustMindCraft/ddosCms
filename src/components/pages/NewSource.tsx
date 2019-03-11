import React from 'react';
import VideoForm from '../withData/VideoForm';
import { Provider } from 'mobx-react';
import video from '../../store/models/Video';
import { Typography, Button, createStyles, withStyles, Fab } from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom';
const BackListLink = (props:any) => <Link to='/videos' {...props} />

const styles = createStyles({
    button: {
        position: 'fixed',
        zIndex: 100,
    }
})

class NewSource extends React.Component<any, any>{
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
        
    }
    

    render(){
        const { classes, match } = this.props;
        const { sourceName } = this.state;
        const source = match.params.source;
        const sourceForm = (source:string) => {
            if(source==="videos"){
                return  <VideoForm />
            }
        }
        return (
            <React.Fragment>
                <br/>
                <Typography style={{
                    textAlign: 'center',
                }} variant="display1" component="h1">
                    新建{sourceName}
                </Typography>
                <Fab className={classes.button} 
                component={BackListLink} 
                variant="extended" 
                color="primary">--返回{sourceName}列表---></Fab>
               {sourceForm(source)}
            </React.Fragment>
        )
    }

}

export default withRouter(withStyles(styles)(NewSource as any) as any) as any;
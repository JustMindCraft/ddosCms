import React from 'react';
import { Paper, createStyles, withStyles, CircularProgress, Typography, Fab } from '@material-ui/core';
import { observer, inject } from 'mobx-react';
import TagSmallList from '../containers/TagSmallList';
import renderHTML from 'react-render-html';
import { Link } from 'react-router-dom';

const VideoListLink = (props:any)=> <Link to='/admin/posts' {...props} />;

const styles = createStyles({
    paper: {
        paddingTop: 20,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        alignCentent: 'center',
        justifyContent: 'space-around',
        color: 'black',
    },
    
    body:{
        paddingTop: 20,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        alignCentent: 'baseline',
        justifyContent: 'space-around',
    }
    
})

@inject('dataProvider')
@observer
class PostPreview extends React.Component<any, any> {
    constructor(props:any) {
        super(props)
        
    }

    componentWillMount(){
        const { id, source, dataProvider } = this.props;
        const { setAction, doAction, setOperateId, singleData} = dataProvider;
       
        setAction("view");
        setOperateId(id);
        doAction(source);
        
    }

    handleTagClick = (tag:string) => {
        

    }

    render(){
        const { classes, dataProvider } = this.props;
        const { singleData, oneLoading } = dataProvider;
        document.title = "预览 | " + singleData.title;
        return (
            <React.Fragment>
                <Fab className={classes.button} 
                    variant="extended" 
                    color="primary"
                    component={VideoListLink}
                    >
                    --返回列表--->
                </Fab>
              
                 <Paper className={classes.paper}>
                {
                    oneLoading ? 
                    <div>
                        <CircularProgress />
                    </div>
                    :
                    <React.Fragment>
                        <Typography variant="title" component="div" >
                            <div style={{
                            textAlign: 'center'
                                }}>
                                {singleData.title}.....(预览)
                            </div>
                        </Typography>
                         
                         <div>
                             <br />
                         </div>
                         <div style={{
                            textAlign: 'center'
                        }}>
                             <TagSmallList source="posts" 
                             recordId={singleData.id} onClick={this.handleTagClick}/>
                         </div>
                         <div>
                             <br />
                         </div>
                        
                         <div>
                             <br />
                         </div>
                         <Paper className={classes.body}>
                            <Typography variant="body1" component="div" >
                                {   
                                    singleData.body ? 
                                    renderHTML(singleData.body) 
                                    : 
                                    renderHTML("<span></span>")
                                }
                            </Typography>
                         </Paper>
                    </React.Fragment>
                }

                 </Paper>
                 
            </React.Fragment>
            
        )
    }
}

export default withStyles(styles)(PostPreview);
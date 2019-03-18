import React from 'react';
import { Paper, createStyles, withStyles, CircularProgress, Typography } from '@material-ui/core';
import { observer, inject } from 'mobx-react';
import TagSmallList from '../containers/TagSmallList';
import renderHTML from 'react-render-html';
import { Link, withRouter } from 'react-router-dom';


const styles = createStyles({
    paper: {
        paddingTop: 20,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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
        maxWidth: 800
    }
    
})

@inject('dataProvider')
@observer
class PostShow extends React.Component<any, any> {
    constructor(props:any) {
        super(props)
        
    }

    componentWillMount(){
        const { match,  dataProvider } = this.props;
        const { setAction, doAction, setOperateId } = dataProvider;

        document.body.scrollTop = document.documentElement.scrollTop = 0;       
        setAction("view");
        setOperateId(match.params.id);
        doAction("posts");
        
    }

    handleTagClick = (tag:string) => {
        

    }

    render(){
        const { classes, dataProvider } = this.props;
        const { singleData, oneLoading } = dataProvider;
        const { coverUrl, title } = singleData;
        document.title =  title;
        return (
            <React.Fragment>
                
             
              <Paper className={classes.paper}>
                {
                    oneLoading ? 
                    <div>
                        <CircularProgress />
                    </div>
                    :
                    <React.Fragment>
                        <div style={{
                            background: `url(${coverUrl}) no-repeat`,
                            backgroundSize: 'contain',
                            width: "80%",
                            padding: 30,
                            backgroundPosition: "center",

                        }}>
                        <Typography variant="title" component="div" >
                            <div style={{
                            textAlign: 'center',
                            background: "rgba(20, 20, 20, 0.63)",
                            padding: 20,
                            color: "white"
                                }}>
                                {singleData.title}
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

export default  withRouter(withStyles(styles)(PostShow) as any) as any;
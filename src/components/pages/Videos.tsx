import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import { VideoNode, now, RootNode } from '../../gunDB';
import { Paper, Typography, Divider } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import ConfirmDialog from '../public/ConfirmDialog';

const styles = (theme:any) => createStyles({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  fab: {
    margin: theme.spacing.unit,
    left: "44%",
    bottom:14,
    position: 'relative'
  },
});

interface IVideosProps{
    classes: any
}

const NewVideoButtonLink = (props:any) => <Link to='/videos/new' {...props} />

class Videos extends React.Component<IVideosProps> {
  state = {
    checked: [0],
    condition: '',
    videos: [],
    dayAgo: now()-1000*60*60*24,
    operateId: "",
    oneLoading: false,
    listLoading: false,
    confirmDialogOpen: false,
    confirmDialogBack: false,
    action: 'list',
    confirmDialogTitle: ""
  };

  componentDidUpdate(){
    // this.updateDate()
  }

  componentDidMount(){
    this.updateData();
  }

  doAction(){
    const { action, operateId } = this.state;
    switch (action) {
      case 'list':
        return this.updateData();

      case "delete":
        return this.handleDelete(operateId);
    
      default:
        return this.updateData();
    }
  }

  updateData = () => {
    const { condition, videos, dayAgo, confirmDialogOpen } = this.state;
    const conditionRegExp = new RegExp("/"+condition+"/");

    VideoNode.map((video:any)=> {
      console.log(video);
      
      if(!video || video === null){
        return undefined;
      }
      const timeCondition = video.createdAt >= dayAgo && video.createdAt <= now();
      
      if(video.title.search(conditionRegExp) && timeCondition){
        return video;
      }
      if(video.description.search(conditionRegExp) && timeCondition){
        return video;
      }
      
      return undefined;
    }).on((data:any, key:string)=>{
      console.log(data, key);
      if(data===null){
        return false;
      }
      videos.unshift(data as never);
      this.setState({
        videos
      })
    })
  }

  handleToggle = (value:any) => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  handleViewDetail = (id:string) => {
    RootNode.get("videos/"+id).once((data:any, key:string)=>{
      // VideoNode.map((video:any)=>video.id === id? video: undefined)
      
    });
  }

  handleDelete = (id:string) => {
    
    
    VideoNode.map((video:any)=>video? (video.id === id? video: undefined) : undefined )
    .once((data:any, key:string)=>{
      VideoNode.get(key)
      .put(null, (ack:any)=>{
        if(!ack.err){
          RootNode.get('videos'+id).put(null);
          this.setState({
            videos: [],
          })
          this.updateData();
        }else{
          console.log(ack);
          
        }
      });
    })
      
  }

  popConfirmDialog = (action:string, id:string) => {
    this.setState({
      confirmDialogOpen: true,
      operateId: id,
    })
  }

  dialogActionBack = (rlt: boolean) => {
    this.setState({
      confirmDialogBack: rlt,
      confirmDialogOpen: false,

    })
  }




  render() {
    const { classes } = this.props;
    const { videos, confirmDialogOpen } = this.state;

    return (
      <Paper style={{
        paddingTop: 20,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 100,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 800,
        alignItems: 'center',
        alignCentent: 'center',
        justifyContent: 'space-around',
        
    }}>
        <Typography variant="h4">视频管理</Typography>
        <Divider />
        <br/>
      <List className={classes.root}>
        {videos.filter((video:any)=>video!==null).map((video:any, index:number) => (
          <ListItem key={index} role={undefined} dense button onClick={this.handleToggle(index)}>
            <Checkbox
              checked={this.state.checked.indexOf(index) !== -1}
              tabIndex={-1}
              disableRipple
            />
            <ListItemText primary={video.title} />
            <ListItemSecondaryAction>
              <IconButton onClick={(e:any)=> this.popConfirmDialog("delete", video.id)} aria-label="Comments">
                <CommentIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Fab component={NewVideoButtonLink}  color="primary" aria-label="Add" className={classes.fab}>
        <AddIcon />
      </Fab>
      <ConfirmDialog open={confirmDialogOpen} dialogBack={this.dialogActionBack}/>
      </Paper>
    );
  }
}

export default withStyles(styles)(Videos);
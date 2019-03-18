import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from "@material-ui/icons/Delete"
import { ListItemAvatar, Avatar} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import Switch from '@material-ui/core/Switch';
import moment from 'moment';
import 'moment/locale/zh-cn';
import ListStyles from '../public/ListStyles';
import TagSmallList from './TagSmallList';


class PostListSHow extends React.Component<any, any>{

    componentWillReceiveProps(nextProps:any){
        if(nextProps !== this.props){
        }
        
    }
    componentDidMount(){
       
    }
    handleClick = (e:any) => {
        e.stopPropagation();
        e.cancelBubble = true;
    }
    render(){
        const { classes, list, onRecommend, onPublish }  =  this.props;
       
        
        return (
            <List className={classes.root}>
            {list && list.length===0? "暂时没有数据": list && list.filter((item:any)=>item!==null).map((item:any, index:number) => (
                <ListItem key={index} role={undefined} dense button  onClick={(e:any)=> this.props.onView(item.id)}>
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src={item.coverUrl} />
                    </ListItemAvatar>
                    <ListItemText primary={item.title} secondaryTypographyProps={{component: "div"}}  secondary={
                            <React.Fragment>
                                <div className={classes.itemTextSecondary}>
                                    
                                    <div>
                                        {moment(item.createdAt).fromNow()}
                                    </div>
                                    <div style={{
                                            width: 300,
                                        }}>
                                        
                                    <TagSmallList onClick={(tag:string)=>console.log(tag)} recordId={item.id} source={"posts"}/>
                                    </div>
                                    <div>
                                        <Switch
                                            checked={item.status === "published"}
                                            value="draft"
                                            onChange={(e:any)=>onPublish(e,item)}
                                            onClick={this.handleClick}

                                        />
                                        ({item.status === "published"? "已发布" : "未发布"})
                                    </div>
                                    <div>
                                        <Switch
                                            checked={item.isRecommend}
                                            onChange={(e:any)=>onRecommend(e, item)}
                                            onClick={this.handleClick}
                                            value="draft"
                                        />
                                        ({item.isRecommend? "已推荐" : "未推荐"})
                                    </div>
                                    
                                    <IconButton  aria-label="delete" onClick={(e:any)=>this.props.onDelete(e, item.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton  onClick={(e:any)=>this.props.onEdit(e, item.id)}   aria-label="edit">
                                        <EditIcon />
                                    </IconButton>
                                    
                                </div>
                                
                            </React.Fragment>
                        } />
                    
                </ListItem>
                ))}
            </List>
        )
    }
}

export default withRouter(withStyles(ListStyles)(PostListSHow as any) as any) as any;
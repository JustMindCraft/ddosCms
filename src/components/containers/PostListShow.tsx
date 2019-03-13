import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
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

const PostListShow =  (props:any) => 
{
    const { classes, list }  =  props;
    return (
        <List className={classes.root}>
        {list && list.length===0? "暂时没有数据": list && list.filter((item:any)=>item!==null).map((item:any, index:number) => (
            <ListItem key={index} role={undefined} dense button  onClick={(e:any)=> props.onView(item.id)}>
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={item.coverUrl? item.coverUrl: "http://res.cloudinary.com/ddycd5xyn/image/upload/a_0,c_fill,w_300/default.jpg"} />
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
                                    {item.tags? 
                                    item.tags.map((tag:string, index:number)=>
                                            <span key={index}>{tag}</span>
                                    ):
                                    "没有标签"
                                    }
                                </div>
                                <div>
                                    <Switch
                                        checked={false}
                                        value="draft"
                                    />
                                    (未发布)
                                </div>
                                <div>
                                    <Switch
                                        checked={false}
                                        value="draft"
                                    />
                                    (未推荐)
                                </div>
                                
                                <IconButton  aria-label="delete" onClick={(e:any)=>props.onDelete(e, item.id)}>
                                    <DeleteIcon />
                                </IconButton>
                                <IconButton  onClick={(e:any)=>props.onEdit(e, item.id)}   aria-label="edit">
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


export default withRouter(withStyles(ListStyles)(PostListShow as any) as any) as any;
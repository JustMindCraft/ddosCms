import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from "@material-ui/icons/Delete"
import { ListItemAvatar, Avatar, Switch} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/zh-cn';
import ListStyles from '../public/ListStyles';
import { observer, inject } from 'mobx-react';
import { RootNode, now } from '../../gunDB';

@inject("message")
@inject("dataProvider")
@observer
class TagListShow extends React.Component<any, any>{

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

    handleTopTag = (e:any, tagName:string) =>{
        e.stopPropagation();
        e.cancelBubble = true;
        const { message } = this.props;
        RootNode.get("tags").map((tag:any)=> (tag && tag.name === tagName)? tag: undefined).
        once((data:any, key:string)=>{
            if(data === null){
                return false;
            }
            return RootNode.get('tags').get(key).put(null, (ack:any)=>{
                
                const tagOne = RootNode.get("tags/"+tagName).put(
                    {
                        name: data.name, 
                        contentId: data.contentId, 
                        updatedAt: now(),
                        isTop: !data.isTop,
                    }
                )
                RootNode.get("tags").set(tagOne, (ack:any)=>{
                    message.show("更新成功")
                });
            })
            
        })
    }

   
    render(){
        const { classes, list }  =  this.props;
       
        
        return (
            <List className={classes.root}>
            {list && list.length===0? "暂时没有数据": list && list.filter((item:any)=>item!==null).map((item:any, index:number) => (
                <ListItem key={index} role={undefined} dense>
                   
                    <ListItemText primary={item.name} secondaryTypographyProps={{component: "div"}}  secondary={
                            <React.Fragment>
                                <div className={classes.itemTextSecondary}>
                                    
                                    <div>
                                        {moment(item.createdAt).fromNow()}
                                    </div>
                                    <div>
                                        <Switch
                                            checked={item.isTop? item.isTop : false}
                                            onClick={this.handleClick}
                                            onChange={(e:any)=> this.handleTopTag(e, item.name)}
                                            value="top"
                                        />
                                        ({item.isTop? "导航顶置" : "导航未顶置"})
                                    </div>
                                    
                                    <IconButton  aria-label="delete" onClick={(e:any)=>this.props.onDelete(e, item.name)}>
                                        <DeleteIcon />
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

export default withRouter(withStyles(ListStyles)(TagListShow as any) as any) as any;
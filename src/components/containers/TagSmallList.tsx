import React from 'react';
import { RootNode } from '../../gunDB';
import { Chip, CircularProgress } from '@material-ui/core';


class TagSmallList extends React.Component<any, any>{
    constructor(props:any){
        super(props);
        this.state = {
            tags: [],
            loading: false,
        }
    }
    componentWillMount()
    {
        const { recordId, source } = this.props;
        const { tags } = this.state;
        this.setState({
            loading: true,
        })
        RootNode.get(source+"/tags/"+recordId).map().once((tag:any, key:string)=>{
            if(tag && tag.name){
                tags.push(tag.name);
            }
           this.setState({
               tags,
               loading: false,
           });
           
        })
        let timeout:any = null;
        timeout =  setTimeout(()=>{
            this.setState({
                tags,
                loading: false,
            });
            clearTimeout(timeout);
        }, 1500);
        
    }
    handleClick = (e:any, tag:string) => {
        e.stopPropagation();
        e.cancelBubble = true;
       this.props.onClick(tag);
        
    }

    componentWillUnmount(){
        this.setState({
            tags: [],
            loading: false,
        });
    }
    render(){
        const { loading, tags } = this.state;
        return (
            <div>
                {
                    loading && <CircularProgress />
                }
               
                {
                    !loading && tags.length===0 &&
                    <span>无标签</span>
                }
                {
                    tags.map((tag:string,index:number)=>
                        <Chip key={index} label={tag} onClick={(e:any) => this.handleClick(e, tag)} />
                    )
                    
                }
                
            </div>
        )
    }
}

export default TagSmallList;
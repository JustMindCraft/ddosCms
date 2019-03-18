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


    change = (source:string, recordId: string) => {
        const tags:string[] = [];
        RootNode.get(source+"/"+recordId+"/tags")
        .map((item:any)=>item!==null?item:undefined)
        .on((tag:any, key:string)=>{
            
            if(tag){
                tags.push(tag);
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
    componentDidMount()
    {
        const { recordId, source } = this.props;
        console.log("didmount");
        
        this.setState({
            loading: true,
        })
        this.change(source, recordId);
       
        
    }

    componentWillReceiveProps(nextProps:any){
        this.setState({
            loading: true,
            tags: [],
        })
        console.log("propsChange");

        if(nextProps !== this.props){
            
            this.change(nextProps.source, nextProps.recordId);
        } 
        
    }
    handleClick = (e:any, tag:string) => {
        e.stopPropagation();
        e.cancelBubble = true;
       this.props.onClick(tag);
        
    }

    componentDidUpdate(){
        
    }

    componentWillUnmount(){
        this.setState({
            tags: [],
            loading: false,
        });
    }
    render(){
        const { loading, tags } = this.state;
        console.log("render");
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
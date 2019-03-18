import React from 'react';
import Chip from '@material-ui/core/Chip';
import { createStyles, withStyles, Button } from '@material-ui/core';

const styles = (theme:any) => createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      flexDirection: 'column',
      padding: theme.spacing.unit / 2,
    },
    chip: {
      margin: theme.spacing.unit / 2,
    },
    chips: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        flexDirection: 'row',
        padding: theme.spacing.unit / 2,
    }
  });

interface ITagFormProps {
    onTagsChange: (tags: any) => void,
    tags: string[],
    classes: any,
}

class TagForm extends React.Component<ITagFormProps, any>{
    constructor(props:any){
        super(props);
        this.state = {
            tags: [],
            text: ''
        }
    }
   
    handleDelete = (index:number) => {
        
        const {tags } = this.state;
        const changeTags = [
            ...tags.slice(0,index),
            ...tags.slice(index+1, tags.length)
        ]
        this.setState({
            tags: changeTags,
        })
        this.props.onTagsChange(changeTags);
    }
    handleAdd = (text:string) => {
        if(text===""){
            return false;
        }
        const {tags } = this.state;
        tags.push(text);
        this.setState({
            tags,
        })
        this.props.onTagsChange(this.state.tags);
    }
    textChange = (e:any) => {
        this.setState({
            text: e.target.value,
        })
    }
    componentDidMount(){
        const { tags } = this.props;
        this.setState({
            tags,
        })
    }

    submit = (e:any) => {
        e.preventDefault();
        e.stopPropagation();
        e.cancelBubble = true;
        const { text } = this.state;
        this.setState({
            text: ""
        })
        this.handleAdd(text);

    }
    render(){
        const { classes } = this.props;
        const { tags, text } = this.state;
        
        return (
            <div>
                <form className={classes.root} onSubmit={this.submit}>
                <div className={classes.chips}>
                { tags.map(
                    (tag:string, index:number)=>  
                    <Chip
                        key={index}
                        label={tag}
                        onDelete={(e:any)=>this.handleDelete(index)}
                        className={classes.chip}
                    />
                    )
                }
                </div>
               
                <input type="text" value={text} onChange={this.textChange} />
                <Button type="submit">添加</Button>
                </form>
            </div>
            
        )
    }
}
export default  withStyles(styles)(TagForm) as any;
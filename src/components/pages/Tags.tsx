import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { RootNode } from '../../gunDB';
import Cards from '../containers/Cards';
import { Typography, Chip } from '@material-ui/core';
import { withRouter } from 'react-router';
const styles = (theme: any) => createStyles({
 
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    flexShrink: "initial",
    paddingLeft: 5,
    width: "100%",
    maxWidth: 1336,
    padding: "10%"
  },
  tag:  {
    maxWidth: 250,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
    cursor: "pointer",
    textDecoration: "none",
   
  },
  
  
});

interface IHomePageProps {
  classes: any,
  history:any,
}

class Tags extends React.Component<IHomePageProps, any> {

  constructor(props:any){
    super(props);
    this.state = {
      tags: [],
    }
  }

  componentWillMount(){
      const { tags } = this.state;
    RootNode.get("tags").map((tag:any)=> (tag && tag.name && tag.contentId)? tag: undefined).on((data:any, key:string)=>{
        if(data===null){
            return false;
        }
        if(tags.includes(data.name)){
          return false;
        }
        tags.unshift(data.name);
        this.setState({
            tags,
        })
    })
  }

  onClick=(tagName:string)=>{
    const { history } = this.props;
    history.push('/tags/'+tagName);
      
  }

  render() {
    const { classes } = this.props;

    const { tags } = this.state;

    document.title = "叉烧俱乐部 | 标签云"
    
    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.container}>

            {tags && tags.map((tag:any, index:number)=>
                <div>
                    <Chip key={index} onClick={(e:any)=>this.onClick(tag)} className={classes.tag} label={tag} />
                </div>
            )}
        </main>
       
      </React.Fragment>
    )
  }

}

export default withRouter(withStyles(styles)(Tags) as any) as any;
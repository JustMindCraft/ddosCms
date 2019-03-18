import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, Typography, createStyles, withStyles } from '@material-ui/core';


const styles = (theme: any) => createStyles({
    cardItem:  {
        maxWidth: 300,
        marginTop: 10,
        marginBottom: 10,
        marginRight: 10,
        cursor: "pointer",
        textDecoration: "none",
        [theme.breakpoints.down('xs')]: {
          width: 134
        },
      },
});

const Cards = (props:any) => {
    const { list, classes, source } = props;
    return (
        <React.Fragment>
        {
            list.length!==0 && list.map((item:any, index:number)=>
            <Link key={index} to={"/"+source+"/"+item.id}  className={classes.cardItem}>
              <Paper className={classes.cardItem}>
                  <img src={item.coverUrl} alt={item.title} style={{
                  width: "100%"
                    
                  }} />
                  <div style={{
                    padding: 5
                  }}>
                    <Typography variant="title">{item.title}</Typography>
                    <Typography variant="subtitle2" style={{
                      textAlign: "right"
                    }}>{source==="posts"? "阅读(0)" : "观看(0)"}</Typography>
                  </div>
                
                </Paper>
            </Link>
              
            )
        }
        </React.Fragment>
        
    )
}

export default withStyles(styles)(Cards as any);
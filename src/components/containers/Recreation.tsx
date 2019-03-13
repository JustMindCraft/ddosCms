import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles, createStyles } from '@material-ui/core/styles';
import MediaCards from '../containers/MediaCards';
import Chips from '../containers/Chips';



const styles = (theme: any) => createStyles({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    }
});

interface IRecreationProps {
    classes: any,
    title: any,
    list: any,
}

const Recreation = (props: IRecreationProps) => {
    const { classes, title, list } = props;
    console.log(list);
    
    return (
        <div className={classes.root}>
            <Chips text={title} />
            <Grid container spacing={24}>
                {list && list.map((item: any,index: number) => {
                    return(
                    <Grid  xs={12} sm={4} className={classes.center} key={index}>
                        <MediaCards coverUrl={item.coverUrl} description={item.description} title={item.title} id={item.id}/>
                    </Grid>
                    )
                })}
            </Grid>
        </div>
    )
}

export default withStyles(styles)(Recreation) as any;
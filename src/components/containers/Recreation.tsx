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
    classes: any
}

const Recreation = (props:IRecreationProps) => {
        const { classes } = props;
        return (
            <div className={classes.root}>
                <Chips text={"娱乐栏目"} />
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={3} className={classes.center}>
                            <MediaCards />
                    </Grid>
                    <Grid item xs={12} sm={3} className={classes.center}>
                            <MediaCards />
                    </Grid>
                    <Grid item xs={12} sm={3} className={classes.center}>
                            <MediaCards />
                    </Grid>
                    <Grid item xs={12} sm={3} className={classes.center}>
                            <MediaCards />
                    </Grid>
                </Grid>
            </div>
        )
}

export default withStyles(styles)(Recreation);
import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles, createStyles } from '@material-ui/core/styles';
import Chips from '../containers/Chips';
import ItemList from '../containers/ItemList';
import Paper from '@material-ui/core/Paper';
import SerialList from '../containers/SerialList';

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
    },
    paperWrap: {
        height: 600,
        overflowY: 'scroll',
    }
});

interface IPopularProps {
    classes: any
}

const Popular = (props: IPopularProps) => {
    const { classes } = props;
    return (
        <div>
            <Grid container spacing={24}>
                <Grid item xs={12} sm={8} >
                    <Paper className={classes.paperWrap}>
                        {/* <Chips text={"经济"} /> */}
                        <ItemList />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={4} >
                    <Paper>
                        {/* <Chips text={"热点"} /> */}
                        <SerialList />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default withStyles(styles)(Popular);
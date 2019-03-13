import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
const styles = (theme: any) => createStyles({
    navWrap: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: '0 4px',
        padding: 4,
        color: 'rgba(0,0,0,.84)',
    },
    navTitle: {
        fontWeight: 700,
        fontSize: '1em',
    }
})
const TitleLayout = (props: any) => {
    const {classes, title} = props;
    return (
        <Paper>
            <div className={classes.navWrap}>
                <div className={classes.navTitle}>
                    {title}
                </div>
                <div className={classes.navLink}>
                    查看更多
                </div>
            </div>
        </Paper>
    )
}

export default withStyles(styles)(TitleLayout)
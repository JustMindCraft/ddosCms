import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import TitleLayout from './TitleLayout';
import Paper from '@material-ui/core/Paper';
import Img from '../../images/800x600_teaser.png';
import Icon from '../../images/video.svg';

const styles = (theme: any) => createStyles({
    wrap: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    item: {
        flexBasis: '48%',
        height: 120,
        margin: 2,
        padding: 1,
    },
    img: {
        width: '100%',
        height: 100,
    },
    icon: {
        width: 16,
        height: 16,
    },
    iconWrap: {
        marginTop: -30,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    hits: {
        color: '#fff',
        fontSize: '1rem',
        margin: '0 0 0 4px',
    },
    title: {
        color: 'black',
        fontSize: '0.5rem',
        fontWeight: 700,
        margin: '4px 0 0 0',
    }
})

const VideosIndex = (props:any) => {
    const { classes } = props;
    return(
        <div>
            <TitleLayout title="视频" />
            <div className={classes.wrap}>
                <Paper className={classes.item}>
                    <img src={Img} className={classes.img}/>
                    <div className={classes.iconWrap}>
                        <img src={Icon} className={classes.icon}/>
                        <div className={classes.hits}>999</div>
                    </div>
                    <div className={classes.title}>
                        七龙珠
                    </div>
                </Paper>
                <Paper className={classes.item}>
                    <img src={Img} className={classes.img}/>
                    <div className={classes.iconWrap}>
                        <img src={Icon} className={classes.icon}/>
                        <div className={classes.hits}>999</div>
                    </div>
                    <div className={classes.title}>
                        七龙珠
                    </div>
                </Paper>
                <Paper className={classes.item}>
                    <img src={Img} className={classes.img}/>
                    <div className={classes.iconWrap}>
                        <img src={Icon} className={classes.icon}/>
                        <div className={classes.hits}>999</div>
                    </div>
                    <div className={classes.title}>
                        七龙珠
                    </div>
                </Paper>
                <Paper className={classes.item}>
                    <img src={Img} className={classes.img}/>
                    <div className={classes.iconWrap}>
                        <img src={Icon} className={classes.icon}/>
                        <div className={classes.hits}>999</div>
                    </div>
                    <div className={classes.title}>
                        七龙珠
                    </div>
                </Paper>
            </div>
        </div>
    )
}

export default withStyles(styles)(VideosIndex)
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TitleLayout from './TitleLayout';
import { styles } from '../css/common';
import Img from '../../images/800x600_teaser.png';
import Icon from '../../images/video.svg';



const RecommendsIndex = (props:any) => {
    const { classes } = props;
    return(
        <div>
          <TitleLayout title="推荐"/>
          <div className={classes.wrap}>
                <Paper className={classes.item}>
                    <img src={Img} className={classes.img}/>
                    <div className={classes.iconWrap}>
                        <img src={Icon} className={classes.icon}/>
                        <div className={classes.hits}>999</div>
                    </div>
                    <div className={classes.title}>
                        七龙珠七龙珠七龙珠
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
export default withStyles(styles)(RecommendsIndex)

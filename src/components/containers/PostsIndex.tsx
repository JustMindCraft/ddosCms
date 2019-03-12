import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Img from '../../images/bg.jpeg';
import hits from '../../images/hits.svg';
const styles = (theme: any) => createStyles({
    wrap: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 6,
    },
    title: {
        color: 'rgba(0, 0, 0, 0.87)',
        fontSize: '1rem',
        fontWeight: 700,
        lineHeight: '1em',
    },
    intro: {

    },
    text: {
        width: 200,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    bgImage: {
        backgroundImage: `url(${Img})`,
        backgroundSize: 'cover',
        minHeight: 80,
        minWidth: 80,
    },
    hits: {
        color: '#ccc',
        display: 'flex',
        alignItems: 'center',
    },
    icon: {
        width: 14,
        height: 14,
    },
    hitsText: {
        textIndent: '0.5em',
        margin: '0 0 0 20',
    },
})
const PostsIndex = (props: any) => {
    const { classes } = props;
    return (
        <div>
            <Paper>
                <div className={classes.wrap}>
                    <div className={classes.content}>
                        <div className={classes.intro}>
                            <div className={classes.title}>How to Quit Your Job in 837 Easy Steps</div>
                            <div className={classes.text}>Diverse perspectives also serve as a preventive measure against costly and embarrassing errors. Some famous missteps in recent years that have been a direct consequence of the lack of diversity include:
                                        </div>
                            <div className={classes.hits}
                            >
                                <img src={hits} className={classes.icon} />
                                <div className={classes.hitsText}>666</div>
                            </div>
                        </div>
                    </div>
                    <div className={classes.bgImage}>
                    </div>
                </div>
            </Paper>
            <Paper>
                <div className={classes.wrap}>
                    <div className={classes.content}>
                        <div className={classes.intro}>
                            <div className={classes.title}>How to Quit Your Job in 837 Easy Steps</div>
                            <div className={classes.text}>Diverse perspectives also serve as a preventive measure against costly and embarrassing errors. Some famous missteps in recent years that have been a direct consequence of the lack of diversity include:
                                        </div>
                            <div className={classes.hits}
                            >
                                <img src={hits} className={classes.icon} />
                                <div className={classes.hitsText}>666</div>
                            </div>
                        </div>
                    </div>
                    <div className={classes.bgImage}>
                    </div>
                </div>
            </Paper>
            <Paper>
                <div className={classes.wrap}>
                    <div className={classes.content}>
                        <div className={classes.intro}>
                            <div className={classes.title}>How to Quit Your Job in 837 Easy Steps</div>
                            <div className={classes.text}>Diverse perspectives also serve as a preventive measure against costly and embarrassing errors. Some famous missteps in recent years that have been a direct consequence of the lack of diversity include:
                                        </div>
                            <div className={classes.hits}
                            >
                                <img src={hits} className={classes.icon} />
                                <div className={classes.hitsText}>666</div>
                            </div>
                        </div>
                    </div>
                    <div className={classes.bgImage}>
                    </div>
                </div>
            </Paper>
        </div>
    )
}

export default withStyles(styles)(PostsIndex)
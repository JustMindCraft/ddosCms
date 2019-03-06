import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const styles = (theme:any) => ({
  root: {
    width: '100%',
    maxWidth: 1200,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  img: {
      width: '30%',
      height: '30%',
      borderRadius: '0',
  }
});

const ItemsList = (props:any) => {
  const { classes } = props;
  return (
    <List className={classes.root}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="https://cdn.dribbble.com/users/1152654/screenshots/3770977/dragon_queen_800x600_teaser.jpg" className={classes.img}/>
        </ListItemAvatar>
        <ListItemText
          primary="Brunch this weekend?"
          secondary={
            <React.Fragment>
              <Typography component="span" className={classes.inline} color="textPrimary" >
                Ali Connors
              </Typography>
              {" — I'll be in your neighborhood doing errands this…"}
              {" — I'll be in your neighborhood doing errands this…"}
              {" — I'll be in your neighborhood doing errands this…"}
              {" — I'll be in your neighborhood doing errands this…"}
            </React.Fragment>
          }
        />
      </ListItem>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="https://cdn.dribbble.com/users/1152654/screenshots/3770977/dragon_queen_800x600_teaser.jpg" className={classes.img}/>
        </ListItemAvatar>
        <ListItemText
          primary="Summer BBQ"
          secondary={
            <React.Fragment>
              <Typography component="span" className={classes.inline} color="textPrimary">
                to Scott, Alex, Jennifer
              </Typography>
              {" — Wish I could come, but I'm out of town this…"}
              {" — Wish I could come, but I'm out of town this…"}
              {" — Wish I could come, but I'm out of town this…"}
              {" — Wish I could come, but I'm out of town this…"}
              {" — Wish I could come, but I'm out of town this…"}
              {" — Wish I could come, but I'm out of town this…"}
              {" — Wish I could come, but I'm out of town this…"}
              {" — Wish I could come, but I'm out of town this…"}
              {" — Wish I could come, but I'm out of town this…"}
            </React.Fragment>
          }
        />
      </ListItem>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="https://cdn.dribbble.com/users/1152654/screenshots/3770977/dragon_queen_800x600_teaser.jpg" className={classes.img}/>
        </ListItemAvatar>
        <ListItemText
          primary="Oui Oui"
          secondary={
            <React.Fragment>
              <Typography component="span" className={classes.inline} color="textPrimary">
                Sandra Adams
              </Typography>
              {' — Do you have Paris recommendations? Have you ever…'}
              {' — Do you have Paris recommendations? Have you ever…'}
              {' — Do you have Paris recommendations? Have you ever…'}
              {' — Do you have Paris recommendations? Have you ever…'}
              {' — Do you have Paris recommendations? Have you ever…'}
              {' — Do you have Paris recommendations? Have you ever…'}
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
}


export default withStyles(styles)(ItemsList);
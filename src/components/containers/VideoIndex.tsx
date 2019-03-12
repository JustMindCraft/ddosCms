import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const styles = (theme: any) => createStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});
interface VideoIndexProps {
  classes: any,
}
const tileData = [
  {
    img: 'https://cdn.dribbble.com/users/1355613/screenshots/6158849/empty_state_teaser.jpg',
    title: 'Image',
    author: 'author',
  },
  {
    img: 'https://cdn.dribbble.com/users/1355613/screenshots/6158849/empty_state_teaser.jpg',
    title: 'Image',
    author: 'author',
  },
  {
    img: 'https://cdn.dribbble.com/users/1355613/screenshots/6158849/empty_state_teaser.jpg',
    title: 'Image',
    author: 'author',
  },
  {
    img: 'https://cdn.dribbble.com/users/1355613/screenshots/6158849/empty_state_teaser.jpg',
    title: 'Image',
    author: 'author',
  },
  {
    img: 'https://cdn.dribbble.com/users/1355613/screenshots/6158849/empty_state_teaser.jpg',
    title: 'Image',
    author: 'author',
  },
  {
    img: 'https://cdn.dribbble.com/users/1355613/screenshots/6158849/empty_state_teaser.jpg',
    title: 'Image',
    author: 'author',
  },
];


const VideoIndex = (props: any) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">视频</ListSubheader>
        </GridListTile>
        {tileData.map(tile => (
          <GridListTile key={tile.img}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              subtitle={<span>by: {tile.author}</span>}
              actionIcon={
                <IconButton className={classes.icon}>
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}


export default withStyles(styles)(VideoIndex);
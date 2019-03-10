import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import renderHTML from 'react-render-html';


const styles = {
  card: {
    maxWidth: 345,
    margin: "10px 0",
  },
  media: {
    height: 200,
    maxWidth: "100%",
  },
};
interface IMediaCardProps {
  classes: any,
  title: string,
  coverUrl: string,
  description: string,
}

const MediaCard = (props: IMediaCardProps) => {
  const { classes, title, coverUrl, description } = props;
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={coverUrl}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography component="p">
            {renderHTML(description)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <IconButton aria-label="Add to favorites">
          <FavoriteIcon />
          123
          </IconButton>
        <IconButton aria-label="Share">
          <ShareIcon />
          321
          </IconButton>
      </CardActions>
    </Card>
  );
}


export default withStyles(styles)(MediaCard);
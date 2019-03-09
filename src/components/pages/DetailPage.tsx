import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
const Img = 'https://cdn-images-1.medium.com/max/800/1*Kc_4NcVNuRLbsR9-2F6NIw.jpeg'
const styles = (theme:any) => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  cover: {
      minHeight: 300,
      backgroundImage: 'url('+ Img +')',
      backgroundSize: 'cover',
      backgroundPosition: '55% 34%',
  }
});

const  DetailPage = (props:any) => {
  const { classes } = props;

  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <div className={classes.cover}></div>
        <Typography variant="h5" component="h3">
          This is a sheet of paper.
        </Typography>
        <Typography component="p">
          Paper can be used to build surface or other elements for your application.
          Paper can be used to build surface or other elements for your application.
          Paper can be used to build surface or other elements for your application.
          Paper can be used to build surface or other elements for your application.
          Paper can be used to build surface or other elements for your application.
          Paper can be used to build surface or other elements for your application.
          Paper can be used to build surface or other elements for your application.
          Paper can be used to build surface or other elements for your application.
          Paper can be used to build surface or other elements for your application.
          Paper can be used to build surface or other elements for your application.
          Paper can be used to build surface or other elements for your application.
          Paper can be used to build surface or other elements for your application.
          Paper can be used to build surface or other elements for your application.
          Paper can be used to build surface or other elements for your application.
          Paper can be used to build surface or other elements for your application.
          Paper can be used to build surface or other elements for your application.
          Paper can be used to build surface or other elements for your application.
          Paper can be used to build surface or other elements for your application.
          Paper can be used to build surface or other elements for your application.
          Paper can be used to build surface or other elements for your application.
          Paper can be used to build surface or other elements for your application.
          Paper can be used to build surface or other elements for your application.
          Paper can be used to build surface or other elements for your application.
          Paper can be used to build surface or other elements for your application.
          Paper can be used to build surface or other elements for your application.
          Paper can be used to build surface or other elements for your application.
          Paper can be used to build surface or other elements for your application.
          Paper can be used to build surface or other elements for your application.
        </Typography>
      </Paper>
    </div>
  );
}


export default withStyles(styles)(DetailPage);
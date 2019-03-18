import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';

const styles = (theme:any) =>  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'flex-start',
      margin: "10px 0 0 0",
    },
    chip: {
      margin: theme.spacing.unit,
    },
  });
interface IChipsProps {
    classes: any;
    text: string;
}
const Chips = (props:IChipsProps) => {
    const { classes, text } = props;
    return (
      <div className={classes.root}>
        <Chip
          icon={<FaceIcon />}
          label={"最新"+text}
          className={classes.chip}
          color="primary"        />
      </div>
    );
  }
  
 
  
  export default withStyles(styles)(Chips);
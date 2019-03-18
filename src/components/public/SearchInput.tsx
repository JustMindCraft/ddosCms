import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const styles = {
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: "80%",
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
};

function CustomizedInputBase(props:any) {
  const { classes, onFocus } = props;

  return (
    <Paper className={classes.root} elevation={1}>
    
      <InputBase autoFocus={props.autoFocus} onFocus={onFocus} onChange={(e:any)=>props.onChange(e.target.value)} className={classes.input} placeholder="搜索: 标题|标签|介绍" />
      <IconButton className={classes.iconButton} aria-label="搜索">
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} />
     
    </Paper>
  );
}

export default withStyles(styles)(CustomizedInputBase);
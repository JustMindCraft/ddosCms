import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';

const styles = (theme:any) => createStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing.unit / 2,
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
});

class TagForm extends React.Component {
  

  handleDelete = (data:any) => () => {
    if (data.label === 'React') {
      alert('Why would you want to delete React?! :)'); // eslint-disable-line no-alert
      return;
    }

    
  };

  render() {

    return (
      <Paper>
        
            <Chip
              
              label="视频"
              onDelete={this.handleDelete}
            />
          );
      </Paper>
    );
  }
}



export default withStyles(styles)(TagForm);
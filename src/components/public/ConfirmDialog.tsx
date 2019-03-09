import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';


interface IComfirmDialogProps{
    fullScreen: any,
    open: boolean,
    dialogBack: any,
    title: string,
    content: string,
}
class ComfirmDialog extends React.Component<IComfirmDialogProps> {
  

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handlePositive = () => {
     return this.props.dialogBack(true);
  };

  handleNegative = () => {
      return this.props.dialogBack(false);
  }

  render() {
    const { fullScreen, open, title, content } = this.props;

    return (
       
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={this.handleNegative}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
          <DialogContent>
            <DialogContentText>
             {content}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleNegative}  color="primary">
              取消
            </Button>
            <Button onClick={this.handlePositive} color="primary" autoFocus>
              确认
            </Button>
          </DialogActions>
        </Dialog>
    );
  }
}



export default withMobileDialog()(ComfirmDialog as any) as any;
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import renderHTML from 'react-render-html';
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';


interface IComfirmDialogProps{
    fullScreen: any,
    open: boolean,
    dialogBack: any,
    title: string,
    content: string,
    ShowDialogBack:Function,
    handleDelete: Function,
    handleEdit:Function,
    coverUrl:string, 
    blobURI: string,
    loading: boolean

}
class VideoDialogShow extends React.Component<IComfirmDialogProps> {
  

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  

  handleNegative = () => {
      return this.props.ShowDialogBack(false);
  }

  render() {
    const { fullScreen, open, title, content, coverUrl, blobURI, loading } = this.props;

    return (
       
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={()=>this.props.ShowDialogBack(false)}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
          <DialogContent>
         {
              !loading && <Video 
              controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
              poster={coverUrl}
              onCanPlayThrough={() => {
                  // Do stuff
              }}>
              <source src={blobURI} type="video/mp4" />
              <track label="中文字幕" kind="subtitles" srcLang="en" src="" default />
          </Video>
         }
             {renderHTML(content?content:"<div>暂无简介</div>")}
          </DialogContent>
          <DialogActions>
            <Button onClick={(e:any)=>this.props.handleDelete()}  color="primary">
              删除
            </Button>
            <Button onClick={()=>this.props.ShowDialogBack(false)} color="primary" autoFocus>
              关闭
            </Button>
            <Button onClick={(e:any)=>this.props.handleEdit()} color="primary" autoFocus>
              编辑
            </Button>
          </DialogActions>
         
        </Dialog>
    );
  }
}



export default withMobileDialog()(VideoDialogShow as any) as any;
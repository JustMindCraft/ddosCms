import React from 'react';
import { Snackbar } from '@material-ui/core';
import { observer, inject } from 'mobx-react';

@inject('message')
@observer
class Message extends React.Component<any, any>{
    render(){
        const { showable, content } = this.props.message;
        console.log(showable);
        
        return(
            <Snackbar anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }} open={showable} message={<span>{content}</span>} />
        )
    }
}

export default Message as any;
import React, { Component } from 'react';
import { convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';


class TextEditor extends Component<any, any> {
  
  onEditorStateChange = (editorState:any) => {
      const { getRawHtml } = this.props;
      
      const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));

      getRawHtml(html);

  };

  render() {
    return (
      <div>
        <Editor
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
        />
      </div>
    );
  }
}

export default TextEditor as any;
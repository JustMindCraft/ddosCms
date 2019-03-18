import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';


class TextEditor extends Component<any, any> {

  constructor(props:any){
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    }
  }
  
  onEditorStateChange = (editorState:any) => {
      const { getRawHtml } = this.props;
      this.setState({
        editorState,
      })
      
      const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));

      getRawHtml(html);

  };

  componentWillReceiveProps(nextProps:any){
    if(this.props.value !== nextProps.value){
      if(nextProps.value){
      
        const html = nextProps.value;
        const contentBlock = htmlToDraft(html);
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        this.setState({
          editorState,
        });
        // nextProps.getRawHtml(html);
    
      }

    }
    
  }

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
          editorState={editorState}
        />
      </div>
    );
  }
}

export default TextEditor as any;
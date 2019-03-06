import React from 'react';
import  WebTorrent from 'webtorrent';
import Plyr from 'react-plyr';
import { RootNode, now } from '../../gunDB';
const  client = new WebTorrent();
interface ITestPageState{
    content: string,
    createdAt: number,
    singleMagnetURI: string
}
class TestPage extends React.Component<any, ITestPageState> {

    constructor(props:any){
        super(props);
        this.state = {
            singleMagnetURI: '',
            content: '',
            createdAt: (new Date).getTime()
        }
       
    }
    componentDidMount(){
        RootNode.get('key1').on((data:any,key:string)=>{
            console.log(key, data);
            this.setState(
                {
                    content: data.content,
                    createdAt: data.createdAt,
                }
            )
            
        })
    }

    handleTextChange = (e:any) => {
        console.log(e.target.value);

        RootNode.get('key1').put({
            content: e.target.value,
            createdAt: now()
        });
        
        
    }
    handleFileChange =  (e: any) =>{
        const files = e.target.files;
        console.log(files);

        client.seed(files, (torrent:any)=>{
            console.log(torrent.magnetURI);
                // Torrents can contain many files. Let's use the .mp4 file
                torrent.files.forEach((file: any)=>{
                    file.appendTo('#manyFileDisplay')
                })
               
                
                // Display the file by adding it to the DOM.
                // Supports video, audio, image files, and more!
                
        });
        
        
        
    }

   render(){
       const { content, createdAt } = this.state;
       return (
           <div>
               <h1>webtorent测试页面</h1> 
               <br/>
               <br/>
               <br/>
               <br/>
               <br/>
               <br/>
               <br/>
               <h1>上传单个视频</h1>
               <input type="file" onChange={this.handleFileChange} multiple={false} />
               <p></p>
               <br/>
               <br/>
               <h1>上传多个视频</h1>
               <input type="file" onChange={this.handleFileChange} multiple={true} />
               <p></p>
               <div id="manyFileDisplay">
                <div id="manyFileDisplay1"></div>
               </div>


               {/* <h1>播放器测试</h1> */}
               <div>
               {/* <Plyr
                    type="video"
                    title="View From A Blue Moon"
                    poster="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg"
                    sources={[
                        {src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4',type: 'video/mp4',size: "576"},
                    ]}
                /> */}
               </div>


               <h3>数据库测试</h3>

               <form action="">
                <label htmlFor="">
                    key
                </label>
                <input type="text" onChange={this.handleTextChange}/>
               </form>
               显示存入的数据: {content}
               时间: {new Date(createdAt).toString()}

           </div>
       )
   }
}

export default TestPage;
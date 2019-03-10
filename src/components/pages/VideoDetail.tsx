import React from 'react';
import Layout from '../containers/AuthFromLayout';
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';
class VideoDetail extends React.Component {
    render() {
        return (
            <div>
                <Layout title="视频">
                    <Video
                        controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
                        poster={'https://cdn.dribbble.com/users/788099/screenshots/6146400/girl_and_guy_in_bed_kit8-net.png'}
                        onCanPlayThrough={() => {
                            // Do stuff
                        }}>
                        <source src={'https://haoqicat-1253322599.costj.myqcloud.com/bitcoin-go/intro.mp4'} type="video/mp4" />
                        <track label="中文字幕" kind="subtitles" srcLang="en" src="" default />
                    </Video>
                </Layout>
            </div>
        )
    }
}

export default VideoDetail;
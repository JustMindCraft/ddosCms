import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router';
import Layout from '../containers/AuthFromLayout';
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';
import TorrentVideoPlayer from './TorrentVideoPlayer';

interface IVideoDetailWithMobxProps {
    dataProvider: any,
    history: any,
    match: any,
}
@inject('dataProvider')
@observer
class VideoDetailWithMobx extends React.Component<IVideoDetailWithMobxProps>{
    componentWillMount() {
        const { dataProvider } = this.props;
        const { setSource, setAction } = dataProvider;
        setSource('videos');
        setAction('view');
    }
    componentDidMount() {
        const { dataProvider, match } = this.props;
        const id = match.params.id;
        const { doAction, setOperateId } = dataProvider;
        setOperateId(id)
        doAction()
    }
    render() {
        const { oneShow } = this.props.dataProvider
        console.log(oneShow)
        return (
            <div>
                <Layout title="视频">
                    <TorrentVideoPlayer source={oneShow.magnetURI} poster={oneShow.coverUrl} />
                </Layout>
            </div>
        )
    }
}

export default withRouter(VideoDetailWithMobx as any);
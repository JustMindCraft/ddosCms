import React from 'react';
import { observer, inject } from 'mobx-react';
import Recreation from '../containers/Recreation';
interface IHomeWithMobxProps {
    dataProvider: any,
}
@inject('dataProvider')
@observer
class  VideosWithMobx extends React.Component<IHomeWithMobxProps>{
    componentWillMount() {
        const { dataProvider } = this.props;
        const { setSource, setAction } = dataProvider;
        setSource('videos');
        setAction('list');
    }
    componentDidMount() {
        const { dataProvider } = this.props;
        const { doAction } = dataProvider;
        doAction()
    }
    render() {
        const { list } = this.props.dataProvider
        console.log(list)
        return(
            <div>
                <Recreation list={list} title={"视频"}/>
            </div>
        )
    }
}

export default VideosWithMobx as any;
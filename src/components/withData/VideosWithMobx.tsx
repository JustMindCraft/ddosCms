import React from 'react';
import { observer, inject } from 'mobx-react';
import Recreation from '../containers/Recreation';
import { now } from '../../gunDB';
interface IHomeWithMobxProps {
    dataProvider: any,
}
@inject('dataProvider')
@observer
class  VideosWithMobx extends React.Component<IHomeWithMobxProps>{
    componentWillMount() {
        const { dataProvider } = this.props;
        const { setAction, doAction, setTimeEndCondition, setCondition } = dataProvider;
        setTimeEndCondition(now());
        setCondition({});
        setAction('list');
        doAction("videos")
     
    }
   
    render() {
        const { getList } = this.props.dataProvider
        const list = getList("videos");
        
        return(
            <div>
                <Recreation list={list} title={"视频"}/>
            </div>
        )
    }
}

export default VideosWithMobx as any;
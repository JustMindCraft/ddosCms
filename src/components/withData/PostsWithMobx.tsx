import React from 'react';
import { observer, inject } from 'mobx-react';
import Recreation from '../containers/Recreation';
interface IHomeWithMobxProps {
    dataProvider: any,
}
@inject('dataProvider')
@observer
class  PostsWithMobx extends React.Component<IHomeWithMobxProps>{
    componentWillMount() {
        const { dataProvider } = this.props;
        const { setAction, doAction } = dataProvider;
        setAction('list');
        doAction("posts");
       
    }
    componentDidMount() {
        
    }
    render() {
        const { getList } = this.props.dataProvider
        const list = getList('posts');
        return(
            <div>
                <Recreation list={list} title={"文章"}/>
            </div>
        )
    }
}

export default PostsWithMobx as any;
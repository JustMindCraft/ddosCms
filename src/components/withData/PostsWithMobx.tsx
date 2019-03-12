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
       
    }
    componentDidMount() {
        const { dataProvider } = this.props;
        const { setSource, setAction } = dataProvider;
        setSource('posts');
        setAction('list');
        const { doAction } = dataProvider;
        doAction()
    }
    render() {
        const { list } = this.props.dataProvider
        console.log(list)
        return(
            <div>
                123
                {/* <Recreation list={list} title={"文章"}/> */}
            </div>
        )
    }
}

export default PostsWithMobx as any;
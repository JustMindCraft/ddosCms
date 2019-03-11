import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router';
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
        setSource('views');
        setAction('view');
    }
    componentDidMount() {
        const { dataProvider, match } = this.props;
        const id =  match.params.id;
        const { doAction, setOperateId } = dataProvider;
        setOperateId(id)
        doAction()
    }
    render() {
        const { oneShow } = this.props.dataProvider
        console.log(oneShow)
        return(
            <div>
            </div>
        )
    }
}

export default withRouter(VideoDetailWithMobx as any);
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from './components/pages/Home';
import Layout from './components/containers/Layout';
import Admin from './components/pages/Admin';
import ListAdmin from './components/pages/ListAdmin';
import NewSource from './components/pages/NewSource';
import './components/css/common.css';
import SourcePreview from './components/pages/SourcePreview';
import EditSource from './components/pages/EditSource';
import SearchPage from './components/pages/Search';
import VideoShow from './components/pages/VideoShow';
import PostShow from './components/pages/PostShow';
import Posts from './components/pages/Posts';
import Hot from './components/pages/Hot';
import Recommend from './components/pages/Recommend';
import Tags from './components/pages/Tags';
import TagResults from './components/pages/TagResults';
import Videos from './components/pages/Videos';
import LoginPage from './components/pages/LoginPage';

class App extends Component<any, any> {
  
  render() {
    return (
     
        <Router>
           <Layout>
             <Switch>
              <Route exact path="/" component={HomePage}/>
              <Route exact path="/tags" component={Tags} />
              <Route exact path="/tags/:tag" component={TagResults} />
              <Route exact path="/recommend" component={Recommend} />
              <Route exact path="/hot" component={Hot} />
              <Route exact path="/posts" component={Posts} />
              <Route exact path="/videos" component={Videos} />
              <Route exact path="/search" component={SearchPage} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/videos/:id" component={VideoShow} />
              <Route exact path="/posts/:id" component={PostShow} />
              <Route exact path="/admin" component={Admin}/>
              <Route exact path="/admin/:source" component={ListAdmin} />
              <Route exact path="/admin/:source/new" component={NewSource} />
              <Route exact path="/admin/:source/:id/edit" component={EditSource} />
              <Route exact path="/admin/:source/:id/preview" component={SourcePreview} />
              <Route component={HomePage}/>
            </Switch>
          </Layout>
        </Router>
      
    );
  }
}

export default App;

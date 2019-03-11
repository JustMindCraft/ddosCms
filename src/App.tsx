import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import HomePage from './components/pages/Home';
import Layout from './components/containers/Layout';
import PostPage from './components/pages/Posts';
import NewPost from './components/pages/NewPost';
import TestPage from './components/pages/TestPage';
import NewVideo from './components/pages/NewVideo';
import Videos from './components/pages/Videos';
import LoginPage from './components/pages/LoginPage';
import SignupPage from './components/pages/SignupPage';
import DetailPage from './components/pages/DetailPage';
import VideoDetail from './components/pages/VideoDetail';

class App extends Component {
  render() {
    return (
     
        <Router>
           <Layout>
             <Switch>
              <Route exact path="/" component={HomePage}/>
              <Route exact path="/test" component={TestPage} />
              <Route exact path="/posts" component={PostPage} />
              <Route exact path="/videos" component={Videos} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/signup" component={SignupPage} />
              <Route exact path="/detail" component={DetailPage} />
              <Route exact path="/posts/new" component={NewPost} />
              <Route exact path="/posts/:id" component={PostPage}/>
              <Route exact path="/video/show/:id" component={VideoDetail} />
              <Route exact path="/videos/new" component={NewVideo} />
              <Route exact path="/videos/:id" component={TestPage} />
              <Route component={HomePage}/>
            </Switch>
          </Layout>
        </Router>
      
    );
  }
}

export default App;

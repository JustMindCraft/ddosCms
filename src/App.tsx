import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import HomePage from './components/pages/Home';
import Layout from './components/containers/Layout';
import PostPage from './components/pages/Post';
import TestPage from './components/pages/TestPage';
import NewVideo from './components/pages/NewVideo';
import LoginPage from './components/pages/LoginPage';
import SignupPage from './components/pages/SignupPage';
import DetailPage from './components/pages/DetailPage';
import EidtVideo from './components/pages/EidtVideo';
import Admin from './components/pages/Admin';
import ListAdmin from './components/withData/ListAdmin';
import NewSource from './components/pages/NewSource';

class App extends Component {
  render() {
    return (
     
        <Router>
           <Layout>
             <Switch>
              <Route exact path="/" component={HomePage}/>
              <Route exact path="/admin" component={Admin}/>
              <Route exact path="/posts/:id" component={PostPage}/>
              <Route exact path="/test" component={TestPage} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/signup" component={SignupPage} />
              <Route exact path="/detail" component={DetailPage} />
              <Route exact path="/:source" component={ListAdmin} />
              <Route exact path="/:source/new" component={NewSource} />
              <Route exact path="/:source/:id" component={TestPage} />
              <Route exact path="/:source/:id/edit" component={EidtVideo} />
              <Route component={HomePage}/>
            </Switch>
          </Layout>
        </Router>
      
    );
  }
}

export default App;

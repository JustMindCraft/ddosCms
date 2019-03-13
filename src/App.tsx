import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import HomePage from './components/pages/Home';
import Layout from './components/containers/Layout';
import TestPage from './components/pages/TestPage';
import LoginPage from './components/pages/LoginPage';
import SignupPage from './components/pages/SignupPage';
import DetailPage from './components/pages/DetailPage';
import VideoDetail from './components/pages/VideoDetail';
import EidtVideo from './components/pages/EidtVideo';
import Admin from './components/pages/Admin';
import ListAdmin from './components/withData/ListAdmin';
import NewSource from './components/pages/NewSource';
import NewHome from './components/pages/NewHome';
import './components/css/common.css';

class App extends Component<any, any> {
  
  render() {
    return (
     
        <Router>
           <Layout>
             <Switch>
              <Route exact path="/" component={HomePage}/>
              <Route exact path="/home" component={NewHome}/>
              <Route exact path="/test" component={TestPage} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/signup" component={SignupPage} />
              <Route exact path="/detail" component={DetailPage} />
              <Route exact path="/video/show/:id" component={VideoDetail} />
              <Route exact path="/admin" component={Admin}/>
              <Route exact path="/admin/:source" component={ListAdmin} />
              <Route exact path="/admin/:source/new" component={NewSource} />
              <Route exact path="/admin/:source/:id" component={TestPage} />
              <Route exact path="/admin/:source/:id/edit" component={EidtVideo} />
              <Route component={HomePage}/>
            </Switch>
          </Layout>
        </Router>
      
    );
  }
}

export default App;

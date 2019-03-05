import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import HomePage from './components/pages/Home';
import Layout from './components/containers/Layout';
import PostPage from './components/pages/Post';
import TestPage from './components/pages/TestPage';

class App extends Component {
  render() {
    return (
     
        <Router>
           <Layout>
             <Switch>
              <Route exact path="/" component={HomePage}/>
              <Route exact path="/posts/:id" component={PostPage}/>
              <Route exact path="/products/:id" component={PostPage} />
              <Route exact path="/test" component={TestPage} />
              <Route component={HomePage}/>
            </Switch>
          </Layout>
        </Router>
      
    );
  }
}

export default App;

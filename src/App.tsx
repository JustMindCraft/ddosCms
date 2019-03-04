import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import HomePage from './components/pages/Home';
import Layout from './components/containers/Layout';
import PostPage from './components/pages/Post';

class App extends Component {
  render() {
    return (
     
        <Router>
           <Layout>
            <Route path="/" component={HomePage}/>
            <Route path="/posts/:id" component={PostPage}/>
          </Layout>
        </Router>
      
    );
  }
}

export default App;

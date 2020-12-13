import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './Components/HomePage/HomepPage';
import AddImg from './Components/AddImg/AddImg';
import AddVideo from './Components/AddVideo/AddVideo';
import EditTags from './Components/EditTags/EditTags';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/img' component={AddImg}/>
          <Route path='/video' component={AddVideo}/>
          <Route path='/bookmark/:bm' component={EditTags}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

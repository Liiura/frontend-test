import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import Students from './pages/students/students'
import LessonsCareer from './pages/lessonsCareer/lessosCareer'
import Lessons from './pages/lessons/lessons'

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/students' component={Students} />
          <Route path='/lessonsCareer' component={LessonsCareer} />
          <Route path='/lessons' component={Lessons} />
        </Switch>
      </Router>
    </>
  );
}

export default App;

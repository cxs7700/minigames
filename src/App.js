import React, { useState } from 'react';
import TicTacToe from './components/TicTacToe/TicTacToe'
import JoinGame from './components/JoinGame/JoinGame';
import { BrowserRouter as Router, Route } from 'react-router-dom'

const App = () => {
  
  return (
    <Router>
      <Route path='/' exact component={ JoinGame }/>
      <Route path='/tictactoe' component={TicTacToe} />
    </Router>
  )
}

export default App;

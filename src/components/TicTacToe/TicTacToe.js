import React, { useState, useEffect } from 'react'
import queryString from 'query-string';
import io from 'socket.io-client';
import styled from 'styled-components'

let socket;

// `location` comes from react-router and gives a location prop
const TicTacToe = ({ location }) => {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  const [playerTurn, setPlayerTurn] = useState("X")
  const [gameBoard, setGameBoard] = useState(["","","","","","","","",""]);
  const endpoint = 'localhost:5000' // backend port
  
  useEffect(() => {
    // Get name and room from URL
    // Parses query string from URL
    const { name, room } = queryString.parse(location.search)
    socket = io(endpoint);
    setName(name)
    setRoom(room)
    socket.emit('join', { name, room }, () => {
      
    });
    
    return () => {
      socket.emit('disconnect');
      
      socket.off();
    }
  }, [endpoint, location.search]);
  
  useEffect(() => {
    socket.on('sendMove', (playerTurn) => {
      
    })
  })
  
  // Send move
  const sendMove = (index) => {
    playerMove(index)
  }
  
  const playerMove = (index) => {
    let turn = playerTurn;
    let board = gameBoard;
    let winningMoves = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6],
    ]
    
    if (board[index] === '') {
      board[index] = turn
      for (let i = 0; i < winningMoves.length; i++) {
        let winningRow = winningMoves[i]
        let p1 = winningRow[0]
        let p2 = winningRow[1]
        let p3 = winningRow[2]
        if (board[p1] !== '' && board[p1] === board[p2] && board[p2] === board[p3] && board[p3] === board[p1]) {
          alert(`${turn} is the winner!`)
          board = ["","","","","","","","",""]
        }
      }
      turn = turn === "X" ? "O" : "X"
      setPlayerTurn(turn)
      setGameBoard(board)
    } else {
      alert("Choose a different spot.")
    }
  }
  
  return (
    <Container>
      <GameBoard>
        {
          gameBoard.map((square,index) => {
            return <Square onClick={() => playerMove(index)}>{square}</Square>
          })
        }
      </GameBoard>
    </Container>
  )
}

const GameBoard = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 390px;
  align-items: center;
`

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Square = styled.div`
  height: 100px;
  width: 100px;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  font-weight: bold;
  :hover {
    cursor: pointer;
    opacity: 0.7;
    background-color: lightblue;
  }
`

export default TicTacToe;
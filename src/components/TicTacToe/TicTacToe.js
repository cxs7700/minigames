import React, { useState, useEffect } from 'react'
import queryString from 'query-string';
import io from 'socket.io-client';
import styled from 'styled-components'

// export default class TicTacToe extends React.Component {
//   constructor() {
//     super()
//     this.state = {
//       playerTurn: "X",
//       board: ["","","","","","","","",""]
//     }
//   }
const TicTacToe = () => {
  const [board, setBoard] = useState(["","","","","","","","",""]);
  const [playerTurn, setPlayerTurn] = useState("")
  
  return (
    <Container>
      <Board>
        {
          board.map((square,index) => {
            return <Square onClick={() => playerMove(index,playerTurn,board)}>{square}</Square>
          })
        }
      </Board>
    </Container>
  )
}

function playerMove(index,playerTurn,gameBoard) {
  let turn = playerTurn;
  let board = gameBoard
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
    this.setBoard({
      board: board
    })
  } else {
    alert("Choose a different spot.")
  }
}

const Board = styled.div`
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
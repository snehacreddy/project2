import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';
import logo from './logo.svg';
import './App.css';
/*it take props an input and return what should be rendered*/
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
/*change the code to pass a props called a value to the square*/
class Board extends React.Component {
  /*defining constructor and taking all the properties*/
  constructor(props) {
    super(props);
    /*drfining the initial state of a variable*/
    this.state = {
      /*we are creating 9 empty blocks of array */ 
      squares: Array(9).fill(null),
      /* we are assigning x as first default*/
      xIsNext: true,
    };
  }

  handleClick(i) {
    /*slice selects the portion of an array on which we have clicked */
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    /*when ever we call setState render mehod will be automatically executed */
    this.setState({
      squares: squares,
     /* each time a player moves x will be flip to zero and vice versa*/
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
      <Square
      /*the value of current box is assigned to the variable value  */
        value={this.state.squares[i]}
        /* binding the handelclick function to onclick variable*/
        onClick={() => this.handleClick(i)}
      />
    );
  }
/*calling render method*/
  render() {
    /*storing the result to constant  winner*/
    const winner = calculateWinner(this.state.squares);
    /* declaring the variable status*/
    let status;
    if (winner) {
      /*displaying the winner*/
      status = 'Winner: ' + winner;
    } else {
      /*if the winner is not yet know we need to ask from next player*/
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
/*return the values of the each boxes */
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
/*making the class as default*/
export default class Game extends React.Component {
  render() {
    /*calling the class board*/
    return (
      <div className="game">
        <div className="game-board">
      
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  /*calling the class game*/
  <Game />,
  document.getElementById('root')
);
/* finding the winner by checking the rules*/
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}





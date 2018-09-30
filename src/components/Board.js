import React, { Component } from "react"

const WIDTH = 20
const HEIGHT = 20

const initialState = {
  board: new Array(WIDTH).fill(Array(HEIGHT).fill(0))
}

class Board extends Component {
  constructor() {
    super()
    this.state = initialState

    this.handleClick = this.handleClick.bind(this)
  }
  makeBoard() {
    const cells = h => {
      for (let w = 0; w <= WIDTH; w++) {
        return <td key={`cell${h}-${w}`} id={`cell${h}-${w}`} />
      }
    }
    for (let h = 0; h <= HEIGHT; h++) {
      return (
        <table className="table table-dark table-bordered">
          <tbody>
            <tr key={`row${h}`}>{cells(h)}</tr>
          </tbody>
        </table>
      )
    }
  }
  handleClick(e) {
    const row = e.target.getAttribute("row")
    const col = e.target.getAttribute("col")

    this.toggleCell(row, col)
    console.log(this.state.board)
    console.log(row, col)
  }

  cellExists(row, col) {
    return (
      row >= 0 && row < this.state.height && col > 0 && col < this.state.width
    )
  }

  getCell(row, col) {
    if (this.cellExists(row, col)) return this.state.board[row][col]
    else return 0
  }

  setCell(value, row, col) {
    if (this.cellExists) {
      const newBoard = this.state.board
      newBoard[row][col] = value
      // this.setState(() => {
      //   return { board: newBoard }
      // })
      console.log(newBoard[row][col])
    }
  }

  toggleCell(row, col) {
    this.setCell(1 - this.getCell(row, col), row, col)
  }

  forEachCell(iterator) {
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        iterator(row, col)
      }
    }
  }

  livingNeighbors(row, col) {
    return (
      // Row Above
      this.getCell(row - 1, col - 1) +
      this.getCell(row - 1, col) +
      this.getCell(row - 1, col + 1) +
      // left and right
      this.getCell(row, col - 1) +
      this.getCell(row, col + 1) +
      // Row Below
      this.getCell(row + 1, col - 1) +
      this.getCell(row + 1, col) +
      this.getCell(row + 1, col + 1)
    )
  }

  conwayRule(cell, livingNeighbors) {
    let isAlive = cell === 1
    if (isAlive) {
      if (livingNeighbors === 2 || livingNeighbors === 3) {
        return 1
      } else {
        return 0
      }
    } else if (livingNeighbors === 3) {
      return 1
    } else {
      return 0
    }
  }

  tick() {
    const newBoard = this.makeBoard()

    this.forEachCell((row, col) => {
      const livingNeighbors = this.livingNeighbors(row, col)
      const nextCell = this.conwayRule(this.getCell(row, col), livingNeighbors)
      newBoard[row][col] = nextCell
    })

    this.setState({ board: newBoard })
  }

  render() {
    return (
      <div className="board">
        {this.makeBoard()}
        <button className="btn btn-dark">Step</button>
        <button className="btn btn-dark">Play</button>
        <button className="btn btn-dark">Randomize</button>
        <button className="btn btn-dark">Clear</button>
      </div>
    )
  }
}

export default Board

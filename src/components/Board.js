import React, { Component } from "react"

const initialState = {
  width: 0,
  height: 0
}
class Board extends Component {
  constructor() {
    super()
    this.state = initialState
  }

  makeBoard() {
    return new Array(this.state.height).fill(Array(this.state.width).fill(0))
  }

  cellExists(row, col) {
    return (
      row >= 0 && row < this.state.height && col > 0 && col < this.state.width
    )
  }

  getCell(row, col) {
    return this.cellExists ? this.board[row][col] : 0
  }

  setCell(value, row, col) {
    if (this.cellExists) this.board[row][col] = value
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

    this.board = newBoard
  }

  render() {
    return (
      <div className="board">
        <button type="button" className="btn">
          Step
        </button>
        <button type="button" className="btn">
          Play
        </button>
        <button type="button" className="btn">
          Randomize
        </button>
        <button type="button" className="btn">
          Clear
        </button>
      </div>
    )
  }
}

export default Board

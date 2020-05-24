import React, { useEffect, useState } from 'react';
import Node from './Node/Node';
import { dijkstra, getNodesInShortestPathOrder } from '../algorithms/dijkstra';
import { DragDropContext, Droppable, Draggaboe } from 'react-beautiful-dnd';

import './PathfindingVisualizer.css';
import Navbar from '../components/Navbar';

const START_NODE_ROW = 0;
const START_NODE_COL = 0;
const FINISH_NODE_ROW = 19;
const FINISH_NODE_COL = 49;
const TOTAL_ROWS = 20;
const TOTAL_COLS = 50;

// export default class PathfindingVisualizer extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             grid: [],
//             mouseIsPressed: false
//         };
//     }

const PathfindingVisualizer = () => {

    const [grid, setGrid] = useState([]);
    const [mouseIsPressed, setMouseIsPressed] = useState(false);

    useEffect(() => {
        const tempGrid = getInitialGrid();
        setGrid(tempGrid);
    }, [])

    // componentDidMount() {
    //     const grid = getInitialGrid();
    //     this.setState({ grid });
    // }

    const handleMouseDown = (row, col) => {
        const newGrid = getNewGridWithWallToggled(grid, row, col);
        // this.setState({ grid: newGrid, mouseIsPressed: true });
        setGrid(newGrid);
        setMouseIsPressed(true);
    }

    const handleMouseEnter = (row, col) => {
        if (!mouseIsPressed) return;
        const newGrid = getNewGridWithWallToggled(grid, row, col);
        // this.setState({ grid: newGrid });
        setGrid(newGrid);
    }

    const handleMouseUp = () => {
        // this.setState({ mouseIsPressed: false });
        setMouseIsPressed(false);
    }

    const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    animateShortestPath(nodesInShortestPathOrder);
                }, 10 * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
            }, 10 * i);
        }
    }

    const animateShortestPath = (nodesInShortestPathOrder) => {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                console.log(node.isWall)
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-shortest-path';
            }, 30 * i);
        }
    }

    const visualizeDijkstra = () => {
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    }

    const visualizeAsearch = () => {
        console.log("A*")
    }

    const clearAll = () => {
        // grid.map(node => {
        //     for (let i = 0; i < TOTAL_COLS; i++) {
        //         if ((node[i].row != START_NODE_ROW && node[i].row != FINISH_NODE_ROW) ||
        //             (node[i].col != START_NODE_COL && node[i].col != FINISH_NODE_COL)) {
        //             document.getElementById(`node-${node[i].row}-${node[i].col}`).className = 'node';
        //         } else if (node[i].row == START_NODE_ROW && node[i].col == START_NODE_COL) {
        //             document.getElementById(`node-${node[i].row}-${node[i].col}`).className = 'node node-start';
        //         } else if (node[i].col == FINISH_NODE_COL && node[i].row == FINISH_NODE_ROW) {
        //             document.getElementById(`node-${node[i].row}-${node[i].col}`).className = 'node node-finish';
        //         }
        //     }
        // }
        // )

    }

    return (
        <>
            <Navbar visualizeDijkstra={visualizeDijkstra} />
            <div className="grid">
                {grid.map((row, rowIdx) => {
                    return (
                        <div key={rowIdx}>
                            {row.map((node, nodeIdx) => {
                                const { row, col, isFinish, isStart, isWall } = node;
                                return (
                                    <Node
                                        key={nodeIdx}
                                        col={col}
                                        isFinish={isFinish}
                                        isStart={isStart}
                                        isWall={isWall}
                                        mouseIsPressed={mouseIsPressed}
                                        onMouseDown={(row, col) => handleMouseDown(row, col)}
                                        onMouseEnter={(row, col) =>
                                            handleMouseEnter(row, col)
                                        }
                                        onMouseUp={() => handleMouseUp()}
                                        row={row}></Node>

                                );

                            })}
                        </div>
                    );
                })}
            </div>
        </>
    );
}


const getInitialGrid = () => {
    const tempGrid = [];
    for (let row = 0; row < TOTAL_ROWS; row++) {
        const currentRow = [];
        for (let col = 0; col < TOTAL_COLS; col++) {
            currentRow.push(createNode(col, row));
        }
        tempGrid.push(currentRow);
    }
    return tempGrid;
};

const createNode = (col, row) => {
    return {
        col,
        row,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null,
    };
};

const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
};


export default PathfindingVisualizer;
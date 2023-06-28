import React, { useState, useRef } from 'react';
import { HAND_RANGE_TABLE } from './data';

function HandTable() {
  const [selectedCells, setSelectedCells] = useState(() =>
    HAND_RANGE_TABLE.map(row => row.map(() => false))
  );

  const tableRef = useRef(null);

  const [currentDragValue, setCurrentDragValue] = useState(null);

  const toggleCell = (rowIndex, cellIndex) => {
    setSelectedCells(prevSelectedCells =>
      prevSelectedCells.map((row, r) =>
        row.map((cell, c) =>
          r === rowIndex && c === cellIndex ? !cell : cell
        )
      )
    );
  };

  const handleMouseDown = (event, rowIndex, cellIndex) => {
    event.preventDefault();
    setCurrentDragValue(!selectedCells[rowIndex][cellIndex]);
    toggleCell(rowIndex, cellIndex);
  };

  const handleMouseOver = (event, rowIndex, cellIndex) => {
    event.preventDefault();
    if (event.buttons === 1 && selectedCells[rowIndex][cellIndex] !== currentDragValue) {
      toggleCell(rowIndex, cellIndex);
    }
  };

  const handleMouseUp = () => {
    setCurrentDragValue(null);
  };

  const setAllCellsTo = (value) => {
    setSelectedCells(HAND_RANGE_TABLE.map(row => row.map(() => value)));
  };


  return (
    <>
      <table ref={tableRef} onMouseUp={handleMouseUp}>
        <tbody>
          {HAND_RANGE_TABLE.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              {row.map((cell, cellIndex) => (
                <td
                  key={`cell-${rowIndex}-${cellIndex}`}
                  onMouseDown={event => handleMouseDown(event, rowIndex, cellIndex)}
                  onMouseOver={event => handleMouseOver(event, rowIndex, cellIndex)}
                  style={{
                    backgroundColor: selectedCells[rowIndex][cellIndex]
                      ? 'gray'
                      : 'white',
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => setAllCellsTo(true)}>全てグレーにする</button>
        <button onClick={() => setAllCellsTo(false)}>全て白にする</button>
      </div>
    </>
  );
}

function MyApp() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>hand scouter</h1>
      </header>
      <main>
        <HandTable />
      </main>
    </div>
  );
}

export default MyApp;
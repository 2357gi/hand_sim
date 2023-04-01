import React from 'react';
import { HAND_RANGE_TABLE } from './data';

function HandTable() {
  return (
    <table>
      <tbody>
        {HAND_RANGE_TABLE.map((row, rowIndex) => (
          <tr key={`row-${rowIndex}`}>
            {row.map((cell, cellIndex) => (
              <td key={`cell-${rowIndex}-${cellIndex}`}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function MyApp() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>テキサスホールデムのハンド表</h1>
      </header>
      <main>
        <HandTable />
      </main>
    </div>
  );
}

export default MyApp;
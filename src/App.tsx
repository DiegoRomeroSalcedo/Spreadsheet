import { useEffect, useState } from 'react';
import "./App.css";
import Grid from './components/Grid';
import { generateGrid } from './services/gridService';
import { Cell } from './types/cell';

function App() {
  const [ fields, setFields ] = useState<Cell[][]>([]);
  const [columnLetters, setColumnLetters ] = useState<string[]>([]);
  const [ rowNumbers, setRowNumbers ] = useState<number[]>([]);

  const maxColumns: number = 26;
  const maxRows: number = 24;

  useEffect(() => {
    const { fields, columnLetters, rowNumbers } = generateGrid(maxColumns, maxRows);
    setFields(fields);
    setColumnLetters(columnLetters);
    setRowNumbers(rowNumbers);
  }, []);

  const evalFormula = (x: string) => {
    const cellRegex = /([A-Z])([1-9][0-9]?)/gi;
    // Buscamos las celdas
    const cells = x.match(cellRegex);
    let result = 0;
    cells?.forEach(cell => {
      const col = cell.charAt(0); // Letras A, B, C, ...
      const row = parseInt(cell.slice(1), 10) - 1; // Indexamos correctamente el número de fila con -1

      const colIndex = col.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0);
      const cellValue = fields[row][colIndex].value || "0";

      result += parseFloat(cellValue);
    })

    return result;
  }

  const changeFieldsValue = (value: string, id: string, rowIndex: number, colIndex: number, evaluate: boolean = false) => {

    const updatedField = fields.map((row, rIdx) =>
      rIdx === rowIndex
        ? row.map((cell, cIdx) =>
            cIdx === colIndex ? { ...cell, value } : cell
          )
        : row
    );

    const row = updatedField.find((_, rIdx) => rIdx === rowIndex);
    const cell = row?.find((_, cIdx) => cIdx === colIndex) ?? null;
    
    const cellValue = cell ? cell.value.replace(/\s/g, "") : "";

    if (evaluate && cell && cellValue.startsWith("=")) {
      const total = evalFormula(cellValue.slice(1));
      updatedField[rowIndex][colIndex].value = total.toString();
    }

    // Actualizamos el estado
    setFields(updatedField);
  }

  // console.log(fields)

return (
  <> 
    <Grid 
      fields={fields}
      columnLetters={columnLetters}
      rowNumbers={rowNumbers}
      changeFieldsValue={changeFieldsValue}
    />  
  </>
)
}

export default App
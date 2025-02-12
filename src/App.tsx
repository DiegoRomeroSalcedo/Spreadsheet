import { useEffect, useState } from 'react';
import "./App.css";
import Grid from './components/Grid';
import { generateGrid } from './utils/generateGrid';
import { Cell } from './types/cell';
import { evalFormula } from './utils/formulaHelper';

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

  const changeFieldsValue = (value: string, id: string, rowIndex: number, colIndex: number, evaluate: boolean = false) => {

    /**
     * We make adjustments to optimize the code
     */

    const updatedField = [...fields]; // Clonamos la matriz de fields
    const updatedRow = [...updatedField[rowIndex]]; // Copiamos la fila especifica
    const updatedCell = { ...updatedRow[colIndex], value }; // Copiamos la celda específica

    updatedRow[colIndex] = updatedCell; // Se actuliza solo la celda especifica
    updatedField[rowIndex] = updatedRow; // Se actualiza solo la fila especifica

    if (evaluate && value.trim().startsWith("=")) {
      updatedCell.value = evalFormula(value.slice(1), fields).toString();
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
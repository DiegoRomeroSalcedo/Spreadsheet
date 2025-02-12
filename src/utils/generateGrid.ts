import { Cell } from "../types/cell";

export const generateGrid = (maxColumns: number, maxRows: number) => {
    
    const newCells: Cell[][] = [];
    const columns: string[] = [];
    const rows: number[] = [];


    for (let col = 0; col < maxColumns; col++) {
      columns.push(String.fromCharCode(65 + col)); // A, B, C, D, ...
    }

    for (let row = 0; row < maxRows; row++) {
      rows.push(row + 1);
      const rowsCells: Cell[] = [];

      for (let col = 0; col < maxColumns; col++) {
        const cellId = `${columns[col]}${row + 1}`;
        rowsCells.push({ id: cellId, value: ""});
      }

      newCells.push(rowsCells);
    }

    return { fields: newCells, columnLetters: columns, rowNumbers: rows };
  }
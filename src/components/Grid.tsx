import React from "react";
import Cell from "./Cell";
import { Cell as CellType } from "../types/cell";

interface GridProps {
    fields: CellType[][];
    columnLetters: string[];
    rowNumbers: number[];
    changeFieldsValue: (value: string, id: string,  rowIndex: number, coIndex: number) => void;
}

const Grid: React.FC<GridProps> = ({ fields, columnLetters, rowNumbers, changeFieldsValue }) => {
    return (
        <div className='grid grid-cols-[30px_repeat(26,100px)]'>
            <div></div>
            {
                columnLetters.map(c => (
                <div key={c} className='text-center '>{c}</div>
                ))
            }
            {
                fields.map((row, rowIndex) => (
                    <React.Fragment key={`row-${rowIndex}`}>
                        <div className='text-center'>{rowNumbers[rowIndex]}</div>
                        {row.map((cell, colIndex) => (
                            <Cell 
                                key={cell.id}
                                cell={cell}
                                rowIndex={rowIndex}
                                colIndex={colIndex}
                                onChange={changeFieldsValue}
                            />
                        ))}
                    </React.Fragment>
                ))
            }
        </div>
    );
}

export default Grid;
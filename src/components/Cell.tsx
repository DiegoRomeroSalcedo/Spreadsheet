import React, { useEffect, useState } from "react";
import { Cell as CellType } from "../types/cell";

interface CellProps {
    cell: CellType;
    rowIndex: number;
    colIndex: number;
    onChange: (value: string, id: string, rowIndex: number, colIndex: number, evaluate: boolean) => void;
}

const Cell: React.FC<CellProps> = ({ cell, rowIndex, colIndex, onChange }) => {
    const [ localValue, setLocalValue ] = useState(cell.value);

    useEffect(() => {
        setLocalValue(cell.value);
    }, [cell.value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalValue(e.target.value);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onChange(localValue, cell.id, rowIndex, colIndex, true)
        }
    }

    const handleBlur = () => {
        onChange(localValue, cell.id, rowIndex, colIndex, true);
    }

    return (
        <input
            className='border-1 border-solid border-gray-400 bg-gray-200' 
            key={cell.id}
            id={String(cell.id)} 
            type="text"
            value={localValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
        />
    )
}

export default Cell;
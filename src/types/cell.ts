export type CellValue = string;

export interface Cell {
    id: string;
    value: CellValue;
    formula?: string;
}
import { Cell } from "../types/cell";

/**
 * Separa la lógica de evaluacion de formulas de App.tsx
 * @param x 
 * @returns { number }
 */

export const evalFormula = (x: string, fields: Cell[][]): number => {

  try {
    const cellRegex = /([A-Z])([1-9][0-9]?)/gi;
    // Buscamos las celdas
    const cells = x.match(cellRegex);
    let result: number = 0;
    if (cells) {
      cells?.forEach(cell => {
        const col = cell.charAt(0); // Letras A, B, C, ...
        const row = parseInt(cell.slice(1), 10) - 1; // Indexamos correctamente el número de fila con -1
  
        const colIndex = col.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0);
        const cellValue = fields[row][colIndex].value || "0";
  
        result += parseFloat(cellValue);
      })
      return result;
    }

    return evalMathExpression(x);
      
  } catch(e: unknown) {
    if (e instanceof Error) {
      console.error("Error al evaluar la formula", e.message);
    } else {
      console.error("Error desconocido: ", e);
    }
    return 0;
  }
}


const evalMathExpression = (expression: string): number => {
  try {
    const regexFilter = /^[0-9+\-*/().\s%]+$/;

    if (!regexFilter.test(expression)) {
      throw new Error("Invalid Expression");
    }
    return Function(`"Use strict"; return (${expression})`)(); // usamos Function en vez de eval() para tener una evaluación mas segura.
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error("Error in the mathematic expression: ", e.message);
    }
    return 0;
  }
}
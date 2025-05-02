/**
 * Returns a random letter from the English alphabet (A-Z)
 * ASCII code for 'A' is 65, 'Z' is 90
 * @returns A single random uppercase letter
 */
export function getRandomUppercaseLetter(): string {
  const randomValue = new Uint8Array(1);
  crypto.getRandomValues(randomValue);
  const randomCharCode = (randomValue[0] % 26) + 65;
  return String.fromCharCode(randomCharCode);
}

/**
 * Returns a random lowercase letter from the English alphabet (a-z)
 * ASCII code for 'a' is 97, 'z' is 122
 * @returns A single random lowercase letter
 */
export function getRandomLowercaseLetter(): string {
  const randomValue = new Uint8Array(1);
  crypto.getRandomValues(randomValue);
  const randomCharCode = (randomValue[0] % 26) + 97;
  return String.fromCharCode(randomCharCode);
}

/**
 * Returns random coordinates of a non-null cell in a 2D matrix
 * @param matrix The 2D matrix to select from
 * @returns Object with row and col properties representing coordinates, or null if no non-null cells exist
 */
export function getRandomNonNullCell<T>(
  matrix: (T | null)[][]
): { row: number; col: number } | null {
  // Make sure the matrix is valid
  if (!matrix || matrix.length === 0) {
    return null;
  }

  // Find all non-null cell positions
  const nonNullCells: { row: number; col: number }[] = [];

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col] !== null) {
        nonNullCells.push({ row, col });
      }
    }
  }

  // Check if any non-null cells were found
  if (nonNullCells.length === 0) {
    return null;
  }

  // Select a random non-null cell using crypto
  const randomArray = new Uint32Array(1);
  crypto.getRandomValues(randomArray);
  const randomIndex = randomArray[0] % nonNullCells.length;
  return nonNullCells[randomIndex];
}

// /**
//  * Returns a random letter from the English alphabet (A-Z)
//  * ASCII code for 'A' is 65, 'Z' is 90
//  * @returns A single random uppercase letter
//  */
// export function getRandomUppercaseLetter(): string {
//   const randomCharCode = Math.floor(Math.random() * 26) + 65;
//   return String.fromCharCode(randomCharCode);
// }

// /**
//  * Returns a random lowercase letter from the English alphabet (a-z)
//  * ASCII code for 'a' is 97, 'z' is 122
//  * @returns A single random lowercase letter
//  */
// export function getRandomLowercaseLetter(): string {
//   const randomCharCode = Math.floor(Math.random() * 26) + 97;
//   return String.fromCharCode(randomCharCode);
// }

// /**
//  * Returns random coordinates of a non-null cell in a 2D matrix
//  * @param matrix The 2D matrix to select from
//  * @returns Object with row and col properties representing coordinates, or null if no non-null cells exist
//  */
// export function getRandomNonNullCell<T>(matrix: (T | null)[][]): { row: number, col: number } | null {
//     // Make sure the matrix is valid
//     if (!matrix || matrix.length === 0) {
//       return null;
//     }

//     // Find all non-null cell positions
//     const nonNullCells: { row: number, col: number }[] = [];

//     for (let row = 0; row < matrix.length; row++) {
//       for (let col = 0; col < matrix[row].length; col++) {
//         if (matrix[row][col] !== null) {
//           nonNullCells.push({ row, col });
//         }
//       }
//     }

//     // Check if any non-null cells were found
//     if (nonNullCells.length === 0) {
//       return null;
//     }

//     // Select a random non-null cell
//     const randomIndex = Math.floor(Math.random() * nonNullCells.length);
//     return nonNullCells[randomIndex];
// }

// /**
//  * Returns random coordinates of a non-null cell in a 2D matrix
//  * @param matrix The 2D matrix to select from
//  * @param rows Number of rows in the matrix
//  * @param cols Number of columns in the matrix
//  * @returns Object with row and col properties representing coordinates, or null if no non-null cells exist
//  */
// export function getRandomNonNullCell<T>(matrix: (T | null)[][], rows: number, cols: number): { row: number, col: number } | null {
//   // Find all non-null cell positions
//   const nonNullCells: { row: number, col: number }[] = [];

//   for (let row = 0; row < rows; row++) {
//     for (let col = 0; col < cols; col++) {
//       if (matrix[row][col] !== null) {
//         nonNullCells.push({ row, col });
//       }
//     }
//   }

//   // Check if any non-null cells were found
//   if (nonNullCells.length === 0) {
//     return null;
//   }

//   // Select a random non-null cell
//   const randomIndex = Math.floor(Math.random() * nonNullCells.length);
//   return nonNullCells[randomIndex];
// }

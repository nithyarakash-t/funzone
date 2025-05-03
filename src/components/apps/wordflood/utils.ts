/********MODE - SETMODE*********/
/**
 * Fills an m×n matrix with random lowercase letters (equal probability)
 * @param rows Number of rows in the matrix
 * @param cols Number of columns in the matrix
 * @returns A matrix filled with random letters
 */
export function fillMatrixWithRandomLetters(rows: number, cols: number): string[][] {
  const matrix: string[][] = [];
  
  for (let i = 0; i < rows; i++) {
    const row: string[] = [];
    for (let j = 0; j < cols; j++) {
      row.push(getRandomLetter());
    }
    matrix.push(row);
  }
  
  return matrix;
}

/**
 * Fills an m×n matrix with random letters where vowels have 50% probability
 * and consonants share the other 50%
 * @param rows Number of rows in the matrix
 * @param cols Number of columns in the matrix
 * @returns A matrix filled with random letters (vowel-weighted)
 */
export function fillMatrixWithVowelWeightedLetters(rows: number, cols: number): string[][] {
  const matrix: string[][] = [];
  
  for (let i = 0; i < rows; i++) {
    const row: string[] = [];
    for (let j = 0; j < cols; j++) {
      // 50% chance of vowel, 50% chance of consonant
      const randomValue = new Uint8Array(1);
      crypto.getRandomValues(randomValue);
      
      if (randomValue[0] % 2 === 0) {
        row.push(getRandomVowel());
      } else {
        row.push(getRandomConsonant());
      }
    }
    matrix.push(row);
  }
  
  return matrix;
}

/********MODE - DEATHMODE *********/
/**
 * Fills a single random empty (null) cell in the matrix with a random letter (equal probability)
 * @param matrix The existing matrix with potential null cells
 * @returns The updated matrix with one null cell filled, or original matrix if no null cells exist
 */
export function fillSingleCellWithRandomLetter(
  matrix: (string | null)[][]
): (string | null)[][] {
  // First check if there are any null cells
  const emptyCell = getRandomNullCell(matrix);
  
  if (!emptyCell) {
    return matrix; // No empty cells to fill
  }
  
  // Create a copy of the matrix to avoid modifying the original
  const newMatrix = structuredClone(matrix);
  const { row, col } = emptyCell;
  
  // Fill the cell with a random letter
  newMatrix[row][col] = getRandomLetter();
  
  return newMatrix;
}

/**
 * Fills a single random empty (null) cell in the matrix with a random letter
 * where vowels have 50% probability and consonants share the other 50%
 * @param matrix The existing matrix with potential null cells
 * @returns The updated matrix with one null cell filled, or original matrix if no null cells exist
 */
export function fillSingleCellWithVowelWeightedLetter(
  matrix: (string | null)[][]
): (string | null)[][] {
  // First check if there are any null cells
  const emptyCell = getRandomNullCell(matrix);
  
  if (!emptyCell) {
    return matrix; // No empty cells to fill
  }
  
  // Create a copy of the matrix to avoid modifying the original
  const newMatrix = structuredClone(matrix);
  const { row, col } = emptyCell;
  
  // 50% chance of vowel, 50% chance of consonant
  const randomValue = new Uint8Array(1);
  crypto.getRandomValues(randomValue);
  
  if (randomValue[0] % 2 === 0) {
    newMatrix[row][col] = getRandomVowel();
  } else {
    newMatrix[row][col] = getRandomConsonant();
  }
  
  return newMatrix;
}

/******** GENERAL *********/
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

/**
 * Returns random coordinates of a null cell in a 2D matrix
 * @param matrix The 2D matrix to select from
 * @returns Object with row and col properties representing coordinates, or null if no null cells exist
 */
export function getRandomNullCell<T>(
  matrix: (T | null)[][]
): { row: number; col: number } | null {
  // Make sure the matrix is valid
  if (!matrix || matrix.length === 0) {
    return null;
  }

  // Find all null cell positions
  const nullCells: { row: number; col: number }[] = [];

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col] === null) {
        nullCells.push({ row, col });
      }
    }
  }

  // Check if any null cells were found
  if (nullCells.length === 0) {
    return null;
  }

  // Select a random null cell using crypto
  const randomArray = new Uint32Array(1);
  crypto.getRandomValues(randomArray);
  const randomIndex = randomArray[0] % nullCells.length;
  return nullCells[randomIndex];
}

/**
 * Returns a random lowercase letter from the English alphabet (a-z)
 * ASCII code for 'A' is 65, 'Z' is 90
 * ASCII code for 'a' is 97, 'z' is 122
 * @returns A single random lowercase letter
 */
export function getRandomLetter(): string {
  const randomValue = new Uint8Array(1);
  crypto.getRandomValues(randomValue);
  const randomCharCode = (randomValue[0] % 26) + 97;
  return String.fromCharCode(randomCharCode);
}

/**
 * Returns a random vowel (a, e, i, o, u)
 * @returns A single random lowercase vowel
 */
export function getRandomVowel(): string {
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  const randomValue = new Uint8Array(1);
  crypto.getRandomValues(randomValue);
  const index = randomValue[0] % vowels.length;
  return vowels[index];
}

/**
 * Returns a random consonant (b-z excluding vowels)
 * @returns A single random lowercase consonant
 */
export function getRandomConsonant(): string {
  const consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 
                      'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];
  const randomValue = new Uint8Array(1);
  crypto.getRandomValues(randomValue);
  const index = randomValue[0] % consonants.length;
  return consonants[index];
}

// Function to format seconds into MM:SS format
export function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};
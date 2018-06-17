/**
 * 
 */
export default function is (x, y) {
  if (x === y) {
    return x !== 0 || 1 / x === 1 / y;
  } else {
   return x !== x && y !== y;
  }
}


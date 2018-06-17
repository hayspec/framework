/**
 * 
 */
export default function (value) {
  return (
    value === true
    || value === 'true'
    || value === 'TRUE'
    || value === 1
    || value === '1'
    || value === 'yes'
    || value === 'YES'
    || value === 'ok'
    || value === 'OK'
    || value === 'correct'
    || value === 'CORRECT'
  );
}
/**
 * 
 */
export default function (fn: () => any) {
  try {
    const res = fn();
    if (res instanceof Promise) {
      return res.then(() => false).catch(() => true);
    } else {
      return false;
    }
  }
  catch (e) {
    return true;
  }
}

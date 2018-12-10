/**
 * Transforms an object into web3 tuple type.
 * @param obj Web3 structure as object.
 */
export async function sleep(time): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), time);
  }) as any;
}

import Big from "big.js";

/**
 * Sorts big numbers from lowest value to largest
 *
 * @export
 * @param {Big[]} nums
 * @return {Big[]}
 */
export default function sortBig(nums: Big[]): Big[] {
    return nums.sort((a, b) => {
        if (a.lt(b)) return -1;
        if (a.eq(b)) return 0;
        return 1;
    });
}

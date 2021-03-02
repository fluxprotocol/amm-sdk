import Big from "big.js";
import sortBig from "./sortBig";

/**
 * Calculates the median value between a set of numbers
 *
 * @export
 * @param {Big[]} nums
 * @return {Big}
 */
export default function calcMedian(nums: Big[]): Big {
    if (nums.length === 0) return new Big(0);
    const combined = nums.reduce((prev, cur) => prev.add(cur), new Big(0))
    return combined.div(nums.length);
}

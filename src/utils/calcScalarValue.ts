import Big from "big.js";

/**
 * Calculates the underlying value of a scalar market using the current
 * long
 *
 * @export
 * @param {Big} lowerBound
 * @param {Big} upperBound
 * @param {Big} priceLong
 * @return {Big} The underlying guess of the market
 */
export default function calcScalarValue(lowerBound: Big, upperBound: Big, priceLong: Big) {
    return priceLong.mul(upperBound.sub(lowerBound)).add(lowerBound);
}

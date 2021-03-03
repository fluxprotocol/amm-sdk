import Big from "big.js";

export const ZERO = new Big(0);

export const ceilDiv = (a: Big, b: Big): Big => {
    return a.mod(b) === ZERO ? a.div(b) : a.div(b).add(1);
};

export const mulBN = (a: Big, b: number, scale = 10000): Big => {
    return new Big(a)
        .mul(Math.round(b * scale))
        .div(scale);
};

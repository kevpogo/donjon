import * as constants from "./const";

export function getRandomPointInCircle(radius) {
    let t = 2 * Math.PI * Math.random();
    let u = Math.random() + Math.random();
    let r = u > 1 ? 2 - u : u;
    return {
        x: roundm(radius * r * Math.cos(t), constants.TILE_SIZE),
        y: roundm(radius * r * Math.sin(t), constants.TILE_SIZE)
    }
}

function roundm(n, m) {
    return Math.floor(((n + m - 1) / m)) * m;
}
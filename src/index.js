import * as constants from './const';
import { Room } from "./Room";
import {getRandomPointInCircle} from "./utils";
import Two from 'two.js';

let elem = window.document.getElementById('content');

let params = {
    width: constants.WIDTH_OF_DIV,
    height: constants.HEIGHT_OF_DIV
};
let two = new Two(params).appendTo(elem);
const rooms = [];

displayRooms();
two.update();
//wait(1000);
//console.log(rooms);
//separateRooms();

function displayRooms() {
    for (let i = 0; i < constants.NUMBER_OF_ROOMS; i++) {
        let room = new Room(two);
        rooms.push(room);
        room.display();
        two.update();
    }
}

// a Room is a simple rectangle (x, y, width, height)
function separateRooms() {
    let a, b; // to hold any two rooms that are over lapping
    let dx, dxa, dxb, dy, dya, dyb; // holds delta values of the overlap
    let touching; // a boolean flag to keep track of touching rooms
    let cptWhile = 0;
    do {
        cptWhile++;
        touching = false;
        for (let i = 0; i < constants.NUMBER_OF_ROOMS; i++) {
            a = rooms[i];
            for (let j = i + 1; j < constants.NUMBER_OF_ROOMS; j++) { // for each pair of rooms (notice i+1)
                b = rooms[j];
                if (a.touches(b)) { // if the two rooms touch (allowed to overlap by 1)
                    touching = true; // update the touching flag so the loop iterates again
                    // find the two smallest deltas required to stop the overlap
                    dx = Math.min(a.right - b.left + constants.PADDING, a.left - b.right - constants.PADDING);
                    dy = Math.min(a.bottom - b.top + constants.PADDING, a.top - b.bottom - constants.PADDING);
                    // only keep the smalled delta
                    if (Math.abs(dx) < Math.abs(dy)) {
                        dy = 0;
                    } else {
                        dx = 0;
                    }
                    // create a delta for each rectangle as half the whole delta.
                    dxa = -dx / 2;
                    dxb = dx + dxa;
                    // same for y
                    dya = -dy / 2;
                    dyb = dy + dya;
                    // shift both rectangles
                    a.shift(dxa, dya);
                    b.shift(dxb, dyb);
                }
            }
        }
    } while (touching && cptWhile < 1000); // loop until no rectangles are touching
    rooms.forEach(r => {
        r.display();
        two.update();
    });
}

function wait(ms) {
    let start = Date.now(),
        now = start;
    while (now - start < ms) {
        now = Date.now();
    }
}
window.addEventListener("click", separateRooms);
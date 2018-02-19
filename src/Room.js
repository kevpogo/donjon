import * as constants from "./const";
import {getRandomPointInCircle} from "./utils";

export class Room {
    constructor(two) {
        this.two = two;

        const widthTiles = Math.floor(Math.random() * (constants.MAX_SIZE_OF_ROOM - constants.MIN_SIZE_OF_ROOM) + constants.MIN_SIZE_OF_ROOM);
        const agrandissement = Math.floor(Math.random() * constants.PROPORTION_OF_ROOM);
        let heightTiles;
        if (Math.floor(Math.random() * 2)) {
            heightTiles = widthTiles + agrandissement > constants.MAX_SIZE_OF_ROOM ? widthTiles : widthTiles + agrandissement;
        } else {
            heightTiles = widthTiles - agrandissement > constants.MIN_SIZE_OF_ROOM ? widthTiles : widthTiles - agrandissement;
        }

        // " * 2" is to have even width and height
        this.widthRoom = widthTiles * constants.TILE_SIZE * 2;
        this.heightRoom = heightTiles * constants.TILE_SIZE * 2;

        let aleat = getRandomPointInCircle(constants.RADIUS_OF_CIRCLE);
        this.x = constants.WIDTH_OF_DIV / 2 + aleat.x;
        this.y = constants.HEIGHT_OF_DIV / 2 + aleat.y;

        this.left = this.x - this.widthRoom / 2;
        this.right = this.x + this.widthRoom / 2;
        this.top = this.y - this.heightRoom / 2;
        this.bottom = this.y + this.heightRoom / 2;

        this.rectangle = null;
        this.circle = null;
    }

    display() {
        if (this.rectangle === null) {
            this.rectangle = this.two.makeRectangle(this.x, this.y, this.widthRoom, this.heightRoom);
            //this.circle = this.two.makeCircle(this.x, this.y, 4);
            this.rectangle.fill = '#4e50ff';
            //this.circle.fill = '#68f6ff';
        } else {
            this.rectangle.translation.set(this.x, this.y);
            //this.circle.translation.set(this.x, this.y);
            /*this.rectangle = this.two.makeRectangle(this.x, this.y, this.widthRoom, this.heightRoom);
            this.circle = this.two.makeCircle(this.x, this.y, 4);
            this.rectangle.fill = '#ff251c';
            this.circle.fill = '#f7ff60';*/
        }
        //this.two.update();
    }

    touches(room, padding = 0) {
        return room.left < this.right &&
            room.right > this.left &&
            room.top < this.bottom &&
            room.bottom > this.top;
    }

    shift(x, y) {
        this.x += x;
        this.y += y;
        this.left += x;
        this.right += x;
        this.top += y;
        this.bottom += y;
    }
}
import { Application, Sprite, Texture, Container, Graphics } from 'pixi.js';
import { Sound } from '@pixi/sound';
import { extend } from '@pixi/colord';

const timePerBeat = 60 / 130 * 4;
let currentBeatTime = +Date.now();
let nextBeatTime = currentBeatTime + timePerBeat * 1000;

let inst = null;
const MAP_SIZE = 780;

const app = new Application({
    width: 780,
    height: 780
});

const root = document.getElementById("root");

root.appendChild(app.view);

const container = new Container();

app.stage.addChild(container);

const padding = 12;

// 780x780 
// Create a 12x12 grid of bunnies
for (let i = 0; i < 144; i++) {

    const rectangle = Sprite.from(Texture.WHITE);
    rectangle.width = 52;
    rectangle.height = 52;

    rectangle.x = (i % 12) * 64 + padding;
    rectangle.y = Math.floor(i / 12) * 64 + padding;

    container.addChild(rectangle);
}


class Player extends Container {
    constructor() {
        super();
        this.player = Sprite.from(Texture.WHITE);
        this.player.tint = "red";

        this.player.width = 52;
        this.player.height = 52;

        this.player.x = padding;
        this.player.y = padding;

        this.addChild(this.player);


        window.addEventListener("keydown", this.move, true);
    }

    currentStep = null;

    move = (event) => {
        if (event.defaultPrevented) {
            return; // Do nothing if the event was already processed
        }
        const ct = +new Date();
        const delta =  Math.min(Math.abs(ct - nextBeatTime), Math.abs(ct - currentBeatTime));
        if (delta > 200) {
            return;
        }

        console.log(delta);
    
        switch (event.key) {
            case "ArrowDown":
                if (this.player.y < MAP_SIZE - 64) {
                    this.player.y += 64;
                }
                break;
            case "ArrowUp":
                if (this.player.y > 64) {
                    this.player.y -= 64;
                }
                break;
            case "ArrowLeft":
                if (this.player.x > 64) {
                    this.player.x -= 64;
                }
                break;
            case "ArrowRight":
                if (this.player.x < MAP_SIZE - 64) {
                    this.player.x += 64;
                }
    
                break;
            default:
                return; // Quit when this doesn't handle the key event.
        }
        // Cancel the default action to avoid it being handled twice
        event.preventDefault();
    }

}

const player = new Player();
container.addChild(player)


app.ticker.add(() => {
    switch (player.currentStep) {
        case "ArrowDown":
            if (player.y < MAP_SIZE - 64) {
                player.y += 64;
            }

            player.currentStep = null;
            break;
        case "ArrowUp":
            if (player.y > 64) {
                player.y -= 64;
            }

            player.currentStep = null;
            break;
        case "ArrowLeft":
            if (player.x > 64) {
                player.x -= 64;
            }

            player.currentStep = null;
            break;
        case "ArrowRight":
            if (player.x < MAP_SIZE - 64) {
                player.x += 64;
            }

            player.currentStep = null;
            break;
        default:
            return; // Quit when this doesn't handle the key event.
    }
})


var graphics = new Graphics();

graphics.beginFill(0xFFFF00);
graphics.lineStyle(5, 0xFF0000);
graphics.drawRect(0, 0, 30, 30);

app.stage.addChild(graphics);


graphics.alpha = 0.5;
async function main() {
    const sound = Sound.from('beat.wav');
    inst = await sound.play();
    
    let nextTimeToBeatAudio = 0;
    let beat = 0;
    let currentBeatTimeAudio = 0;

    app.ticker.add(dt => {
        const time = inst._elapsed;
        if (time >= nextTimeToBeatAudio) {
            beat++;
            nextTimeToBeatAudio = beat * timePerBeat;
            
            // fix time
            currentBeatTime = +Date.now();
            nextBeatTime = currentBeatTime + timePerBeat * 1000;
            
            graphics.alpha = 1;
        } else {
            graphics.alpha -= 0.03 * dt;
        }

    });
}


main();

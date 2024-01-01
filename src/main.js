import { Application, Sprite, Texture, Container,Graphics } from 'pixi.js';
import { Sound } from '@pixi/sound';


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

const player = Sprite.from(Texture.WHITE);
player.tint = "red";

player.width = 52;
player.height = 52;

player.x = padding;
player.y = padding;

container.addChild(player);

function move(event) {
    if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
    }

    switch (event.key) {
        case "ArrowDown":
            if (player.y < MAP_SIZE - 64) {
                player.y += 64;
            }
            break;
        case "ArrowUp":
            if (player.y > 64) {
                player.y -= 64;
            }
            break;
        case "ArrowLeft":
            if (player.x > 64) {
                player.x -= 64;
            }
            break;
        case "ArrowRight":
            if (player.x < MAP_SIZE - 64) {
                player.x += 64;
            }

            break;
        default:
            return; // Quit when this doesn't handle the key event.
    }

    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
}

window.addEventListener("keydown", move, true);


var graphics = new Graphics();

graphics.beginFill(0xFFFF00);
graphics.lineStyle(5, 0xFF0000);
graphics.drawRect(0, 0, 300, 200);

app.stage.addChild(graphics);

let nextTimeToBeat = 0;
let beat = 0;
let currentBeatTime = 0;

graphics.alpha = 0.5;
async function main() {
    const sound = Sound.from('beat.wav');
    const inst = await sound.play();
    
    const timePerBeat = 60 / 130 * 4;

    app.ticker.add(dt => {
        const time = inst._elapsed;
        if (time >= nextTimeToBeat) {
            currentBeatTime = beat * timePerBeat;
            beat++;
            nextTimeToBeat = beat * timePerBeat;
            graphics.alpha = 1;
        } else {
            graphics.alpha -= 0.03 * dt;
        }
    
    });
}


main();

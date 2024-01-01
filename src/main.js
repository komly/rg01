import { Application, Sprite, Texture, Container,Graphics } from 'pixi.js';
import { Sound } from '@pixi/sound';
import { extend } from '@pixi/colord';



let nextTimeToBeat = 0;
let beat = 0;
let currentBeatTime = 0;
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


class  Player extends Container {
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

    move = (event) => {
        if (event.defaultPrevented) {
            return; // Do nothing if the event was already processed
        }
    
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

container.addChild(new Player())





var graphics = new Graphics();

graphics.beginFill(0xFFFF00);
graphics.lineStyle(5, 0xFF0000);
graphics.drawRect(0, 0, 30, 30);

app.stage.addChild(graphics);


graphics.alpha = 0.5;
async function main() {
    const sound = Sound.from('beat.wav');
    inst = await sound.play();
    
    const timePerBeat = 60 / 130 * 4;

    app.ticker.add(dt => {
        const time = inst._elapsed;
        if (time >= nextTimeToBeat) {
            currentBeatTime = beat * timePerBeat;
            beat++;
            nextTimeToBeat = beat * timePerBeat;
            // fix time
            graphics.alpha = 1;
        } else {
            graphics.alpha -= 0.03 * dt;
        }
    
    });
}


main();

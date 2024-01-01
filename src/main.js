import {Application, Sprite, Graphics} from 'pixi.js';
import {Sound} from '@pixi/sound';

const app = new Application({
    background: '#1099bb',
    resizeTo: window,
});

document.body.appendChild(app.view);


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
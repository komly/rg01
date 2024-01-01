import {Application, Sprite, Rectangle} from 'pixi.js';
import {Sound} from '@pixi/sound';

const app = new Application({
    background: '#1099bb',
    resizeTo: window,
});

document.body.appendChild(app.view);


const sound = Sound.from('beat.wav');
sound.play();
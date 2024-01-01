import {Application, Sprite, Rectangle} from 'pixi.js';

const app = new Application({
    background: '#1099bb',
    resizeTo: window,
});

document.body.appendChild(app.view);
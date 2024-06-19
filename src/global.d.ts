// Credit: https://github.com/Gaweph/p5-typescript-starter/blob/master/global.d.ts
import 'p5/global';
import module = require('p5');
export = module;
export as namespace p5;

declare global {
    interface Window {
        p5: p5;
    }
}
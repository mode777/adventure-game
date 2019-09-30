import * as renderer from './scripts/renderer.js'; 
import * as game from './scripts/game.js'; 

main();

async function main() {
  game.initPlayfield();
  
  await renderer.loadAssets();  
  renderer.initRenderer();
  startGameLoop();
  renderer.enableEditor();
}

function startGameLoop(){
  const callback = () => {
    game.update();
    renderer.clear();
    renderer.drawPlayfield();
    renderer.drawEditorControls();
    window.requestAnimationFrame(callback);
  }
  window.requestAnimationFrame(callback);
}












import $ from 'jquery';
import * as THREE from 'three'
import {
  STATE_PROFILE, STATE_SS,
  PROFILE_VIEW, PROFILE_VIEW_INFO, PROFILE_VIEW_MENU, SS_VIEW,
  TOGGLER, BODY
} from './constants.js';
import SceneManager from './sceneManager.js';
import SolarSystem from './solarSystem/solarSystem.js';
import ProfileRenderer from './profile/profile.js';

BODY.height(window.innerHeight);
BODY.width(window.innerWidth);

const app = new SceneManager(BODY);
app.constructScene();
app.initPerformanceMonitor();
app.initWindowResizeHandler();
app.addOrbitControls();

BODY.append(app.renderer.domElement);
let SS = new SolarSystem(app);
let Profile = new ProfileRenderer(PROFILE_VIEW_INFO, PROFILE_VIEW_MENU);

let currentState = STATE_PROFILE;
const Views = {
  [STATE_SS]: () => {
    SS = new SolarSystem(app);
    SS.addAllBodies();
    SS.timeFactor = 20;
    app.addPointLight({x: 200, y: 200, z: 400});
    app.addAmbientLight();
    app.cameraPosition = {z: 60};
  },
  [STATE_PROFILE]: () => {
    Profile = new ProfileRenderer(PROFILE_VIEW_INFO, PROFILE_VIEW_MENU, app);
    Profile.init();
    app.addPointLight({x: 200, y: 200, z: 400});
    app.addAmbientLight();
    app.cameraPosition = {x: 0, y: 0, z: 4}; // RODO: reset roation/ zoom
  },
}
const Renderers = {
  [STATE_SS]: () => {
    SS.render();
  },
  [STATE_PROFILE]: () => {
    Profile.render();
  }
}

const toggleViews = () => {
  app.clearScene();
  if(currentState == STATE_SS) {
    currentState = STATE_PROFILE;
    PROFILE_VIEW.fadeIn();
  } else {
    currentState = STATE_SS;
    PROFILE_VIEW.fadeOut();
  }
  Views[currentState]();
}

const GameLoop = () => {
  app.stats.begin();

  Renderers[currentState]();
  app.render();

  app.stats.end();
  requestAnimationFrame(GameLoop);
}

Views[currentState]();
TOGGLER.click(toggleViews);

GameLoop();

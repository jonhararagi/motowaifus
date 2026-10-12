import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import vm from "node:vm";

const BACKGROUND_URL = "https://min-chi.material.jp/mc/materials/background-c/urban_street/_urban_street_1.jpg";

async function loadPresentation() {
  const source = await readFile("intento_2/webapp/js/combat_presentation.js", "utf8");
  const imageDraws = [];
  const gradient = { addColorStop() {} };
  const context = {
    fillStyle: "",
    strokeStyle: "",
    lineWidth: 1,
    font: "",
    textAlign: "left",
    textBaseline: "middle",
    createLinearGradient() { return gradient; },
    createRadialGradient() { return gradient; },
    fillRect() {},
    drawImage(image) { imageDraws.push(image.src); },
    beginPath() {},
    moveTo() {},
    lineTo() {},
    stroke() {},
    fill() {},
    fillText() {},
    arc() {},
    arcTo() {},
    ellipse() {},
    closePath() {},
    save() {},
    restore() {},
    setTransform() {},
    translate() {},
    rotate() {},
    setLineDash() {}
  };
  class ImageMock {
    constructor() {
      this.complete = false;
      this.naturalWidth = 0;
      this.naturalHeight = 0;
      this.width = 0;
      this.height = 0;
      this._src = "";
    }
    set src(value) {
      this._src = value;
      this.complete = true;
      this.naturalWidth = 1920;
      this.naturalHeight = 1080;
      this.width = 1920;
      this.height = 1080;
    }
    get src() { return this._src; }
  }
  const window = {
    MachGirlsSceneRenderer: {
      create() {
        return {
          renderFrame(_scene, _viewport, draw) { draw(); }
        };
      }
    }
  };
  const sandbox = vm.createContext({
    window,
    performance: { now: () => 1000 },
    Image: ImageMock,
    Math,
    Number,
    String,
    Object,
    Array,
    Map,
    Set,
    JSON
  });
  vm.runInContext(source, sandbox, { filename: "combat_presentation.js" });
  return { api: sandbox.window.CombatPresentation, sandbox, imageDraws, context };
}

test("Mach-Girls exposes the background slot and seeds it with the licensed city illustration", async () => {
  const { api } = await loadPresentation();
  assert.equal(api.ASSET_SLOTS.includes("scene.background"), true);
  const presentation = api.create({ getBoundingClientRect: () => ({ width: 1280, height: 720 }) }, {});
  assert.equal(presentation.getAsset("scene.background"), BACKGROUND_URL);
});

test("an approved Asset Studio BACKGROUND record maps to the live scene background slot", async () => {
  const { api } = await loadPresentation();
  const presentation = api.create({ getBoundingClientRect: () => ({ width: 1280, height: 720 }) }, {});
  const slot = presentation.slotForCatalogRecord({
    type: "BACKGROUND",
    status: "APPROVED",
    source: "https://assets.example.test/approved-background.jpg"
  }, { characterId: "yuri", enemy: { id: "iron_guard" } });
  assert.equal(slot, "scene.background");
  assert.equal(presentation.slotForCatalogRecord({
    type: "BACKGROUND",
    status: "DRAFT",
    source: "https://assets.example.test/draft-background.jpg"
  }, { characterId: "yuri", enemy: { id: "iron_guard" } }), null);
});

test("the Canvas presentation draws the real city illustration after its image loads", async () => {
  const { api, imageDraws, context } = await loadPresentation();
  const canvas = { getBoundingClientRect: () => ({ width: 1280, height: 720 }) };
  const presentation = api.create(canvas, context);
  presentation.render(null, 1000); // Starts the asynchronous image load.
  presentation.render(null, 1016); // Consumes the loaded image.
  assert.ok(imageDraws.includes(BACKGROUND_URL), "real background URL must reach Canvas.drawImage");
});

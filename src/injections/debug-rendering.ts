import { Injectable } from "@project-selene/api";
import {
  GuiUtils,
  Physics,
  SkillTreeGraphGui,
  System,
} from "@project-selene/api/terra";
import { runAsDebug } from "../utils";

class DebugRendering_1 extends Injectable(Physics) {
  drawDebugInfo(...args: any[]) {
    return runAsDebug.call(this, super.drawDebugInfo, args);
  }
}

class DebugRendering_2 extends Injectable(GuiUtils) {
  setDebugGuiRoot(...args: any[]) {
    return runAsDebug.call(this, super.setDebugGuiRoot, args);
  }
  setDebugGui(...args: any[]) {
    return runAsDebug.call(this, super.setDebugGui, args);
  }
}

class DebugRendering_3 extends Injectable(SkillTreeGraphGui) {
  renderDebug() {
    return runAsDebug.call(this, super.renderDebug);
  }
}

class DebugRendering_4 extends Injectable(System) {
  initDom(...args: any[]) {
    return runAsDebug.call(this, super.initDom, args);
  }
}

const DebugRendering = [
  DebugRendering_1,
  DebugRendering_2,
  DebugRendering_3,
  DebugRendering_4,
];
export default DebugRendering;

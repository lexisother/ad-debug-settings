import { Injectable } from "@project-selene/api";
import { ConsoleLogStep } from "@project-selene/api/terra";
import { runAsDebug } from "../utils";

class MiscDebug_1 extends Injectable(ConsoleLogStep) {
  start(...args: any[]) {
    return runAsDebug.call(this, super.start, args);
  }
}

const MiscDebug = [MiscDebug_1];
export default MiscDebug;

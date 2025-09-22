import { type Mod } from "@project-selene/api";
import { OPTION_CATEGORIES } from "@project-selene/api/terra";
import ShowDebugOptions from "./injections/show-debug-opts";
import DebugRendering from "./injections/debug-rendering";
import MiscDebug from "./injections/misc-debug";

const injections = [...ShowDebugOptions, ...DebugRendering, ...MiscDebug];

export default function main(mod: Mod) {
  injections.map((i) => mod.inject(i));
}

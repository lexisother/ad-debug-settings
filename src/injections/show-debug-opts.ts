import { Injectable } from "@project-selene/api";
import {
  g_options,
  LangEntry,
  OptionKeyboardList,
  OptionRow,
  OptionsManager,
  OptionsTabList,
  PlayerCombat,
  PlayerInventory,
  PlotManager,
  WorldManager,
  WypeBool,
  WypeT,
} from "@project-selene/api/terra";
import { runAsDebug } from "../utils";

declare let XG_GAME_DEBUG: boolean;
interface DebugOption<T = any> {
  category: string;
  default: T;
  label: string;
  order: number;
  value: T;
  wype: T extends boolean ? typeof WypeBool : typeof WypeT;
}

class ShowDebugOptions_1 extends Injectable(OptionsTabList) {
  constructor() {
    super();
    return;

    this.addTab("DEBUG", {
      label: "Debug",
      icon: "option-cat-GENERAL",
    });
  }

  onCreateListEntries(
    category: string,
    list: any /*ScrollableList*/,
    layout: any /*OptionFocusGrid*/,
    entry: any /*TabListEntry*/
  ) {
    const res = runAsDebug.call(this, super.onCreateListEntries, [
      category,
      list,
      layout,
      entry,
    ]);
    return res;

    if (category === "DEBUG") {
      const seen = new Set<string>();

      const settings = (
        Object.entries(g_options.debug) as [string, DebugOption][]
      )
        .sort(([, a], [, b]) => a.category.localeCompare(b.category))
        .map(([key, setting]) => {
          if (seen.has(setting.category)) setting.category = "";
          else seen.add(setting.category);

          return [key, setting] as [string, DebugOption];

          if (seen.has(setting.category)) {
            return [
              key,
              {
                ...setting,
                category: "",
              },
            ] as [string, DebugOption];
          } else {
            seen.add(setting.category);
            return [key, setting] as [string, DebugOption];
          }
        });

      let y = 99;
      for (let [key, setting] of settings) {
        const option = this._constructDebugOption(key, setting);
        g_options.settings[key] = option;

        const row = new OptionRow(key, y);
        list.push(row, y);
        layout.setRow(row, y);
        y++;
      }

      // const keys = g_options.getDebugOptionsKeys();
      // let y = 0;

      // for (let i = 0, len = keys.length; i < len; i++) {
      //   const key = keys[i];
      //   if (!key) continue;

      //   const option = this._constructDebugSetting(key);
      //   if (!option) continue;
      // }
    }

    return res;
  }

  private _constructDebugOption(key: string, setting: DebugOption) {
    // TODO: use `new OptionCheckBox`, but figure out how to circumvent `LangEntry.get` crap
    const option = {
      category: "DEBUG",
      config: {
        default: setting.default,
        type: "UNKNOWN",
      },
      debug: false,
      description: new LangEntry({
        path: "",
        en_US: "{i:default}",
        langID: -1,
      }),
      header:
        setting.category !== ""
          ? new LangEntry({
              path: "",
              en_US: setting.category,
              langID: -1,
            })
          : null,
      hidden: false,
      inset: false,
      key,
      label: new LangEntry({
        path: "",
        en_US: setting.label,
        langID: -1,
      }),
      local: true,
      type: "UNKNOWN",
    };
    if (setting.wype instanceof WypeBool) {
      option.type = "CHECKBOX";
      option.config.type = "CHECKBOX";
    }

    return option;
  }
}

class ShowDebugOptions_2 extends Injectable(OptionsManager) {
  addDebugOption(...args: any[]) {
    return runAsDebug.call(this, super.addDebugOption, args);
  }
  forEach(...args: any[]) {
    return runAsDebug.call(this, super.forEach, args);
  }
  forEachCategory(...args: any[]) {
    return runAsDebug.call(this, super.forEachCategory, args);
  }
}

class ShowDebugOptions_3 extends Injectable(OptionKeyboardList) {
  onCreateListEntries(...args: any[]) {
    return runAsDebug.call(this, super.onCreateListEntries, args);
  }
}

class ShowDebugOptions_4 extends Injectable(PlayerInventory) {
  constructor() {
    XG_GAME_DEBUG = true;
    super();
    XG_GAME_DEBUG = false;
  }
}

class ShowDebugOptions_5 extends Injectable(PlayerCombat) {
  onAddonPreInit() {
    return runAsDebug.call(this, super.onAddonPreInit);
  }
}

class ShowDebugOptions_6 extends Injectable(PlotManager) {
  constructor() {
    XG_GAME_DEBUG = true;
    super();
    XG_GAME_DEBUG = false;
  }
}

class ShowDebugOptions_7 extends Injectable(WorldManager) {
  constructor() {
    XG_GAME_DEBUG = true;
    super();
    XG_GAME_DEBUG = false;
  }
}

const ShowDebugOptions = [
  ShowDebugOptions_1,
  ShowDebugOptions_2,
  ShowDebugOptions_3,
  ShowDebugOptions_4,
  ShowDebugOptions_5,
  ShowDebugOptions_6,
  ShowDebugOptions_7,
];
export default ShowDebugOptions;

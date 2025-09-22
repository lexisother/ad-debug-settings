declare let XG_GAME_DEBUG: boolean;

export function runAsDebug(
  this: unknown,
  func: (...args: any[]) => any,
  args: any[] = []
): any {
  const original = XG_GAME_DEBUG;
  XG_GAME_DEBUG = true;
  const result = func.apply(this, args);
  XG_GAME_DEBUG = original;
  return result;
}

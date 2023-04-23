import DebugFunction, { Debug, Debugger } from "debug";
import chalk, { Chalk } from "chalk";
import ENVIRONMENT from "../configs/environment";
import { DebugColors, DebugWithColors } from "../types/Debug";

const BaseColors = (color: Chalk) => ({
  highSuccess: color.bgGreen,
  success: color.green,
  highError: color.bgRed,
  error: color.red,
  information: color.bgYellow,
  misc: color.blue,
});

export const setMessage = (color: DebugColors, message: string): string =>
  BaseColors(chalk)[color](message);

const importDebugAndSetBaseLocation = (
  debug: Debug,
  baseLocation: string,
  callback: Function
): Debug => callback(debug, baseLocation);

const baseSetDebug =
  (debug: Debug, baseLocation: string) =>
  (currentLocation: string): Debugger =>
    debug(`${baseLocation.slice(0, -+`${":*".length}`)}:${currentLocation}`);

export const setDebugWithoutColors = importDebugAndSetBaseLocation(
  DebugFunction,
  ENVIRONMENT.debug,
  baseSetDebug
);

export const setDebug =
  (currentLocation: string): DebugWithColors =>
  (color: DebugColors, message: string): void =>
    setDebugWithoutColors(currentLocation)(setMessage(color, message));

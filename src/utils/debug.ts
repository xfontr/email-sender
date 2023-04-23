import "../loadEnvironment";
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
  baseLocation: string,
  callback: Function
): Debug => callback(baseLocation);

const baseSetDebug =
  (baseLocation: string) =>
  (currentLocation: string): Debugger =>
    DebugFunction(`${baseLocation.slice(0, -2)}:${currentLocation}`);

export const setDebugWithoutColors = importDebugAndSetBaseLocation(
  ENVIRONMENT.debug,
  baseSetDebug
);

export const setDebug =
  (currentLocation: string): DebugWithColors =>
  (color: DebugColors, message: string): void =>
    setDebugWithoutColors(currentLocation)(setMessage(color, message));

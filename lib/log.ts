import {
  Log,
  LogCollector,
  LogFunction,
  LogLevel,
  logLevels,
} from "@/types/log";

export const createLogCollector = (): LogCollector => {
  const logs: Log[] = [];

  const getAll = () => {
    return logs;
  };

  const logFunctions = {} as Record<LogLevel, LogFunction>;

  logLevels.forEach(
    (level) =>
      (logFunctions[level] = (message: string) => {
        logs.push({ message, level, timestamp: new Date() });
      })
  );

  return {
    getAll,
    ...logFunctions,
  };
};

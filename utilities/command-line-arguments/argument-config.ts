import {
  FilePath,
  validateFilePath,
} from "../../check/search-markdown-files/mod.ts";
import { isBoolean, isObject, isString } from "../../utilities/mod.ts";

type Command = "check" | "comment";

type CommandLineArgument = {
  helpFlag: boolean; // -h
  command: Command;
  targetBranch: string; // -t
  filePaths: FilePath[];
  json?: string; // -j
  headSha?: string; // -s
  branchName?: string; // -b
};

function validateCommand(input: unknown): Command {
  if (!isString(input)) {
    throw new Error();
  }
  switch (input) {
    case "check":
      return "check";
    case "comment":
      return "comment";
    default:
      throw new Error("invalid command");
  }
}

/** validate command line argument */
function validateCommandLineArgument(input: unknown) {
  const baseConfig: CommandLineArgument = {
    helpFlag: false,
    targetBranch: "main",
    command: "check",
    filePaths: ["." as FilePath],
    json: undefined,
    headSha: undefined,
    branchName: undefined,
  };
  if (!isObject(input)) {
    throw new Error();
  }
  baseConfig.helpFlag = "h" in input && isBoolean(input.h) ? input.h : false
  baseConfig.targetBranch = "t" in input && isString(input.t) ? input.t : "main"
  baseConfig.json = "j" in input && isString(input.j) ? input.j : "[]"
  baseConfig.headSha = "s" in input && isString(input.s) ? input.s : undefined
  baseConfig.branchName = "b" in input && isString(input.b) ? input.b : undefined

  if (
    "_" in input && Array.isArray(input._)
  ) {
    const [command, ...filePaths] = input._;
    baseConfig.command = validateCommand(command);
    baseConfig.filePaths = filePaths.map((filePath) =>
      validateFilePath(filePath)
    );
  }
  if (baseConfig.filePaths.length === 0) {
    baseConfig.filePaths = [validateFilePath(".")];
  }
  return baseConfig;
}

export { validateCommandLineArgument };

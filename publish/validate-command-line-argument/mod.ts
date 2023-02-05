import { validateFilePath } from "../../utilities/path/mod.ts";
import { isString } from "../../utilities/type-guard.ts";

/**
 * @param {{filePaths: string[], "zenndesk-api-auth-header": string, "notion-api-key": string}} input
 * @param {string[]} input.filePaths - target file paths.
 * @param {string} input["zenndesk-api-auth-header"] - target branch name. command line argument --zenndesk-api-auth-header
 * @param {string} input["notion-api-key"] - target branch name. command line argument --notion-api-key
 * @returns {{filePaths: string[], targetBranch: string}} object
 * @returns {string} object.filePaths - target file paths.
 * @returns {string} object.zendeskApiAuthHeader - Zendesk API authotization header (base64 encoded).
 * @returns {string} object.notionApiKey - notion API key.
 */
function validateCommandLineArgument(input: Record<string, unknown>) {
  if (
    !("filePaths" in input) || !Array.isArray(input.filePaths)
  ) {
    throw new Error("invalid check command argument");
  }
  const filePaths = input.filePaths.map((filePath) =>
    validateFilePath(filePath)
  );
  return {
    filePaths: filePaths.length > 0 ? filePaths : [validateFilePath(".")],
    zendeskApiAuthHeader: "zendesk-api-auth-header" in input &&
        isString(input["zendesk-api-auth-header"])
      ? input["zendesk-api-auth-header"]
      : undefined,
    notionApiKey: "notion-api-key" in input && isString(input["notion-api-key"])
      ? input["notion-api-key"]
      : undefined,
  };
}

export { validateCommandLineArgument };

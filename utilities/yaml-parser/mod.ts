import * as yaml from "https://deno.land/std@0.224.0/encoding/yaml.ts";

function yamlParser(yamlString: string) {
  try {
    return yaml.parse(yamlString) ?? {};
  } catch {
    return {};
  }
}

export { yamlParser };

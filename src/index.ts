import { Config } from "./configuration";
import { getSchema } from "./schemaProvider";
import { getDoc } from "./sampleDocumentsProvider";
import { generateDts } from "./dtsGenerator";

export * from "./configuration";

export async function generateTsDeclarations(config: Config) {
    // retrieve sample documents from database
    let doc = await getDoc(config);
    // extract schema from documents
    let schema = getSchema(config, doc);
    // generate typescript declaration files
    let src = generateDts(schema);
    return src;
}
import * as fs from "fs";
import * as path from "path";
import {generateCollections} from "./generateCollections";

fs.writeFileSync(path.join(__dirname, "../_collections.generated.d.ts"),generateCollections());



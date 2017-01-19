"use strict";
const fs = require("fs");
const path = require("path");
const generateCollections_1 = require("./generateCollections");
fs.writeFileSync(path.join(__dirname, "../_collections.generated.d.ts"), generateCollections_1.generateCollections());

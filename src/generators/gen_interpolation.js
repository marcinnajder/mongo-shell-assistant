"use strict";
const os = require("os");
var nl = os.EOL;
var sampleSchema = {
    entities: [
        {
            name: "User",
            fields: [
                {
                    name: "_id",
                    type: "number"
                },
                {
                    name: "name",
                    type: "string"
                }
            ]
        },
        {
            name: "Configuration",
            fields: [
                {
                    name: "_id",
                    type: "string"
                },
                {
                    name: "data",
                    type: "any"
                }
            ]
        }
    ]
};
var text = generate(sampleSchema);
console.log(text);
function generate(schema) {
    return `
// generated ${new Date()}

${schema.entities.map(e => `
interface ${e.name} {
${e.fields.map(f => `
    ${f.name} : ${f.type};`).join("")}

}
`).join("")}
`;
}
exports.generate = generate;

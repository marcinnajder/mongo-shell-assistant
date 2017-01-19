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
var text = Array.from(generate(sampleSchema))
    .map(s => s.substr(nl.length))
    .join("");
console.log(text);
function* generate(schema) {
    yield `
//generated ${new Date()}
`;
    for (var e of schema.entities) {
        yield `
interaface ${e.name}{
`;
        for (var f of e.fields) {
            yield `
    ${f.name} : ${f.type};
`;
        }
        yield `
}
`;
    }
    //     return `
    // // generated ${new Date()}
    // ${schema.entities.map( e => `
    // interface ${e.name} {
    // ${e.fields.map( f => `
    //     ${f.name} : ${f.type};`).join("")}
    // }
    // `).join("")}
    // `
}
exports.generate = generate;
// <#
//     foreach(var e in entites)
//     {
// #>
// class <#e.name#> {
// <#
//         foreach(var f in e.fields)
//         {
// #>
//     <#= f.name#> : <#= f.type#>;
// <#
//         }
// #>
// }
// <#
//     }
// #>

import * as os from "os";

var nl = os.EOL;



export interface Schema {
    entities: {
        name: string;
        fields: {
            name: string;
            type: string;
        }[];
    }[];
}

var sampleSchema: Schema = {
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

export function generate(schema: Schema) {
    return `
// generated ${new Date()}

${schema.entities.map( e => `
interface ${e.name} {
${e.fields.map( f => `
    ${f.name} : ${f.type};`).join("")}

}
`).join("")}
`
}
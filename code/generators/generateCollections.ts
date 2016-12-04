//var nl = (process.platform === 'win32' ? '\r\n' : '\n');

import * as os from "os";
import * as fs from "fs";
import * as path from "path"; 

var nl = os.EOL;

export function generateCollections(){
    var src = `
/// <references path="./_all.d.ts" />
`;

    var cms2Collections = {
        "users" : ["PatientUserDb", "UserDb_Flattened" ],
        "files" : ["FileDb", "FileDb" ],
        "albums" : ["AlbumDb", "AlbumDb" ],
        "comments" : ["CommentDb", "CommentDb" ],
        "sections" : ["SectionDb", "SectionDb" ],
        "configs" : ["ConfigurationDb", "ConfigurationDb" ],
        "tickets" : ["TicketDb<any>", "TicketDb<any>" ],
        "contentItems" : ["ContentItemDb", "ContentItemDb" ],
        "migrations" : ["MigrationDb", "MigrationDb" ],
        "surveyresults" : ["any", "any" ],
        "entities" : ["any", "any" ],
        "entitiesHistory" : ["any", "any" ],
        "fake" : ["FakeDocumentDb", "any" ],
    };

    src = generateDatabase(src, "test2",cms2Collections);
    src = generateDatabase(src, "ahop_prod",cms2Collections);
    src = generateDatabase(src, "ahop_test",cms2Collections);

    return src;
}

function generateDatabase(src, databaseName, collections){
    src += `
declare interface Mongo {
    getDB(database:"${databaseName}"):${databaseName}_db;
}

declare interface Db {
    getSiblingDB(database:"${databaseName}"):${databaseName}_db;
}
`;

    src += `
declare interface ${databaseName}_db extends Db{
${Object.keys(collections).map(key => ` ${key}: Collection_<${collections[key][0]}, ${collections[key][1]}>;`).join(nl)}
${Object.keys(collections).map(key => ` getCollection(name:"${key}") : Collection_<${collections[key][0]}, ${collections[key][1]}>;`).join(nl)}
}
`;

return src;
}
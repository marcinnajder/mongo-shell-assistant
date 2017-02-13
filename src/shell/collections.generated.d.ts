
/// <references path="./_all.d.ts" />


// declare class Mongo {
//     /** localhost:27017 (default host address)*/
//     constructor();
//     /** @param host "host:port?" */
//     constructor(host: string);



//     /**
//      * Provides access to database objects from the mongo shell or from a JavaScript file.
//      * @param databaseName The name of the database to access.
//      * 
//      * https://docs.mongodb.com/manual/reference/method/Mongo.getDB/#Mongo.getDB 
//      * */
//     getDB(databaseName: string): Db;
// }

// declare module Hej {

// }
declare var Mongo2: Mongo2;

declare interface Mongo2 {
    /** localhost:27017 (default host address)*/
    new (): Mongo2;
    /** @param host "host:port?" */
    new (host: string): Mongo2;


    /**
     * Provides access to database objects from the mongo shell or from a JavaScript file.
     * @param databaseName The name of the database to access.
     * 
     * https://docs.mongodb.com/manual/reference/method/Mongo.getDB/#Mongo.getDB 
     * */
    getDB(databaseName: string): Db;
}

/** SERVER: localhost:27017 (1) */
declare interface Mongo2 {
    new (p: "1"): __1__;
}
declare interface __1__ extends Mongo2 {
}
/** SERVER: localhost:27017 (1) */

/** SERVER: localhost:99999 (2) */
declare interface Mongo2 {
    new (p: "2"): __2__;
}
declare interface __2__ extends Mongo2 {
}
/** SERVER: localhost:99999 (2) */




/** DATABASE: localhost:27017/test2 */
declare interface __1__ {
    getDB(database: "test2"): __1__test2__;
}
declare interface __1__dbbase extends Db {
    getSiblingDB(database: "test2"): __1__test2__;
}
declare interface __1__test2__ extends __1__dbbase {
}
/** DATABASE: localhost:27017/test2 */



/** DATABASE: localhost:27017/test3 */
declare interface __1__ extends Mongo2 {
    getDB(database: "test3"): __1__test3__;
}
declare interface __1__dbbase extends Db {
    getSiblingDB(database: "test3"): __1__test3__;
}
declare interface __1__test3__ extends __1__dbbase {
}
/** DATABASE: localhost:27017/test3 */


/** DATABASE: localhost:27017/test4 => localhost:27017/test2*/
declare interface __1__ {
    getDB(database: "test4"): __1__test2__;
}
declare interface __1__dbbase extends Db {
    getSiblingDB(database: "test4"): __1__test2__;
}
declare interface __1__test4__ extends __1__dbbase {
}
/** DATABASE: localhost:27017/test4 => localhost:27017/test2*/




/** COLLECTION: localhost:27017/test2/users */
declare interface __1__test2__ {
    users: Collection_<__1__test1__users__, __1__test1__users__flattened__>;
}
declare interface __1__test1__users__ {
    _id: ObjectId;
    name: string;
}
declare interface __1__test1__users__flattened__ {
    _id: ObjectId;
    name: string;
}
/** COLLECTION: localhost:27017/test2/users */




// declare interface Db {
//     getSiblingDB(database: "test2"): test2_db;
// }







// declare interface Db {
//     getSiblingDB(database: "test2"): test2_db;
// }





// declare module _1_ {
//     export interface Mongo2 extends Mongo {
//         jeden();
//     }
// }
// declare module _2_ {
//     export interface Mongo2 extends Mongo {
//         getDB(database: "test2"): test2.test2_db;
//     }
//     export module test2 {

//         export interface test2_db extends Db {
//             getDB(database: "test2"): test2_db;
//         }

//     }
// }



// declare interface Mongo {
//     getDB(database: "test2"): test2_db;
// }

// declare interface Db {
//     getSiblingDB(database: "test2"): test2_db;
// }

// declare interface test2_db extends Db {
//     users: Collection_<PatientUserDb, UserDb_Flattened>;
//     files: Collection_<FileDb, FileDb>;
//     albums: Collection_<AlbumDb, AlbumDb>;
//     comments: Collection_<CommentDb, CommentDb>;
//     sections: Collection_<SectionDb, SectionDb>;
//     configs: Collection_<ConfigurationDb, ConfigurationDb>;
//     tickets: Collection_<TicketDb<any>, TicketDb<any>>;
//     contentItems: Collection_<ContentItemDb, ContentItemDb>;
//     migrations: Collection_<MigrationDb, MigrationDb>;
//     surveyresults: Collection_<any, any>;
//     entities: Collection_<any, any>;
//     entitiesHistory: Collection_<any, any>;
//     fake: Collection_<FakeDocumentDb, any>;
//     getCollection(name: "users"): Collection_<PatientUserDb, UserDb_Flattened>;
//     getCollection(name: "files"): Collection_<FileDb, FileDb>;
//     getCollection(name: "albums"): Collection_<AlbumDb, AlbumDb>;
//     getCollection(name: "comments"): Collection_<CommentDb, CommentDb>;
//     getCollection(name: "sections"): Collection_<SectionDb, SectionDb>;
//     getCollection(name: "configs"): Collection_<ConfigurationDb, ConfigurationDb>;
//     getCollection(name: "tickets"): Collection_<TicketDb<any>, TicketDb<any>>;
//     getCollection(name: "contentItems"): Collection_<ContentItemDb, ContentItemDb>;
//     getCollection(name: "migrations"): Collection_<MigrationDb, MigrationDb>;
//     getCollection(name: "surveyresults"): Collection_<any, any>;
//     getCollection(name: "entities"): Collection_<any, any>;
//     getCollection(name: "entitiesHistory"): Collection_<any, any>;
//     getCollection(name: "fake"): Collection_<FakeDocumentDb, any>;
// }

// declare interface Mongo {
//     getDB(database: "ahop_prod"): ahop_prod_db;
// }

// declare interface Db {
//     getSiblingDB(database: "ahop_prod"): ahop_prod_db;
// }

// declare interface ahop_prod_db extends Db {
//     users: Collection_<PatientUserDb, UserDb_Flattened>;
//     files: Collection_<FileDb, FileDb>;
//     albums: Collection_<AlbumDb, AlbumDb>;
//     comments: Collection_<CommentDb, CommentDb>;
//     sections: Collection_<SectionDb, SectionDb>;
//     configs: Collection_<ConfigurationDb, ConfigurationDb>;
//     tickets: Collection_<TicketDb<any>, TicketDb<any>>;
//     contentItems: Collection_<ContentItemDb, ContentItemDb>;
//     migrations: Collection_<MigrationDb, MigrationDb>;
//     surveyresults: Collection_<any, any>;
//     entities: Collection_<any, any>;
//     entitiesHistory: Collection_<any, any>;
//     fake: Collection_<FakeDocumentDb, any>;
//     getCollection(name: "users"): Collection_<PatientUserDb, UserDb_Flattened>;
//     getCollection(name: "files"): Collection_<FileDb, FileDb>;
//     getCollection(name: "albums"): Collection_<AlbumDb, AlbumDb>;
//     getCollection(name: "comments"): Collection_<CommentDb, CommentDb>;
//     getCollection(name: "sections"): Collection_<SectionDb, SectionDb>;
//     getCollection(name: "configs"): Collection_<ConfigurationDb, ConfigurationDb>;
//     getCollection(name: "tickets"): Collection_<TicketDb<any>, TicketDb<any>>;
//     getCollection(name: "contentItems"): Collection_<ContentItemDb, ContentItemDb>;
//     getCollection(name: "migrations"): Collection_<MigrationDb, MigrationDb>;
//     getCollection(name: "surveyresults"): Collection_<any, any>;
//     getCollection(name: "entities"): Collection_<any, any>;
//     getCollection(name: "entitiesHistory"): Collection_<any, any>;
//     getCollection(name: "fake"): Collection_<FakeDocumentDb, any>;
// }

// declare interface Mongo {
//     getDB(database: "ahop_test"): ahop_test_db;
// }

// declare interface Db {
//     getSiblingDB(database: "ahop_test"): ahop_test_db;
// }

// declare interface ahop_test_db extends Db {
//     users: Collection_<PatientUserDb, UserDb_Flattened>;
//     files: Collection_<FileDb, FileDb>;
//     albums: Collection_<AlbumDb, AlbumDb>;
//     comments: Collection_<CommentDb, CommentDb>;
//     sections: Collection_<SectionDb, SectionDb>;
//     configs: Collection_<ConfigurationDb, ConfigurationDb>;
//     tickets: Collection_<TicketDb<any>, TicketDb<any>>;
//     contentItems: Collection_<ContentItemDb, ContentItemDb>;
//     migrations: Collection_<MigrationDb, MigrationDb>;
//     surveyresults: Collection_<any, any>;
//     entities: Collection_<any, any>;
//     entitiesHistory: Collection_<any, any>;
//     fake: Collection_<FakeDocumentDb, any>;
//     getCollection(name: "users"): Collection_<PatientUserDb, UserDb_Flattened>;
//     getCollection(name: "files"): Collection_<FileDb, FileDb>;
//     getCollection(name: "albums"): Collection_<AlbumDb, AlbumDb>;
//     getCollection(name: "comments"): Collection_<CommentDb, CommentDb>;
//     getCollection(name: "sections"): Collection_<SectionDb, SectionDb>;
//     getCollection(name: "configs"): Collection_<ConfigurationDb, ConfigurationDb>;
//     getCollection(name: "tickets"): Collection_<TicketDb<any>, TicketDb<any>>;
//     getCollection(name: "contentItems"): Collection_<ContentItemDb, ContentItemDb>;
//     getCollection(name: "migrations"): Collection_<MigrationDb, MigrationDb>;
//     getCollection(name: "surveyresults"): Collection_<any, any>;
//     getCollection(name: "entities"): Collection_<any, any>;
//     getCollection(name: "entitiesHistory"): Collection_<any, any>;
//     getCollection(name: "fake"): Collection_<FakeDocumentDb, any>;
// }

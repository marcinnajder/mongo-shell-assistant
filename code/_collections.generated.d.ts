
/// <references path="./_all.d.ts" />

declare interface Mongo {
    getDB(database:"test2"):test2_db;
}

declare interface Db {
    getSiblingDB(database:"test2"):test2_db;
}

declare interface test2_db extends Db{
 users: Collection_<PatientUserDb, UserDb_Flattened>;
 files: Collection_<FileDb, FileDb>;
 albums: Collection_<AlbumDb, AlbumDb>;
 comments: Collection_<CommentDb, CommentDb>;
 sections: Collection_<SectionDb, SectionDb>;
 configs: Collection_<ConfigurationDb, ConfigurationDb>;
 tickets: Collection_<TicketDb<any>, TicketDb<any>>;
 contentItems: Collection_<ContentItemDb, ContentItemDb>;
 migrations: Collection_<MigrationDb, MigrationDb>;
 surveyresults: Collection_<any, any>;
 entities: Collection_<any, any>;
 entitiesHistory: Collection_<any, any>;
 fake: Collection_<FakeDocumentDb, any>;
 getCollection(name:"users") : Collection_<PatientUserDb, UserDb_Flattened>;
 getCollection(name:"files") : Collection_<FileDb, FileDb>;
 getCollection(name:"albums") : Collection_<AlbumDb, AlbumDb>;
 getCollection(name:"comments") : Collection_<CommentDb, CommentDb>;
 getCollection(name:"sections") : Collection_<SectionDb, SectionDb>;
 getCollection(name:"configs") : Collection_<ConfigurationDb, ConfigurationDb>;
 getCollection(name:"tickets") : Collection_<TicketDb<any>, TicketDb<any>>;
 getCollection(name:"contentItems") : Collection_<ContentItemDb, ContentItemDb>;
 getCollection(name:"migrations") : Collection_<MigrationDb, MigrationDb>;
 getCollection(name:"surveyresults") : Collection_<any, any>;
 getCollection(name:"entities") : Collection_<any, any>;
 getCollection(name:"entitiesHistory") : Collection_<any, any>;
 getCollection(name:"fake") : Collection_<FakeDocumentDb, any>;
}

declare interface Mongo {
    getDB(database:"ahop_prod"):ahop_prod_db;
}

declare interface Db {
    getSiblingDB(database:"ahop_prod"):ahop_prod_db;
}

declare interface ahop_prod_db extends Db{
 users: Collection_<PatientUserDb, UserDb_Flattened>;
 files: Collection_<FileDb, FileDb>;
 albums: Collection_<AlbumDb, AlbumDb>;
 comments: Collection_<CommentDb, CommentDb>;
 sections: Collection_<SectionDb, SectionDb>;
 configs: Collection_<ConfigurationDb, ConfigurationDb>;
 tickets: Collection_<TicketDb<any>, TicketDb<any>>;
 contentItems: Collection_<ContentItemDb, ContentItemDb>;
 migrations: Collection_<MigrationDb, MigrationDb>;
 surveyresults: Collection_<any, any>;
 entities: Collection_<any, any>;
 entitiesHistory: Collection_<any, any>;
 fake: Collection_<FakeDocumentDb, any>;
 getCollection(name:"users") : Collection_<PatientUserDb, UserDb_Flattened>;
 getCollection(name:"files") : Collection_<FileDb, FileDb>;
 getCollection(name:"albums") : Collection_<AlbumDb, AlbumDb>;
 getCollection(name:"comments") : Collection_<CommentDb, CommentDb>;
 getCollection(name:"sections") : Collection_<SectionDb, SectionDb>;
 getCollection(name:"configs") : Collection_<ConfigurationDb, ConfigurationDb>;
 getCollection(name:"tickets") : Collection_<TicketDb<any>, TicketDb<any>>;
 getCollection(name:"contentItems") : Collection_<ContentItemDb, ContentItemDb>;
 getCollection(name:"migrations") : Collection_<MigrationDb, MigrationDb>;
 getCollection(name:"surveyresults") : Collection_<any, any>;
 getCollection(name:"entities") : Collection_<any, any>;
 getCollection(name:"entitiesHistory") : Collection_<any, any>;
 getCollection(name:"fake") : Collection_<FakeDocumentDb, any>;
}

declare interface Mongo {
    getDB(database:"ahop_test"):ahop_test_db;
}

declare interface Db {
    getSiblingDB(database:"ahop_test"):ahop_test_db;
}

declare interface ahop_test_db extends Db{
 users: Collection_<PatientUserDb, UserDb_Flattened>;
 files: Collection_<FileDb, FileDb>;
 albums: Collection_<AlbumDb, AlbumDb>;
 comments: Collection_<CommentDb, CommentDb>;
 sections: Collection_<SectionDb, SectionDb>;
 configs: Collection_<ConfigurationDb, ConfigurationDb>;
 tickets: Collection_<TicketDb<any>, TicketDb<any>>;
 contentItems: Collection_<ContentItemDb, ContentItemDb>;
 migrations: Collection_<MigrationDb, MigrationDb>;
 surveyresults: Collection_<any, any>;
 entities: Collection_<any, any>;
 entitiesHistory: Collection_<any, any>;
 fake: Collection_<FakeDocumentDb, any>;
 getCollection(name:"users") : Collection_<PatientUserDb, UserDb_Flattened>;
 getCollection(name:"files") : Collection_<FileDb, FileDb>;
 getCollection(name:"albums") : Collection_<AlbumDb, AlbumDb>;
 getCollection(name:"comments") : Collection_<CommentDb, CommentDb>;
 getCollection(name:"sections") : Collection_<SectionDb, SectionDb>;
 getCollection(name:"configs") : Collection_<ConfigurationDb, ConfigurationDb>;
 getCollection(name:"tickets") : Collection_<TicketDb<any>, TicketDb<any>>;
 getCollection(name:"contentItems") : Collection_<ContentItemDb, ContentItemDb>;
 getCollection(name:"migrations") : Collection_<MigrationDb, MigrationDb>;
 getCollection(name:"surveyresults") : Collection_<any, any>;
 getCollection(name:"entities") : Collection_<any, any>;
 getCollection(name:"entitiesHistory") : Collection_<any, any>;
 getCollection(name:"fake") : Collection_<FakeDocumentDb, any>;
}

// localhost:27017 
declare interface Mongo {
    new (host: "localhost:27017"): _0_;
}
declare interface _0_ extends Mongo {
}
// localhost:27017 -> test2
declare interface _0__BaseDb extends Db {
    getSiblingDB(database: "test2"): _0_test2_;
}
declare interface _0_ {
    getDB(database: "test2"): _0_test2_;
}
declare interface _0_test2_ extends _0__BaseDb {
}
// localhost:27017 -> test2 -> users
declare interface _0_test2_  {
    users: Collection_<_0_test2_users_, _0_test2_users_Flatten>;
    getCollection(name: "users"): Collection_<_0_test2_users_, _0_test2_users_Flatten>;
}
declare interface _0_test2_users_ {
    _id : ObjectId
    name : string
    login : string
    password : string
    roles : string[]
    permissions : any[]
    isActive : boolean
    creationDate : Date

}
declare interface _0_test2_users_Flatten {
    _id : ObjectId
    name : string
    login : string
    password : string
    roles : string[]
    permissions : any[]
    isActive : boolean
    creationDate : Date

}
// localhost:27017 -> test2 -> sessions
declare interface _0_test2_  {
    sessions: Collection_<_0_test2_sessions_, _0_test2_sessions_Flatten>;
    getCollection(name: "sessions"): Collection_<_0_test2_sessions_, _0_test2_sessions_Flatten>;
}
declare interface _0_test2_sessions_ {

}
declare interface _0_test2_sessions_Flatten {

}
// localhost:27017 -> test2 -> tickets
declare interface _0_test2_  {
    tickets: Collection_<_0_test2_tickets_, _0_test2_tickets_Flatten>;
    getCollection(name: "tickets"): Collection_<_0_test2_tickets_, _0_test2_tickets_Flatten>;
}
declare interface _0_test2_tickets_ {

}
declare interface _0_test2_tickets_Flatten {

}
// localhost:27017 -> test2 -> smsVisitMap
declare interface _0_test2_  {
    smsVisitMap: Collection_<_0_test2_smsVisitMap_, _0_test2_smsVisitMap_Flatten>;
    getCollection(name: "smsVisitMap"): Collection_<_0_test2_smsVisitMap_, _0_test2_smsVisitMap_Flatten>;
}
declare interface _0_test2_smsVisitMap_ {

}
declare interface _0_test2_smsVisitMap_Flatten {

}
// localhost:27017 -> test2 -> contentItems
declare interface _0_test2_  {
    contentItems: Collection_<_0_test2_contentItems_, _0_test2_contentItems_Flatten>;
    getCollection(name: "contentItems"): Collection_<_0_test2_contentItems_, _0_test2_contentItems_Flatten>;
}
declare interface _0_test2_contentItems_page_ {
    _id : ObjectId
    type : "page"
    name : string
    createdDate : Date
    modifiedDate : Date
    parentId : null
    position : number
    content : any[]
    slug : string
    published : boolean
    showInMenu : boolean
    author : string
    publishDate : Date
    layout : string
    loginRequired : boolean
    contentLinks : 
{

}

}
declare interface _0_test2_contentItems_page_Flatten {
    _id : ObjectId
    type : "page"
    name : string
    createdDate : Date
    modifiedDate : Date
    parentId : null
    position : number
    content : any[]
    slug : string
    published : boolean
    showInMenu : boolean
    author : string
    publishDate : Date
    layout : string
    loginRequired : boolean
    contentLinks : any

}
declare interface _0_test2_contentItems_service_ {
    _id : ObjectId
    name : string
    slug : string
    price : string
    type : "service"
    content : any[]
    parentId : ObjectId
    beforeVisit : null
    medicalDocuments : any[]
    published : boolean
    showInMenu : boolean
    hisId : string
    surveyId : string
    layout : string
    loginRequired : boolean
    author : string
    createdDate : Date
    modifiedDate : Date
    contentLinks : 
{

}
    publishDate : Date

}
declare interface _0_test2_contentItems_service_Flatten {
    _id : ObjectId
    name : string
    slug : string
    price : string
    type : "service"
    content : any[]
    parentId : ObjectId
    beforeVisit : null
    medicalDocuments : any[]
    published : boolean
    showInMenu : boolean
    hisId : string
    surveyId : string
    layout : string
    loginRequired : boolean
    author : string
    createdDate : Date
    modifiedDate : Date
    contentLinks : any
    publishDate : Date

}
declare type _0_test2_contentItems_ = _0_test2_contentItems_page_|_0_test2_contentItems_service_ ;
declare type _0_test2_contentItems_Flatten = _0_test2_contentItems_page_Flatten|_0_test2_contentItems_service_Flatten ;
// localhost:27017 -> test2 -> sections
declare interface _0_test2_  {
    sections: Collection_<_0_test2_sections_, _0_test2_sections_Flatten>;
    getCollection(name: "sections"): Collection_<_0_test2_sections_, _0_test2_sections_Flatten>;
}
declare interface _0_test2_sections_ {
    _id : ObjectId
    content : any[]
    name : string
    createdDate : Date
    modifiedDate : Date
    contentLinks : 
{

}

}
declare interface _0_test2_sections_Flatten {
    _id : ObjectId
    content : any[]
    name : string
    createdDate : Date
    modifiedDate : Date
    contentLinks : any

}
// localhost:27017 -> test2 -> previews
declare interface _0_test2_  {
    previews: Collection_<_0_test2_previews_, _0_test2_previews_Flatten>;
    getCollection(name: "previews"): Collection_<_0_test2_previews_, _0_test2_previews_Flatten>;
}
declare interface _0_test2_previews_ {

}
declare interface _0_test2_previews_Flatten {

}
// localhost:27017 -> test2 -> migrations
declare interface _0_test2_  {
    migrations: Collection_<_0_test2_migrations_, _0_test2_migrations_Flatten>;
    getCollection(name: "migrations"): Collection_<_0_test2_migrations_, _0_test2_migrations_Flatten>;
}
declare interface _0_test2_migrations_ {
    _id : string
    lastUpdate : Date
    version : number

}
declare interface _0_test2_migrations_Flatten {
    _id : string
    lastUpdate : Date
    version : number

}
// localhost:27017 -> test2 -> files
declare interface _0_test2_  {
    files: Collection_<_0_test2_files_, _0_test2_files_Flatten>;
    getCollection(name: "files"): Collection_<_0_test2_files_, _0_test2_files_Flatten>;
}
declare interface _0_test2_files_ {

}
declare interface _0_test2_files_Flatten {

}
// localhost:27017 -> test2 -> configs
declare interface _0_test2_  {
    configs: Collection_<_0_test2_configs_, _0_test2_configs_Flatten>;
    getCollection(name: "configs"): Collection_<_0_test2_configs_, _0_test2_configs_Flatten>;
}
declare interface _0_test2_configs_mailings_ {
    _id : "mailings"
    first : 
{
    days : string
    time : string
    smsRemindMsg : string
    smsConfirmMsg : string
    smsCancelMsg : string
    smsWrongReplyMsg : string

}
    second : 
{
    days : string
    time : string
    smsRemindMsg : string

}
    smsAccountConfirmMsg : string
    smsVisitRegisterConfirmMsg : string
    expiration : 
{
    days : string
    time : string

}

}
declare interface _0_test2_configs_mailings_Flatten {
    _id : "mailings"
    first : any
    "first.days" : string
    "first.time" : string
    "first.smsRemindMsg" : string
    "first.smsConfirmMsg" : string
    "first.smsCancelMsg" : string
    "first.smsWrongReplyMsg" : string
    second : any
    "second.days" : string
    "second.time" : string
    "second.smsRemindMsg" : string
    smsAccountConfirmMsg : string
    smsVisitRegisterConfirmMsg : string
    expiration : any
    "expiration.days" : string
    "expiration.time" : string

}
declare type _0_test2_configs_ = _0_test2_configs_mailings_ ;
declare type _0_test2_configs_Flatten = _0_test2_configs_mailings_Flatten ;
// localhost:27017 -> test2 -> entities
declare interface _0_test2_  {
    entities: Collection_<_0_test2_entities_, _0_test2_entities_Flatten>;
    getCollection(name: "entities"): Collection_<_0_test2_entities_, _0_test2_entities_Flatten>;
}
declare interface _0_test2_entities_agreement_ {
    _id : ObjectId
    type : "agreement"
    tags : string[]
    data : 
{
    title : string
    content : string

}
    version : number
    createdDate : Date
    modifiedDate : Date
    author : string

}
declare interface _0_test2_entities_agreement_Flatten {
    _id : ObjectId
    type : "agreement"
    tags : string[]
    data : any
    "data.title" : string
    "data.content" : string
    version : number
    createdDate : Date
    modifiedDate : Date
    author : string

}
declare interface _0_test2_entities_terms_ {
    _id : ObjectId
    type : "terms"
    tags : string[]
    data : 
{
    title : string
    content : string

}
    version : number
    createdDate : Date
    modifiedDate : Date
    author : string

}
declare interface _0_test2_entities_terms_Flatten {
    _id : ObjectId
    type : "terms"
    tags : string[]
    data : any
    "data.title" : string
    "data.content" : string
    version : number
    createdDate : Date
    modifiedDate : Date
    author : string

}
declare interface _0_test2_entities_activationInstruction_ {
    _id : ObjectId
    type : "activationInstruction"
    tags : string[]
    data : 
{
    title : string
    content : string

}
    createdDate : Date
    modifiedDate : Date
    author : string

}
declare interface _0_test2_entities_activationInstruction_Flatten {
    _id : ObjectId
    type : "activationInstruction"
    tags : string[]
    data : any
    "data.title" : string
    "data.content" : string
    createdDate : Date
    modifiedDate : Date
    author : string

}
declare interface _0_test2_entities_survey_ {
    _id : ObjectId
    type : "survey"
    tags : string[]
    data : 
{
    title : string
    questions : any[]
    answers : any[]
    requireAuthentication : boolean

}
    version : number
    createdDate : Date
    modifiedDate : Date
    author : string

}
declare interface _0_test2_entities_survey_Flatten {
    _id : ObjectId
    type : "survey"
    tags : string[]
    data : any
    "data.title" : string
    "data.questions" : any[]
    "data.answers" : any[]
    "data.requireAuthentication" : boolean
    version : number
    createdDate : Date
    modifiedDate : Date
    author : string

}
declare interface _0_test2_entities_userprofile_ {
    _id : ObjectId
    type : "userprofile"
    data : 
{
    title : string
    isSystemProfile : boolean
    maxRegistrationsOnline : number
    defaultExpiryPeriod : 
{
    unit : string
    val : number

}

}
    createdDate : Date
    modifiedDate : Date
    author : string

}
declare interface _0_test2_entities_userprofile_Flatten {
    _id : ObjectId
    type : "userprofile"
    data : any
    "data.title" : string
    "data.isSystemProfile" : boolean
    "data.maxRegistrationsOnline" : number
    "data.defaultExpiryPeriod" : any
    "data.defaultExpiryPeriod.unit" : string
    "data.defaultExpiryPeriod.val" : number
    createdDate : Date
    modifiedDate : Date
    author : string

}
declare type _0_test2_entities_ = _0_test2_entities_agreement_|_0_test2_entities_terms_|_0_test2_entities_activationInstruction_|_0_test2_entities_survey_|_0_test2_entities_userprofile_ ;
declare type _0_test2_entities_Flatten = _0_test2_entities_agreement_Flatten|_0_test2_entities_terms_Flatten|_0_test2_entities_activationInstruction_Flatten|_0_test2_entities_survey_Flatten|_0_test2_entities_userprofile_Flatten ;
// localhost:27017 -> test2_new
declare interface _0__BaseDb extends Db {
    getSiblingDB(database: "test2_new"): _0_sampledb_;
}
declare interface _0_ {
    getDB(database: "test2_new"): _0_sampledb_;
}
declare interface _0_sampledb_ extends _0__BaseDb {
}
// localhost:27017 -> test2_new2
declare interface _0__BaseDb extends Db {
    getSiblingDB(database: "test2_new2"): _0_sampledb_;
}
declare interface _0_ {
    getDB(database: "test2_new2"): _0_sampledb_;
}
declare interface _0_sampledb_ extends _0__BaseDb {
}
// localhost:27017 -> sampledb
declare interface _0__BaseDb extends Db {
    getSiblingDB(database: "sampledb"): _0_sampledb_;
}
declare interface _0_ {
    getDB(database: "sampledb"): _0_sampledb_;
}
declare interface _0_sampledb_ extends _0__BaseDb {
}
// localhost:27017 -> sampledb -> multimedia
declare interface _0_sampledb_  {
    multimedia: Collection_<_0_sampledb_multimedia_, _0_sampledb_multimedia_Flatten>;
    getCollection(name: "multimedia"): Collection_<_0_sampledb_multimedia_, _0_sampledb_multimedia_Flatten>;
}
declare interface _0_sampledb_multimedia_image_ {
    _id : ObjectId
    name : string
    size : number
    type : "image"
    imageWidth : number
    imageHeight : number

}
declare interface _0_sampledb_multimedia_image_Flatten {
    _id : ObjectId
    name : string
    size : number
    type : "image"
    imageWidth : number
    imageHeight : number

}
declare interface _0_sampledb_multimedia_video_ {
    _id : ObjectId
    name : string
    size : number
    type : "video"
    duration : number

}
declare interface _0_sampledb_multimedia_video_Flatten {
    _id : ObjectId
    name : string
    size : number
    type : "video"
    duration : number

}
declare interface _0_sampledb_multimedia_document_ {
    _id : ObjectId
    name : string
    size : number
    type : "document"

}
declare interface _0_sampledb_multimedia_document_Flatten {
    _id : ObjectId
    name : string
    size : number
    type : "document"

}
declare type _0_sampledb_multimedia_ = _0_sampledb_multimedia_image_|_0_sampledb_multimedia_video_|_0_sampledb_multimedia_document_ ;
declare type _0_sampledb_multimedia_Flatten = _0_sampledb_multimedia_image_Flatten|_0_sampledb_multimedia_video_Flatten|_0_sampledb_multimedia_document_Flatten ;

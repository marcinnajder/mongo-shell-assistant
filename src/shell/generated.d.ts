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
// localhost:27017 -> test2_new
declare interface _0__BaseDb extends Db {
    getSiblingDB(database: "test2_new"): _0_test2_new_;
}
declare interface _0_ {
    getDB(database: "test2_new"): _0_test2_new_;
}
declare interface _0_test2_new_ extends _0__BaseDb {
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

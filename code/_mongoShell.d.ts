/// <references path="./_all.d.ts" />

declare var mongoshell123;


//https://github.com/Microsoft/TypeScript/pull/12114
//https://github.com/Microsoft/TypeScript/pull/11929
declare function load(scriptFilePath:string);


/** @param databaseAddress for sample "localhost:27020/myDatabase" */
declare function connect(databaseAddress:string):Db;
declare function printjson(obj);

declare var bla123;

declare class Mongo {
    /** localhost:27017 (default host address)*/
    constructor();
    /** @param host "host:port?" */
    constructor(host: string);



    /**
     * Provides access to database objects from the mongo shell or from a JavaScript file.
     * @param databaseName The name of the database to access.
     * 
     * https://docs.mongodb.com/manual/reference/method/Mongo.getDB/#Mongo.getDB 
     * */
    getDB(databaseName:string):Db;
}



declare interface Db{

    /** 
     * Returns a collection object that is functionally equivalent to using the db.<collectionName> syntax. The method is useful for a collection whose name might interact with the shell itself, such as names that begin with _ or that match a database shell method.
     * https://docs.mongodb.com/manual/reference/method/db.getCollection/#db.getCollection
     * @param name 	The name of the collection.
     * 
    */
    getCollection(name: string):Collection_<any,any>;

    /**
     * Removes the current database, deleting the associated data files.
     * https://docs.mongodb.com/manual/reference/method/db.dropDatabase/#db.dropDatabase 
     */
    dropDatabase():void;

    /**
     * Returns the name of the current database.
     * https://docs.mongodb.com/manual/reference/method/db.getName/#db.getName
     */
    getName():string;

    /**show dbs, show databases */
    adminCommand(command:"listDatabases"):DatabasesInfo;

    /**
     * Returns an array containing the names of all collections in the current database.
     * https://docs.mongodb.com/manual/reference/method/db.getCollectionNames/
     */
    getCollectionNames():string[];


    /**
     * Provides access to the specified database.
     * https://docs.mongodb.com/manual/reference/method/db.getSiblingDB/#db.getSiblingDB
     * @param database	The name of a MongoDB database. 
     */
    getSiblingDB(database:string):Db;
    // getSiblingDB(databaseName:"test2"):Test2_Db;


    getUsers();

    //     db.adminCommand('listDatabases')
// use <db>	
// db = db.getSiblingDB('<db>')

// show users	
// db.getUsers()
// show roles	
// db.getRoles({showBuiltinRoles: true})
// show log <logname>	
// db.adminCommand({ 'getLog' : '<logname>' })
// show logs	
// db.adminCommand({ 'getLog' : '*' })
// it	
// cursor = db.collection.find()
// if ( cursor.hasNext() ){
//    cursor.next();
// }
}

type Projection<T> = {
    [P in keyof T]: boolean|1|0;
} & {
  $slice: number;
  $meta:"textScore"; 
}

type Query<T> = {
    [P in keyof T ]: {
        $nin:any[];
        $in:any[];
        $eq;$gt;$gte;$lt;$lte;$ne;
        $not;
        $exists: boolean;
        $type;
        $mod: [ number, number ];
        $regex: RegExp, $options;
        $text: { $search: string; $language: string; $caseSensitive: boolean; $diacriticSensitive: boolean };
        $where;
        $all:any[];$elemMatch: Query<T>;$size: number;
        // todo: Geospatial Query Operators¶
        // todo: Bitwise Query Operators
    } 
} & {
    [P in "$or"|"$and"|"$nor" ]: Query<T>[];
    // $or:Query<T>[];
    // $and:Query<T>[];
}

type Sorting<T> = {
    [P in keyof T]: -1|1;
}


// todo: https://docs.mongodb.com/manual/reference/write-concern/
declare interface WriteConcern{
}

declare interface InsertWriteConcernPatameter{
    /**A document expressing the write concern. Omit to use the default write concern. See Write Concern. */
    writeConcern?: WriteConcern;	
    /**
     * If true, perform an ordered insert of the documents in the array, and if an error occurs with one of documents, MongoDB will return without processing the remaining documents in the array.
     * If false, perform an unordered insert, and if an error occurs with one of documents, continue processing the remaining documents in the array.
     * Defaults to true. 
     */
    ordered?:  boolean	
}

/**https://docs.mongodb.com/manual/reference/method/WriteResult/#WriteResult.writeError */
declare interface WriteResult{
    hasWriteError():boolean;
    hasWriteConcernError():boolean;
    /**The number of documents inserted, excluding upserted documents. See WriteResult.nUpserted for the number of documents inserted through an upsert. */
    nInserted?:number;
    /**The number of documents selected for update. If the update operation results in no change to the document, e.g. $set expression updates the value to the current value, nMatched can be greater than nModified. */
    nMatched?:number;
    /**The number of existing documents updated. If the update/replacement operation results in no change to the document, such as setting the value of the field to its current value, nModified can be less than nMatched. */
    nModified?:number;
    /**The number of documents inserted by an upsert. */
    nUpserted?:number
    /** The _id of the document inserted by an upsert. Returned only if an upsert results in an insert. */
    _id:ObjectId;
    /**The number of documents removed. */
    nRemoved?:number;
    /**A document that contains information regarding any write concern errors encountered during the write operation. */
    writeConcernError?:{
        /**An integer value identifying the write concern error. */
        code:number;
        /**A description of the error. */
        errmsg:string;
        /** A document identifying the write concern setting related to the error.*/
        errInfo?;
    };
    /**A document that contains information regarding any error, excluding write concern errors, encountered during the write operation. */
    writeError?:{
        /**An integer value identifying the error. */
        code:number;
        /**A description of the error. */
        errmsg:string;
    }
}

/**https://docs.mongodb.com/manual/reference/method/BulkWriteResult/#BulkWriteResult */
declare interface BulkWriteResult {
    /**An array of documents that contains information for each document inserted through operations with the Bulk.find.upsert() option. */
    upserted?:{
        /**An integer that identifies the operation in the bulk operations list, which uses a zero-based index. */
        index:number;
        /**The _id value of the inserted document. */
        _id:ObjectId;
    }[];
    writeConcernError?:{
        /**An integer value identifying the cause of the write concern error. */
        code:number;
        /**A document identifying the write concern setting related to the error. */
        errInfo?:string;
        /**A description of the cause of the write concern error. */
        errmsg:string;
    };
    /**An array of documents that contains information regarding any error, unrelated to write concerns, encountered during the update operation. The writeErrors array contains an error document for each write operation that errors. */
    writeError?:{
        /**An integer that identifies the write operation in the bulk operations list, which uses a zero-based index. See also Bulk.getOperations(). */
        index:number
        /**An integer value identifying the error. */
        code:number;
        /**A document identifying the operation that failed. For instance, an update/replace operation error will return a document specifying the query, the update, the multi and the upsert options; an insert operation will return the document the operation tried to insert. */
        op;
    }[];
}

declare interface Collection_<T,TFlattend> extends Collection{

    /**
     * Returns one document that satisfies the specified query criteria. If multiple documents satisfy the query, this method returns the first document according to the natural order which reflects the order of documents on the disk. In capped collections, natural order is the same as insertion order. If no document satisfies the query, the method returns null
     * https://docs.mongodb.com/manual/reference/method/db.collection.findOne/
     * @param query Specifies query selection criteria using query operators.
     * @param projection Specifies the fields to return using projection operators. Omit this parameter to return all fields in the matching document.
     */
    findOne(query?:Query<TFlattend>, projection?:Projection<TFlattend>) : T|null;


    /**
     * Selects documents in a collection and returns a cursor to the selected documents.
     * https://docs.mongodb.com/manual/reference/method/db.collection.find/
     * @param query Specifies query selection criteria using query operators.
     * @param projection Specifies the fields to return using projection operators. Omit this parameter to return all fields in the matching document.
     */
    find(query?:Query<TFlattend>, projection?:Projection<TFlattend>) : Cursor_<T,TFlattend>; 

    /**
     * Inserts a document or documents into a collection.
     * https://docs.mongodb.com/manual/reference/method/db.collection.insert/
     * @param document A document or array of documents to insert into the collection. 
     */
    insert(document:T|T[], writeConcern?:InsertWriteConcernPatameter):WriteResult|BulkWriteResult;
    //insert(document:T[], writeConcern?:InsertWriteConcernPatameter):BulkWriteResult; // nie dziala wnioskowanie dla takiego zapisu

    /**
     * New in version 3.2.
     * https://docs.mongodb.com/manual/reference/method/db.collection.insertOne/
     * On error, insertOne() throws either a writeError or writeConcernError exception.
     */
    insertOne(document:T, writeConcern?:{writeConcern:WriteConcern}):{acknowledged:boolean;insertedId:any;};

    /**
     * New in version 3.2.
     * https://docs.mongodb.com/manual/reference/method/db.collection.insertMany/
     * On error, insertOne() throws either a writeError or writeConcernError exception.
     */
    insertMany(document:T[], writeConcern?:InsertWriteConcernPatameter):{acknowledged:boolean;insertedIds:any[];};



    // to projection?:Projection<T> nie chce zadzilac w miejscu gdzie z tego korzystamy, musimy podac konreny typ 
    //find(query?:Query<UserDb_Flatten>, projection?:Projection<UserDb_Flatten>) : Cursor_<T>;
}
declare interface Cursor{
    
}
declare interface Cursor_<T,TFlattened> extends Cursor{
    skip(count:number):this;
    limit(count:number):this;
    // skip(count:number):this;
    // limit(count:number):Cursor_<T>;
    sort(sort:Sorting<TFlattened>):this;
    toArray():T[];
}





//[ "str", "tojson", "valueOf", "isObjectId", "getTimestamp", "equals" ]



/**https://docs.mongodb.com/manual/reference/method/ObjectId/#ObjectId */
declare class ObjectId{
    constructor();
    constructor(value: string);
    str:string;
    getTimestamp():Date;
    valueoOf():string;
    /**	Returns the JavaScript representation in the form of a string literal “ObjectId(...)”. */
    toString():string;
}



declare interface Collection{
    count():number;
}
declare interface DatabasesInfo{
    databases: {
        name:string;
        sizeOnDisk:number;
        empty:boolean;
    }[];
    totalSize: number;
    ok:number;
}


// declare interface MongoInterface{
//     new() : MongoInterface;
//     /**
//      * @param host "host:port?"
//      */
//     new(host:string) : MongoInterface;
// }

//declare var Mongo : MongoInterface;


// db.help()                    help on db methods
// db.mycoll.help()             help on collection methods
// sh.help()                    sharding helpers
// rs.help()                    replica set helpers
// help admin                   administrative help
// help connect                 connecting to a db help
// help keys                    key shortcuts
// // help misc                    misc things to know
// // help mr                      mapreduce

// // show dbs                     show database names
// // show collections             show collections in current database
// // show users                   show users in current database
// // show profile                 show most recent system.profile entries with time >= 1ms
// // show logs                    show the accessible logger names
// // show log [name]              prints out the last segment of log in memory, 'global' is default
// // use <db_name>                set current database
// // db.foo.find()                list objects in collection foo
// // db.foo.find( { a : 1 } )     list objects in foo where a == 1
// // it                           result of the last line evaluated; use to further iterate
// // DBQuery.shellBatchSize = x   set default number of items to display on shell
// // exit                         quit the mongo shell


// /** To display the database you are using */
// declare var db;



// /**use <db_name> set current database */ 
// declare var use;
// /** quit the mongo shell */
// declare var exit;













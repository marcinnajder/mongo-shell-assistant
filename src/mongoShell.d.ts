/// <references path="./_all.d.ts" />


//https://github.com/Microsoft/TypeScript/pull/12114
//https://github.com/Microsoft/TypeScript/pull/11929
declare function load(scriptFilePath: string);


/** @param databaseAddress for sample "localhost:27020/myDatabase" */
declare function connect(databaseAddress: string): Db;
declare function printjson(obj);


declare var Mongo: Mongo;

declare interface Mongo {
    /** localhost:27017 (default host address)*/
    new (): Mongo;
    /** @param host "host:port?" */
    new (host: string): Mongo;



    /**
     * Provides access to database objects from the mongo shell or from a JavaScript file.
     * @param databaseName The name of the database to access.
     * 
     * https://docs.mongodb.com/manual/reference/method/Mongo.getDB/#Mongo.getDB 
     * */
    getDB(databaseName: string): Db;
}


declare interface Db {

    /**     
     * Returns a collection object that is functionally equivalent to using the db.<collectionName> syntax. The method is useful for a collection whose name might interact with the shell itself, such as names that begin with _ or that match a database shell method.
     * https://docs.mongodb.com/manual/reference/method/db.getCollection/#db.getCollection
     * @param name 	The name of the collection.
     * 
    */
    getCollection(name: string): Collection_<any, any>;

    /**
     * Copies a remote database to the current database. The command assumes that the remote database has the same name as the current database.
     * @param hostname 	The hostname of the database to copy.
     */
    cloneDatabase(hostname: string): void;
    /**
     * Removes the current database, deleting the associated data files.
     * https://docs.mongodb.com/manual/reference/method/db.dropDatabase/#db.dropDatabase 
     */
    dropDatabase(): void;
    /**
     * Displays help text for the specified database command. See the Database Commands. 
     * @param command The name of a database command.
    */
    commandHelp(command: string): void;
    /** *Copies a database to another database on the current host. Wraps copydb. */
    copyDatabase(fromdb: string, todb: string, fromhost?: string, username?: string, password?: string, mechanism?: string): void;

    /**Creates a new collection. Commonly used to create a capped collection. */
    createCollection(name: string, options?: CreateCollectionOptions): WriteResult;

    /**
     * Returns the name of the current database.
     * https://docs.mongodb.com/manual/reference/method/db.getName/#db.getName
     */
    getName(): string;

    /**show dbs, show databases */
    adminCommand(command: "listDatabases"): DatabasesInfo;

    /**
     * Returns an array containing the names of all collections in the current database.
     * https://docs.mongodb.com/manual/reference/method/db.getCollectionNames/
     */
    getCollectionNames(): string[];


    /**
     * Provides access to the specified database.
     * https://docs.mongodb.com/manual/reference/method/db.getSiblingDB/#db.getSiblingDB
     * @param database	The name of a MongoDB database. 
     */
    getSiblingDB(database: string): Db;
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


interface CreateCollectionOptions {
    capped?: boolean;
    autoIndexId?: boolean;
    size?: number;
    max?: number;
    storageEngine?: any;
    validator?: any;
    validationLevel?: "off" | "strict" | "moderate";
    validationAction?: "error" | "warn";
    indexOptionDefaults?: any;
}


type Projection<T> = {
    [P in keyof T]: boolean | 1 | 0;
} & {
        $slice: number;
        $meta: "textScore";
    }
// pick({name:marcin}, "marcin", "id") => 
type z = keyof string;

type Query<T> = {
    [P in keyof T]: {
        $nin: any[];
        $in: any[];
        $eq; $gt; $gte; $lt; $lte; $ne;
        $not;
        $exists: boolean;
        $type;
        $mod: [number, number];
        $regex: RegExp, $options;
        $text: { $search: string; $language: string; $caseSensitive: boolean; $diacriticSensitive: boolean };
        $where;
        $all: any[]; $elemMatch: Query<T>; $size: number;
        // todo: Geospatial Query Operators¶
        // todo: Bitwise Query Operators
    }
} & {
        [P in "$or" | "$and" | "$nor"]: Query<T>[];
        // $or:Query<T>[];
        // $and:Query<T>[];
    }

type Sorting<T> = {
    [P in keyof T]: -1 | 1;
}


// todo: https://docs.mongodb.com/manual/reference/write-concern/
declare interface WriteConcern {
}

declare interface InsertWriteConcernPatameter {
    /**A document expressing the write concern. Omit to use the default write concern. See Write Concern. */
    writeConcern?: WriteConcern;
    /**
     * If true, perform an ordered insert of the documents in the array, and if an error occurs with one of documents, MongoDB will return without processing the remaining documents in the array.
     * If false, perform an unordered insert, and if an error occurs with one of documents, continue processing the remaining documents in the array.
     * Defaults to true. 
     */
    ordered?: boolean
}

/**https://docs.mongodb.com/manual/reference/method/WriteResult/#WriteResult.writeError */
declare interface WriteResult {
    hasWriteError(): boolean;
    hasWriteConcernError(): boolean;
    /**The number of documents inserted, excluding upserted documents. See WriteResult.nUpserted for the number of documents inserted through an upsert. */
    nInserted?: number;
    /**The number of documents selected for update. If the update operation results in no change to the document, e.g. $set expression updates the value to the current value, nMatched can be greater than nModified. */
    nMatched?: number;
    /**The number of existing documents updated. If the update/replacement operation results in no change to the document, such as setting the value of the field to its current value, nModified can be less than nMatched. */
    nModified?: number;
    /**The number of documents inserted by an upsert. */
    nUpserted?: number
    /** The _id of the document inserted by an upsert. Returned only if an upsert results in an insert. */
    _id: ObjectId;
    /**The number of documents removed. */
    nRemoved?: number;
    /**A document that contains information regarding any write concern errors encountered during the write operation. */
    writeConcernError?: {
        /**An integer value identifying the write concern error. */
        code: number;
        /**A description of the error. */
        errmsg: string;
        /** A document identifying the write concern setting related to the error.*/
        errInfo?;
    };
    /**A document that contains information regarding any error, excluding write concern errors, encountered during the write operation. */
    writeError?: {
        /**An integer value identifying the error. */
        code: number;
        /**A description of the error. */
        errmsg: string;
    }
}

/**https://docs.mongodb.com/manual/reference/method/BulkWriteResult/#BulkWriteResult */
declare interface BulkWriteResult {
    /**An array of documents that contains information for each document inserted through operations with the Bulk.find.upsert() option. */
    upserted?: {
        /**An integer that identifies the operation in the bulk operations list, which uses a zero-based index. */
        index: number;
        /**The _id value of the inserted document. */
        _id: ObjectId;
    }[];
    writeConcernError?: {
        /**An integer value identifying the cause of the write concern error. */
        code: number;
        /**A document identifying the write concern setting related to the error. */
        errInfo?: string;
        /**A description of the cause of the write concern error. */
        errmsg: string;
    };
    /**An array of documents that contains information regarding any error, unrelated to write concerns, encountered during the update operation. The writeErrors array contains an error document for each write operation that errors. */
    writeError?: {
        /**An integer that identifies the write operation in the bulk operations list, which uses a zero-based index. See also Bulk.getOperations(). */
        index: number
        /**An integer value identifying the error. */
        code: number;
        /**A document identifying the operation that failed. For instance, an update/replace operation error will return a document specifying the query, the update, the multi and the upsert options; an insert operation will return the document the operation tried to insert. */
        op;
    }[];
}


declare interface CountOptions {
    /**The maximum number of documents to count. */
    limit?: number;
    /**The number of documents to skip before counting. */
    skip?: number;
    /** An index name hint or specification for the query. */
    hint?: string | any;
    /** The maximum amount of time to allow the query to run. */
    maxTimeMS?: number;
    /**Specifies the read concern */
    readConcern?: ReadConcernLevels;
}
declare interface Collection_<T, TFlattend> extends Collection {

    /**
     * Returns one document that satisfies the specified query criteria. If multiple documents satisfy the query, this method returns the first document according to the natural order which reflects the order of documents on the disk. In capped collections, natural order is the same as insertion order. If no document satisfies the query, the method returns null
     * https://docs.mongodb.com/manual/reference/method/db.collection.findOne/
     * @param query Specifies query selection criteria using query operators.
     * @param projection Specifies the fields to return using projection operators. Omit this parameter to return all fields in the matching document.
     */
    findOne(query?: Query<TFlattend>, projection?: Projection<TFlattend>): T | null;
    /**
     * Selects documents in a collection and returns a cursor to the selected documents.
     * https://docs.mongodb.com/manual/reference/method/db.collection.find/
     * @param query Specifies query selection criteria using query operators.
     * @param projection Specifies the fields to return using projection operators. Omit this parameter to return all fields in the matching document.
     */
    find(query?: Query<TFlattend>, projection?: Projection<TFlattend>): Cursor_<T, TFlattend>;
    /**Returns the count of documents that would match a find() query
     * @param query The query selection criteria.
     * @param options Extra options for modifying the count.
     */
    count(query: Query<TFlattend>, options?: CountOptions): number;
    /**
     * Inserts a document or documents into a collection.
     * https://docs.mongodb.com/manual/reference/method/db.collection.insert/
     * @param document A document or array of documents to insert into the collection. 
     */
    insert(document: T | T[], writeConcern?: InsertWriteConcernPatameter): WriteResult | BulkWriteResult;
    //insert(document:T[], writeConcern?:InsertWriteConcernPatameter):BulkWriteResult; // nie dziala wnioskowanie dla takiego zapisu
    /**
     * New in version 3.2.
     * https://docs.mongodb.com/manual/reference/method/db.collection.insertOne/
     * On error, insertOne() throws either a writeError or writeConcernError exception.
     */
    insertOne(document: T, writeConcern?: { writeConcern: WriteConcern }): { acknowledged: boolean; insertedId: any; };
    /**
     * New in version 3.2.
     * https://docs.mongodb.com/manual/reference/method/db.collection.insertMany/
     * On error, insertOne() throws either a writeError or writeConcernError exception.
     */
    insertMany(document: T[], writeConcern?: InsertWriteConcernPatameter): { acknowledged: boolean; insertedIds: any[]; };
    /**Calculates aggregate values for the data in a collection.
     * @param pipeline A sequence of data aggregation operations or stages. 
     * @param options Optional. Additional options that aggregate() passes to the aggregate command.
    */
    aggregate(pipeline: AggregationPipelineOperator[], options?: AggregationOptions): Cursor_<T, TFlattend>;
    /**Removes a single document from a collection.
     * @param fitler Specifies deletion criteria using query operators.
     * @param options options
     */
    deleteOne(filter: Query<TFlattend>, options?: DeleteOptions): DeleteResult;
    /** Removes all documents that match the filter from a collection.
     * @param fitler Specifies deletion criteria using query operators.
     * @param options options
     */
    deleteMany(filter: Query<TFlattend>, options?: DeleteOptions): DeleteResult;
    // to projection?:Projection<T> nie chce zadzilac w miejscu gdzie z tego korzystamy, musimy podac konreny typ 
    //find(query?:Query<UserDb_Flatten>, projection?:Projection<UserDb_Flatten>) : Cursor_<T>;
    /**Finds the distinct values for a specified field across a single collection and returns the results in an array.
     * @param field The field for which to return distinct values.
     * @param query A query that specifies the documents from which to retrieve the distinct values.
     */
    distinct(field: keyof TFlattend, filter: Query<TFlattend>, options?: ReadOptions): any[];
    /** Returns information on the query plan for the following operations: aggregate(); count(); distinct(); find(); group(); remove(); and update() methods.*/
    explain(verbosity: "queryPlanner" | "executionStats" | "allPlansExecution"): this;
    /**Modifies and returns a single document. By default, the returned document does not include the modifications made on the update. To return the document with the modifications made on the update, use the new option. The findAndModify() method is a shell helper around the findAndModify command. */
    findAndModify(param: FindAndModifyParameters<TFlattend>): T | null;
    /** Deletes a single document based on the filter and sort criteria, returning the deleted document.*/
    findOneAndDelete(filter: Query<TFlattend>, options?: ModificationBaseOptions<TFlattend>): T | null;
    /**Modifies and replaces a single document based on the filter and sort criteria. 
     *Returns either the original document or, if returnNewDocument: true, the replacement document.
    */
    findOneAndReplace(filter: Query<TFlattend>, replacement: any, options?: FindOneAndReplaceOptions<TFlattend>): T | null;
    /** Updates a single document based on the filter and sort criteria.*/
    findOneAndUpdate(filter: Query<TFlattend>, update: any, options?: FindOneAndReplaceOptions<TFlattend>): T | null;
    /**Returns an array that holds a list of documents that identify and describe the existing indexes on the collection.  */
    getIndexes(): any[];
    /** Prints the data distribution statistics for a sharded collection. You must call the getShardDistribution() method on a sharded collection, as in the following example: db.myShardedCollection.getShardDistribution()*/
    getShardDistribution(): void;
    /**todo:*/
    mapReduce();
    /**Replaces a single document within the collection based on the filter. */
    replaceOne(filter: Query<TFlattend>, replacement: any, options?: { upsert?: boolean, writeConcern?: WriteConcern, collation?: any }): {
        acknowledged: boolean;
        matchedCount: number;
        modifiedCount: number;
        upsertedId: ObjectId;
    };
    /**Removes documents from a collection. */
    remove(query: Query<TFlattend>, justOne?: boolean): WriteResult;
    remove(query: Query<TFlattend>, options?: { justOne?: boolean; writeConcern?: WriteConcern, collation?: any }): WriteResult;
    /**
     * Renames a collection. Provides a wrapper for the renameCollection database command.
     * @param target The new name of the collection. Enclose the string in quotes.
     * @param dropTarget If true, mongod drops the target of renameCollection prior to renaming the collection. The default value is false.
     */
    renameCollection(target: string, dropTarget?: boolean): void;
    /**Updates an existing document or inserts a new document, depending on its document parameter. */
    save(document: T, options: { writeConcern?: WriteConcern }): WriteResult;
    /**Updates a single document within the collection based on the filter.*/
    update(query: Query<TFlattend>, update: Update<TFlattend>, options: { upsert?: boolean; writeConcern: WriteConcern; collation: any; multi?: boolean; }): WriteResult;
    /**Updates a single document within the collection based on the filter.*/
    updateOne(query: Query<TFlattend>, update: Update<TFlattend>, options: { upsert?: boolean; writeConcern: WriteConcern; collation: any; }): WriteResult;
    /**Updates multiple documents within the collection based on the filter.*/
    updateMany(query: Query<TFlattend>, update: Update<TFlattend>, options: { upsert?: boolean; writeConcern: WriteConcern; collation: any; }): WriteResult;
    /**Validates a collection. The method scans a collection’s data structures for correctness and returns a single document that describes the relationship between the logical collection and the physical representation of the data.
     * @param full Specify true to enable a full validation and to return full statistics. MongoDB disables full validation by default because it is a potentially resource-intensive operation.
    */
    validate(full?: boolean): any;
}

/**https://docs.mongodb.com/manual/reference/operator/update/ */
declare type Update<TFlattened> = /*T |*/ {
    /**The $set operator replaces the value of a field with the specified value. */
    $set: {[P in keyof TFlattened]: any; };
    /**The $unset operator deletes a particular field. */
    $unset: {[P in keyof TFlattened]: ""; };
    /**Increments the value of the field by the specified amount. */
    $inc: {[P in keyof TFlattened]: number; };
    /**Multiplies the value of the field by the specified amount. */
    $mul: {[P in keyof TFlattened]: number; };
    /**Only updates the field if the specified value is less than the existing field value. */
    $min: {[P in keyof TFlattened]: number; };
    /**Only updates the field if the specified value is greater than the existing field value. */
    $max: {[P in keyof TFlattened]: number; };
    /**The $rename operator updates the name of a field */
    $rename: {[P in keyof TFlattened]: string; };
    /**Sets the value of a field to current date, either as a Date or a Timestamp. */
    $currentDate: {[P in keyof TFlattened]: true | { $type: "timestamp" | "date" }; };
    /**Sets the value of a field if an update results in an insert of a document. Has no effect on update operations that modify existing documents. */
    $setOnInsert: {[P in keyof TFlattened]: any; };

    /**Adds elements to an array only if they do not already exist in the set. */
    $addToSet: {[P in keyof TFlattened]: { $each: any[] }; };
    /** Removes the first or last item of an array. */
    $pop: {[P in keyof TFlattened]: any; };
    /** Removes all matching values from an array. */
    $pullAll: {[P in keyof TFlattened]: any; };
    /** Removes all array elements that match a specified query. */
    $pull: {[P in keyof TFlattened]: any; };
    /**Deprecated. Adds several items to an array. */
    $pushAll: {[P in keyof TFlattened]: any  };
    /** Adds an item to an array. */
    $push: {[P in keyof TFlattened]: { $each: any[]; $slice; $sort; $position; }; };

    /**Performs bitwise AND, OR, and XOR updates of integer values. */
    $bit: {[P in keyof TFlattened]: { and; or; xor; }  };
}

declare interface ModificationBaseOptions<TFlattend> {
    /** Specifies a time limit in milliseconds for processing the operation. */
    maxTimeMS?: number;
    /** Specifies the collation to use for the operation. */
    collation?: any;
    /** Determines which document the operation modifies if the query selects multiple documents. findAndModify() modifies the first document in the sort order specified by this argument. */
    sort?: Sorting<TFlattend>;
}
declare interface FindOneAndDeleteOptions<TFlattend> extends ModificationBaseOptions<TFlattend> {
    /**To return all fields in the returned document, omit this parameter. */
    projection?: Projection<TFlattend>;
}
declare interface FindAndModifyParameters<TFlattend> extends ModificationBaseOptions<TFlattend> {
    /**The selection criteria for the modification. The query field employs the same query selectors as used in the db.collection.find() method. Although the query may match multiple documents, findAndModify() will only select one document to modify. */
    query?: Query<TFlattend>;
    /**Must specify either the remove or the update field. Removes the document specified in the query field. Set this to true to remove the selected document . The default is false. */
    remove: boolean;
    /**todo: Must specify either the remove or the update field. Performs an update of the selected document. The update field employs the same update operators or field: value specifications to modify the selected document. */
    update: Update<TFlattend>;
    /** When true, returns the modified document rather than the original. The findAndModify() method ignores the new option for remove operations. The default is false. */
    new?: boolean;

    fields?: Projection<TFlattend>;
    /** Used in conjuction with the update field. When true, findAndModify() either:
    Creates a new document if no documents match the query. For more details see upsert behavior.
    Updates a single document that matches the query.
    To avoid multiple upserts, ensure that the query fields are uniquely indexed.*/
    upsert?: boolean;
    /**  Enables db.collection.findAndModify to bypass document validation during the operation. This lets you update documents that do not meet the validation requirements.*/
    bypassDocumentValidation?: boolean;
    /**A document expressing the write concern. Omit to use the default write concern. */
    writeConcern?: WriteConcern;
}

declare interface FindOneAndReplaceOptions<TFlattend> {
    projection?: Projection<TFlattend>,
    sort?: Sorting<TFlattend>,
    maxTimeMS?: number
    upsert?: any,
    returnNewDocument?: boolean;
    collation?: any;
}

declare interface ReadOptions {
    collation?: any;
}
declare interface DeleteOptions {
    writeConcern?: any;
    collation?: any;
}
declare interface DeleteResult {
    acknowledged: boolean;
    deletedCount: number;
}


/** https://docs.mongodb.com/manual/reference/method/js-cursor/ */
declare interface Cursor {
    /**Returns true if the cursor has documents and can be iterated. */
    hasNext(): boolean;
    /**
     * Modifies the cursor to return the number of documents in the result set rather than the documents themselves. 
     * @param  applySkipLimit Specifies whether to consider the effects of the cursor.skip() and cursor.limit() methods in the count.
    */
    count(applySkipLimit?: boolean): number;
    /**Counts the number of documents remaining in a cursor. itcount() is similar to cursor.count(), but actually executes the query on an existing iterator, exhausting its contents in the process. */
    itcount(): number;
    /**Instructs the server to close a cursor and free associated server resources. The server will automatically close cursors that have no remaining results, as well as cursors that have been idle for a period of time and lack the cursor.noCursorTimeout() option. */
    close(): any;
    /**Provides information on the query plan for the db.collection.find() method. */
    explain(): ExplainResult; // queryPlanner by default
    explain(verbose: "queryPlanner"): ExplainResult;
    explain(verbose: "executionStats"): ExplainResult;
    explain(verbose: "allPlansExecution"): ExplainResult;
    /**returns the number of documents remaining in the current batch. */
    objsLeftInBatch(): number;
}
declare interface Cursor_<T, TFlattened> extends Cursor {
    /**Returns the next document in a cursor. */
    next(): T;
    /**
     * Call the cursor.skip() method on a cursor to control where MongoDB begins returning results. This approach may be useful in implementing “paged” results.
     */
    skip(count: number): this;
    /**Use the limit() method on a cursor to specify the maximum number of documents the cursor will return. limit() is analogous to the LIMIT statement in a SQL database. */
    limit(count: number): this;
    /**Specifies the order in which the query returns matching documents. You must apply sort() to the cursor before retrieving any documents from the database. 
     * @param document A document that defines the sort order of the result set.
    */
    sort(document: Sorting<TFlattened>): this;
    /**The toArray() method returns an array that contains all the documents from a cursor. The method iterates completely the cursor, loading all the documents into RAM and exhausting the cursor. */
    toArray(): T[];
    /**Instructs the server to avoid closing a cursor automatically after a period of inactivity. */
    noCursorTimeout(): this;
    /**
     * Specifies the number of documents to return in each batch of the response from the MongoDB instance. 
     * @param size The number of documents to return per batch. Do not use a batch size of 1.
     */
    batchSize(size: number): this;
    /**Adds OP_QUERY wire protocol flags, such as the tailable flag, to change the behavior of queries.
     * @param flag OP_QUERY wire protocol flag. For the mongo shell, you can use the cursor flags listed below. For the driver-specific list, see your driver documentation.
     */
    addOption(flag: OptionsFlag): this;
    /**Configures the cursor to display results in an easy-to-read format. */
    pretty(): this;
    /** Append the snapshot() method to a cursor to toggle the “snapshot” mode. This ensures that the query will not return a document multiple times, even if intervening write operations result in a move of the document due to the growth in document size.*/
    snapshot(): this;
    /**Iterates the cursor to apply a JavaScript function to each document from the cursor. 
     * @param action A JavaScript function to apply to each document from the cursor. The <function> signature includes a single argument that is passed the current document to process.
    */
    forEach(action: (item: T) => void): void;
    /**Applies function to each document visited by the cursor and collects the return values from successive application into an array.
     * @param selector A function to apply to each document visited by the cursor.
    */
    map<TResult>(selector: (item: T) => TResult): TResult[];
    /**Adds a comment field to the query. comment() associates a comment string with the find operation. This can make it easier to track a particular query in the following diagnostic outputs: The system.profile, The QUERY log component, db.currentOp()
     * @param comment The comment to apply to the query.
     */
    comment(comment: string): this;
    /**Marks the cursor as tailable. For use against a capped collection only. Using tailable against a non-capped collection will return an error.*/
    tailable(option: { isAwaitData: boolean }): this;
}


/** https://docs.mongodb.com/manual/reference/explain-results */
interface ExplainResult {
    //todo
}

declare var DBQuery: DBQuery;
declare interface OptionsFlag {
}
declare interface DBQuery {
    Options: {
        /**Sets the cursor not to close once the last data is received, allowing the query to continue returning data added after the initial results were exhausted. */
        tailable: OptionsFlag;
        /** Allows querying of a replica slave.*/
        slaveOk: OptionsFlag;
        /** Prevents the server from timing out idle cursors.*/
        noTimeout: OptionsFlag;
        /** For use with .. data:: DBQuery.Option.tailable; sets the cursor to block and await data for a while rather than returning no data. The cursor will return no data once the timeout has expired.*/
        awaitData: OptionsFlag;
        /** Sets the cursor to return all data returned by the query at once rather than splitting the results into batches.*/
        exhaust: OptionsFlag;
        /** Sets the cursor to return partial data from a query against a sharded cluster in which some shards do not respond rather than throwing an error.*/
        partial: OptionsFlag;
    }
}




//[ "str", "tojson", "valueOf", "isObjectId", "getTimestamp", "equals" ]



/**https://docs.mongodb.com/manual/reference/method/ObjectId/#ObjectId */
declare class ObjectId {
    constructor();
    constructor(value: string);
    str: string;
    getTimestamp(): Date;
    valueoOf(): string;
    /**	Returns the JavaScript representation in the form of a string literal “ObjectId(...)”. */
    toString(): string;
}


declare type ReadConcernLevels = "local" | "majority" | "linearizable";

// todo
/**https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline/ */
declare type AggregationPipelineOperator =
    {
        "$collStats"?: any;
        "$project"?: any;
        "$match"?: any;
        "$redact"?: any;
        "$limit"?: number;
        "$skip"?: number;
        "$unwind"?: any;
        "$group"?: any;
        "$sample"?: any;
        "$sort"?: any;
        "$geoNear"?: any;
        "$lookup"?: any;
        "$out"?: any;
        "$indexStatus"?: any;
        "$facet"?: any;
        "$bucket"?: any;
        "$bucketAuto"?: any;
        "$sortByCount"?: any;
        "$addFields"?: any;
        "$replaceRoot"?: any;
        "$count"?: any;
        "$graphLookup"?: any
    };
// { "$collStats": any;
// { "$project": any } |
// { "$match": any } |
// { "$redact": any } |
// { "$limit": number } |
// { "$skip": number } |
// { "$unwind": any } |
// { "$group": any } |
// { "$sample": any } |
// { "$sort": any } |
// { "$geoNear": any } |
// { "$lookup": any } |
// { "$out": any } |
// { "$indexStatus": any } |
// { "$facet": any } |
// { "$bucket": any } |
// { "$bucketAuto": any } |
// { "$sortByCount": any } |
// { "$addFields": any } |
// { "$replaceRoot": any } |
// { "$count": any } |
// { "$graphLookup": any };


declare interface AggregationOptions {
    /** Specifies to return the information on the processing of the pipeline.*/
    explain?: boolean;
    /** Enables writing to temporary files. When set to true, aggregation operations can write data to the _tmp subdirectory in the dbPath directory*/
    allowDiskUse?: boolean;
    /** Specifies the initial batch size for the cursor. The value of the cursor field is a document with the field batchSize*/
    cursor?: any;
    /** Available only if you specify the $out aggregation operator. Enables db.collection.aggregate to bypass document validation during the operation. This lets you insert documents that do not meet the validation requirements.*/
    bypassDocumentValidation?: boolean;
    /**Specifies the read concern.  */
    readConcern?: {
        level: ReadConcernLevels;
    };
    /**Specifies the collation to use for the operation. */
    collation?: any; // todo
}

declare interface Collection {
    /**todo */
    bulkWrite();    //todo
    /**Copies all documents from collection into newCollection using server-side JavaScript. If newCollection does not exist, MongoDB creates it. */
    copyTo(newCollection: string): number;
    /**todo */
    createIndex();
    /** The size of the collection. This method provides a wrapper around the size output of the collStats (i.e. db.collection.stats()) command.*/
    dataSize(): number;
    /**Removes a collection or view from the database. The method also removes any indexes associated with the dropped collection. The method provides a wrapper around the drop command. */
    drop(): boolean;
    /**Drops or removes the specified index from a collection */
    dropIndex(index: string | any): void;
    /**Drops all indexes other than the required index on the _id field. Only call dropIndexes() as a method on a collection object. */
    dropIndexes(): void;
    /**todo */
    ensureIndexes(keys, options): void;
    /**Returns true if the collection is a capped collection, otherwise returns false. */
    isCapped(): boolean;
    /** The db.collection.reIndex() drops all indexes on a collection and recreates them. This operation may be expensive for collections that have a large amount of data and/or a large number of indexes.*/
    reIndex(): void;
    /**todo */
    stats();
    /**The total amount of storage allocated to this collection for document storage. Provides a wrapper around the storageSize field of the collStats (i.e. db.collection.stats()) output. */
    storageSize(): number;
    /**The total size in bytes of the data in the collection plus the size of every indexes on the collection. */
    totalSize(): number;
    /**The total size of all indexes for the collection. This method provides a wrapper around the totalIndexSize output of the collStats (i.e. db.collection.stats()) operation. */
    totalIndexSize(): number;
}
declare interface DatabasesInfo {
    databases: {
        name: string;
        sizeOnDisk: number;
        empty: boolean;
    }[];
    totalSize: number;
    ok: number;
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













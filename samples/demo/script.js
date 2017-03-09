/// <reference path="./msa.metadata.d.ts" />

var db = new Mongo("localhost:27017").getDB("msasample");
print(db.getCollectionNames());

var data = db.getCollection("users").find({}, {login:1,isActive:1 }).limit(10).toArray();
printjson(data);

var data = db.users.find({roles : {$in : ["admin"]}}, {login:1,isActive:1 }).limit(10).toArray();
printjson(data);

var multimedia = db.multimedia.find().toArray();

for(var item of multimedia){
    if(item.type === "video"){
        print(item.name ," ----> ", item.duration)
    }
}


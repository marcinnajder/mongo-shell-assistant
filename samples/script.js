/// <reference path="./../src/mongoShell.d.ts" />
/// <reference path="./msa.metadata.d.ts" />
/// <reference path="./../dist/src/s.d.ts" />


var msasampledb = new Mongo("localhost:27017").getDB("msasample");
var users = [
        { login: "john", roles: ["admin"], isActive: true },
        { login: "steve", roles: ["editor"], isActive: false },
];
var multimedia = [

        { name: "flower.jpg", size: 100, type: "image", imageSize: { width: 50, height: 50 } },
        { name: "sun.jpg", size: 200, type: "image", imageSize: { width: 500, height: 50 } },

        { name: "presentation.mp4", size: 100000, type: "video", duration: 60 },
        { name: "mydoc.pdf", size: 150, type: "document" }
];
msasampledb.users.insertMany(users);
msasampledb.multimedia.insertMany(multimedia);
msasampledb.copyDatabase("msasample", "msasamplecopy");





load("dist/src/s.js");


var data = new Mongo("localhost:27017").getDB("test2").users.find({}, { "name": 1 }).count();
print(s.dump(data));


// var mongo = new Mongo().getDB().getUsers
// var db = new Mongo("localhost:27017").getDB("test2").users.updateOne()




// //db.users.find({ $or: [{ login: "admin" }, { login: "redaktor" }] }, { name: 1, login: 1 }).toArray();
// var res = db.users.find({ $or: [{ login: "admin" }, { login: "redaktor" }] }, { name: 1, login: 1 });


// var aaa = res.limit(1).toArray()[0];
// aaa.login



// // zapytania

// var users = new Mongo("localhost:27017").getDB("test2").users.find({}, { login: 1, name: 1 }).toArray();

// printjson(users);

// s.dump(users);

// for (var user of users) {  
//         print(user._id, user.name);  
// }





//var cur = new Mongo("").getDB("test2").users.find({}, {});

// kursory
var cur = new Mongo("localhost:27017").getDB("test2").users.find({}, {});
//(cur = cur.skip(2).limit(2), undefined)
// cur

var i = 0;
while (cur.hasNext()) {
        var doc = cur.next();
        print(i++, doc.name);
}

cur.count(true);











// while(cursor.hasNext()){
// 	var doc = cursor.next();
// 	if(doc.Referrer === null){
// 		delete doc.Referrer;
// 	}
// 	else{
// 		for(var j = 0; j < doc.PaymentInfos.length; j++){
// 			doc.PaymentInfos[j].PartnerCommission = 0.2 * doc.PaymentInfos[j].Amount;
// 		}
// 	}

// 	db.payments.save(doc);
// }







////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////

// var mongo = new Mongo("localhost:27017");
// var sampledbDatabase = mongo.getDB("sampledb");
// var multimediaCollection = sampledbDatabase.getCollection("multimedia");


// var data = multimediaCollection.find({}, {}).toArray();

// for (var m of data) {
//         if (m.type === "video") {
//                 print(m.duration);
//         }
//         else if (m.type === "image") {
//                 print(m.imageHeight);
//         }
// }


// var multimedia = [
//         { name: "flower.jpg", size: 100, type: "image", imageWidth: 50, imageHeight: 5 },
//         { name: "presentation.mp4", size: 100000, type: "video", duration: 60 },
//         { name: "mydoc.pdf", size: 150, type: "document" }
// ];
// multimediaCollection.insertMany(multimedia);


// var mongo = new Mongo("localhost:27017");
// var sampledbDatabase = mongo.getDB("sampledb");
// var multimediaCollection = sampledbDatabase.getCollection("multimedia");

// var multimedia = [
//         { name: "flower.jpg", size: 100, type: "image", imageWidth: 50, imageHeight: 5 },
//         { name: "presentation.mp4", size: 100000, type: "video", duration: 60 },
//         { name: "mydoc.pdf", size: 150, type: "document" }
// ];
// multimediaCollection.insertMany(multimedia);

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////







//var con = new Mongo("1").getDB("test4").users;


















// db.getCollection("alltypes").insert({
//         _string:"string",
//         _binData:BinData(1,"ABCD"),
//         _timestamp:Timestamp(0,0),
//         _date:new Date(),
//         _regex: new RegExp(""),
//         _idd: ObjectId(),
//         _undefined: undefined,
//         _minKey : MinKey(),
//         _maxKey : MaxKey(),
//         _numberInt:NumberInt(),
//         _numberLong:NumberLong(),
//         _null:null,
//         _boolean: true,
//         _double: 1123.123,
//         _int__: 1123,
//         _object : {},
//         _array: [],
//         _symbol:Symbol(),
//         _dbref: DBRef,
// });

// printjson( db.getCollection("alltypes").findOne() )

// JavaScript	13	“javascript”	 
// JavaScript (with scope)	15	“javascriptWithScope”



// dump(db.getCollection("users").find(). limit(12).sort({expirationDate:1}).toArray().map(x => ({login:x.login, name:x.name}) ))
// dump(db.getCollection("users").find(). limit(12).sort({expirationDate}).toArray().map(x => ({login:x.login, name:x.name}) ))


// //var user = e.usersDoc();
// var res = db.fake.insertMany(aa);
// // var db = con.getDB("ahop_prod");
// var res = db.fake.insertMany([
//         {
//                 name:"marcin",
//                 address:{
//                         city:"wroclaw"
//                 }
//         },
//         {
//                 name:"marcin",
//                 address:{
//                         city:"wroclaw"
//                 }
//         }

//         ]);
// dump(db.fake.find().toArray());




//printjson(db.users.findOne({login: "pacjent@comarch.pl"}, {"patientProfile.email":1}));






// var users = db.users
//         .find(
//                 {
//                         $or : [
//                                 {
//                                 }
//                         ]
//                 }, 
//                 {
//                 firstLogin:1,
//                         "patientProfile.address.city": 1
//                 })
//         .sort({name:-1})
//         .limit(20)
//         .toArray();









// policznie ilosci conetnItemow na poszczegolych srodowuskah

// print("TEST");
// var db2 = con.getDB("ahop_test");
// var res2 =  db2.contentItems.find().count();
// print(res2);

// print("PROD");
// var db = con.getDB("ahop_prod");
// var res =  db.contentItems.find().count();
// print(res);



// // zliczenie contentItemow per typ
// var res2 =  db2.contentItems.find({},{type:1}).toArray();
// //dump(res2);
// contentItemsPerType(res2)

// var res =  db.contentItems.find({},{type:1}).toArray();
// //dump(res);
// contentItemsPerType(res)



// function contentItemsPerType(items){
//     return  items.reduce( (p,c) => (p[c.type] = (p[c.type] || 0) +1,p) , {});
// }


// // zestawienie uslug lub lekarzy
// var citype = "service";
// var res =  db.contentItems.find({type:citype},{name:1, hisId:1}).toArray();
// dump(res);

// var res2 =  db2.contentItems.find({type:citype},{name:1, hisId:1}).toArray();
// dump(res2);

// function compareCollection(a,b){

// }












// var res =  db.tickets.find().toArray();
// res= res.map( x => x.data);
// dump(res);

//var res = db.users.find({permissions:{ $not: {$size:0} }},{login:1, creationDate:1, permissions:1}).sort({creationDate:1}).toArray();
// var res = db.users.find({},{}).sort({creationDate:1}).toArray();
// printjson(res[5]);
// dump(res.map(x => ({patientHisId: (x.patientProfile || {}).patientHisId, roles: x.roles.join()}) ));


// res.map( x => x.).dump();




/*

TODO: sprawdzic nawet teraz jak maja sie idki w concierge do tych w HIS (na testowym srodowisku)
 

albums,configs,contentItems,entities,entitiesHistory,files,migrations,previews,sections,sessions,

surveyresults,tickets,users


users
- ok, bo nie maja ustawionych zadnych permissions

tickets
- czy jesli w ticketah nie ma country i region to aplikacja sie nie wywali podczas aktywowania konta???

surveyresults
- czy zmienila sie definicja ankiety ??, nawet jesli to jest wersjonowania :) 



--------------


album
files
sections
- z test




configs
- sa 3 cancelReasons, mailings, profileRedirect
- trzeba ustawic contentItemId dla profileRedirect

entities
entitiesHistory

- type: survey, agreements, terms, userprofile
- IDki ankiety czy profili i tak sa stale, takie same co byly, co najwyzeh doszly jakies nowe 


- zestanie ilosc conetnItemow per typ

test:PRIMARY> contentItemsPerType(res2)
{
        "page" : 25,
        "group" : 7,
        "blog" : 1,
        "doctor" : 41,
        "article" : 13,
        "service" : 62
}
test:PRIMARY> contentItemsPerType(res)
{
        "page" : 15,
        "group" : 3,
        "blog" : 1,
        "doctor" : 10,
        "article" : 13,
        "service" : 13
}


- wszystkie uslugi i lekarze z produkcji takze sa na testowym :)


total: 13
_id                      | name                              | hisId
------------------------ | --------------------------------- | -----
56cece1ab5c6c6202db0c206 | Echokardiografia (in. echo ser... | 8181
56ced4c269c631c43ac7616c | Test wysiłkowy                    | 8186
56cef8039712a01027c2c0ca | Holter EKG                        | 8182
56cefc8cae664d101156ce3e | Holter RR                         | 8183
56cefd2e9712a01027c2c0cc | Konsultacja kardiologiczna + b... | 8184
56cefe737772b7dc210122cd | EKG (bez konsultacji)             | 8189
56cf09df7772b7dc210122d1 | Konsultacja kardiologiczna dzi... | 8185
56cf100f40134d3c2d5b8876 | Echokardiografia (in. echo ser... | 8190
56cf1081992f0a5c146ea0c4 | Konsultacje kardiologiczne dla... | 8188
56d6b028556f9a4c08d88166 | Badanie polisomnograficzne        | 8187
56d73c7558f34ec42562bb1e | EKG dla dzieci (bez konsultacj... | 8191
57874500dc486e2811130a1a | USG tętnic kończyn dolnych        | 8245
57b48d48a9f4e95c2778b9f5 | Konsultacja chirurga naczyniow... | 8241

test:PRIMARY>
test:PRIMARY> var res2 =  db2.contentItems.find({type:citype},{name:1, hisId:1}).toArray();
test:PRIMARY> dump(res2);
total: 62
_id                      | name                              | hisId
------------------------ | --------------------------------- | -----
56cece1ab5c6c6202db0c206 | Echokardiografia (in. echo ser... | 8181
56ced4c269c631c43ac7616c | Test wysiłkowy                    | 8186
56cef8039712a01027c2c0ca | Holter EKG                        | 8182
56cefc8cae664d101156ce3e | Holter RR                         | 8183
56cefd2e9712a01027c2c0cc | Konsultacja kardiologiczna + b... | 8184
56cefe737772b7dc210122cd | EKG (bez konsultacji)             | 8189
56cf09df7772b7dc210122d1 | Konsultacja kardiologiczna dzi... | 8185
56cf100f40134d3c2d5b8876 | Echokardiografia (in. echo ser... | 8190
56cf1081992f0a5c146ea0c4 | Konsultacje kardiologiczne dla... | 8188
56d6b028556f9a4c08d88166 | Badanie polisomnograficzne        | 8187
56d73c7558f34ec42562bb1e | EKG dla dzieci (bez konsultacj... | 8191
57874500dc486e2811130a1a | USG tętnic kończyn dolnych        | 8245
57b48c73a9e95d141732175a | Konsultacja chirurga naczyniow... | 8241
57b599667639fb8814e6f2e2 | Konsultacja kardiochirurgiczna    | 8242
57b59b5fa2a984841a2235ec | Konsultacja reumatologiczna       | 8284
57b59d25eea3bc7c1ba69f9b | Konsultacja neurologiczna         | 8285
57b59da6d26dd0281942f6fc | USG tętnic szyjnych               | 8247
57b59e5a7639fb8814e6f2e9 | USG tętnic kończyn górnych        | 8246
57b59ecf7639fb8814e6f2ea | USG żył kończyn dolnych           | 8248
57b59f217639fb8814e6f2ec | USG żył kończyn górnych           | 8286
57b59f5bd26dd0281942f6ff | USG jamy brzusznej                | 8244
57b59fd6d26dd0281942f700 | Kontrola stymulatorów             | 8243
57b726ada8cc138c085e6403 | MR serca z kontrastem             | 8347
57b726b328a8a9d80c64f3aa | MR serca bez kontrastu            | 8346
57b726b84e9b183c136d82b3 | RM angiografia z środkiem kont... | 8385
57b726bc28a8a9d80c64f3ab | RM angiografia bez środka kont... | 8384
57b726c0a8cc138c085e6404 | RM innej okolicy anatomicznej ... | 8383
57b726c3a8cc138c085e6405 | RM innej okolicy anatomicznej ... | 8382
57b726c728a8a9d80c64f3ac | RM okolicy anatomicznej bez ko... | 8381
57b726cb28a8a9d80c64f3ad | RM okolicy anatomicznej bez ko... | 8380
57b726d0a8cc138c085e6406 | RM okolicy anatomicznej bez ko... | 8379
57b726d528a8a9d80c64f3ae | RM okolicy anatomicznej bez ko... | 8378
57b726d97b611ce415b82f3c | RM okolicy anatomicznej bez ko... | 8377
57b726de28a8a9d80c64f3af | RM okolicy anatomicznej bez ko... | 8376
57b726e1a8cc138c085e6407 | RM okolicy anatomicznej bez ko... | 8375
57b726e57b611ce415b82f3d | RM okolicy anatomicznej z kont... | 8374
57b726e94e9b183c136d82b4 | RM okolicy anatomicznej z kont... | 8373
57b726ed7b611ce415b82f3e | RM okolicy anatomicznej z kont... | 8372
57b726f0a8cc138c085e6408 | RM okolicy anatomicznej z kont... | 8371
57b726f47b611ce415b82f3f | RM okolicy anatomicznej z kont... | 8370
57b726f74e9b183c136d82b5 | RM okolicy anatomicznej z kont... | 8369
57b726fb7b611ce415b82f40 | RM okolicy anatomicznej z kont... | 8368
57b726ff4e9b183c136d82b6 | RM trzy odcinki kręgosłupa z ś... | 8367
57b7270328a8a9d80c64f3b0 | RM trzy odcinki kręgosłupa bez... | 8366
57b727084e9b183c136d82b7 | RM dwa odcinki kręgosłupa z śr... | 8365
57b7270b7b611ce415b82f41 | RM dwa odcinki kręgosłupa bez ... | 8364
57b7270f4e9b183c136d82b8 | RM cały kręgosłup bez środka z... | 8363
57b727137b611ce415b82f42 | RM cały kręgosłup bez środka k... | 8362
57b72716a8cc138c085e6409 | Test wysiłkowy z dobutaminą       | 8361
57b7271a4e9b183c136d82b9 | Konsultacja kardiologiczna        | 8301
57b7271e4e9b183c136d82ba | Konsultacja dietetyczna           | 8287
57b727507b611ce415b82f43 | USG naczyń                        | 8282
57b7275a7b611ce415b82f44 | Kontrola rozrusznika              | 8283
57b7275f28a8a9d80c64f3b1 | Konsultacja kardiologiczna wst... | 8281
57e53d01c7574a441a8cc9ce | Konsultacja kardiologiczna (12... | 8341
57e53d0ac7574a441a8cc9cf | MR serca bez kontrastu            | 8386
57e53d0f232320800e2648ff | MR serca z kontrastem             | 8387
57e53d14c7574a441a8cc9d0 | Konsultacja kardiologiczna (13... | 8342
57e53d19232320800e264900 | Konsultacja kardiologiczna (14... | 8343
57e53d1fc7574a441a8cc9d1 | Konsultacja kardiologiczna (15... | 8344
57e53d23c7574a441a8cc9d2 | Konsultacja chirurga naczyniow... | 8345
57e53d27c7574a441a8cc9d3 | Konsultacja kardiochirurgiczna... | 8348







otal: 10
_id                      | name                       | hisId
------------------------ | -------------------------- | ------------------------
56cc74f916d7295c1ad99e8c | Wojciech Rubin             | 169
56cd645f0659dda83295675d | Ewa Sokoła-wysoczańska     | 168
56cdec9271a0303027dfb769 | Anna Tarnawska             | 173
56cdeccd70041a6c2b7628d7 | Małgorzata Będkowska-gemel | 192
56cdecd971a0303027dfb76a | Bernadetta Pasicka         | 176
56cdece52fbb374426327d0a | Joanna Kowal               | 181
56cded032f8ae4f81f13fb2f | Magdalena Chęcińska        | 184
56cded1470041a6c2b7628d8 | Małgorzata Gromkowska      | 170
56d84b7c15bb011c31ecf245 | Wojciech Kucharski         | 56e7326efd27bc9014af2f81
578cab7314babfa01479c7d4 | Wojciech Kucharski         | 174

test:PRIMARY>
test:PRIMARY> var res2 =  db2.contentItems.find({type:citype––},{name:1, hisId:1}).toArray();
2016-11-24T23:52:09.660+0100 E QUERY    [thread1] SyntaxError: illegal character @(shell):1:46

test:PRIMARY> dump(res2);
total: 41
_id                      | name                       | hisId
------------------------ | -------------------------- | ------------------------
56cc74f916d7295c1ad99e8c | Wojciech Rubin             | 169
56cd645f0659dda83295675d | Ewa Sokoła-wysoczańska     | 168
56cdec9271a0303027dfb769 | Anna Tarnawska             | 173
56cdeccd70041a6c2b7628d7 | Małgorzata Będkowska-gemel | 192
56cdecd971a0303027dfb76a | Bernadetta Pasicka         | 176
56cdece52fbb374426327d0a | Joanna Kowal               | 181
56cded032f8ae4f81f13fb2f | Magdalena Chęcińska        | 184
56cded1470041a6c2b7628d8 | Małgorzata Gromkowska      | 170
56d84b7c15bb011c31ecf245 | Wojciech Kucharski         | 56e7326efd27bc9014af2f81
578cab7314babfa01479c7d4 | Wojciech Kucharski         | 174
57b480ee71d7ac3409ee2ce6 | Andrzej Bochenek           | 283
57b48932a9e95d1417321757 | Marek Cisowski             | 286
57b489f3a9e95d1417321759 | Paweł Buszman              | 57b489f3a9e95d1417321758
57b54b1ca75c9cf0169f837e | Barbara Korzeniowska       | 290
57b54bf6087f8f54055d57b2 | Benita śmieja-Jaroczyńska  | 274
57b54cee47083d0815fc6b7c | Ewa Boczkowska-Gaik        | 265
57b54d25141c90401739053e | Tomasz Bochenek            | 284
57b54dc6087f8f54055d57b3 | Włodzimierz Kargul         | 288
57b54e4ca75c9cf0169f837f | Bożena Białkowska          | 282
57b54e6b47083d0815fc6b7d | Andrzej Jaklik             | 287
57b54e88141c90401739053f | Ewa Konarska-Kuszewska     | 273
57b54ea2087f8f54055d57b4 | Maciej Pruski              | 293
57b54eb5a75c9cf0169f8380 | Wojciech Wróbel            | 296
57b54ecba75c9cf0169f8381 | Krzysztof Zaorski          | 297
57b54ee447083d0815fc6b7e | Lech Cierpka               | 285
57b54f6b141c904017390540 | Katarzyna Spisak-Borowska  | 294
57b54fc5087f8f54055d57b5 | Ewa Maśluch                | 291
57bac46867be0de80ecdf630 | Joanna Apanasiewicz        | 221
57bc3993f064708c0807279c | Marcin Fiutowski           | 8
57bc39c0e405fcc81aa4f433 | Lidia Olejnik-Daniluk      | 14
57bc39efe405fcc81aa4f434 | Sławomir Gieras            | 9
57bc3a14e405fcc81aa4f435 | Kamil Wróbel               | 11
57bc3a2ce405fcc81aa4f436 | Katarzyna Czajkowska       | 10
57bc3a41e405fcc81aa4f437 | Ewa Lasota                 | 322
57bc3ab7b9107d8c132d3769 | Stanisław Trznadel         | 295
57bc3ce4b9107d8c132d376c | Iwona Banasiewicz-Szkróbka | 57bc3ce4b9107d8c132d376b
57bc4008e2592268121e9704 | Jarosław Kolasa            | 289
57c40756ebea85f80d2b2bef | Maciej Kośmider            | 57c40756ebea85f80d2b2bee
57e53ac35cc487b41bc9c697 | Marek Cisowski             | 57e53ac35cc487b41bc9c696
5809b67039e3ebe00e9697c8 | Paweł Buszman              | 281
5809e98ef876a18c0864bdb9 | Tomasz Orawczyk            | 292







*/


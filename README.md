
[installation and setting up](#installation-and-setting-up) | [configuration](#configuration) | [intellisense and interactive REPL in Visual Studio Code](#intellisense-and-interactive-repl-in-visual-studio-code)

MongoDB shell assistant (msa) is a very simple command line tool that helps writing MongoDB shell scripts. It connects to MongoDB database and gets some sample data from each collection. Based on that it generates TypeScript declaration file describing a database schema. So even if you write your MongoDB shell script in JavaScript you can still benefit from having intellisense and autocompletion, not only for MongoDB shell API but also for structure of a data. Visual Studio Code has a very good support for JavaScript and TypeScript so it's prefered code editor here.


## installation and setting up

Let's create sample database executing MongoDB shell script `mongo msasample.js`

```JavaScript
// msasample.js
var msasampledb = new Mongo("localhost:27017").getDB("msasample");
var users = [
        { login: "john", roles: ["admin"], isActive: true },
        { login: "steve", roles: ["editor"], isActive: false },
];
var multimedia = [
        { name: "flower.jpg", size: 100, type: "image", imageWidth: 50, imageHeight: 50 },
        { name: "sun.jpg", size: 200, type: "image", imageWidth: 500, imageHeight: 500 },
        { name: "presentation.mp4", size: 100000, type: "video", duration: 60 },
        { name: "mydoc.pdf", size: 150, type: "document" }
];
msasampledb.users.insertMany(users);
msasampledb.multimedia.insertMany(multimedia);
msasampledb.copyDatabase("msasample", "msasamplecopy");
```

Then install `msa` tool globally

```bash
npm install -g mongo-shell-assistant
```

## configuration

Execute `msa` command from terminal

```bash
> msa
'msa.config.json' configuration file does not exist.
'msa.config.json' file with sample configuration has been created.
```

Because there is no configuration file inside current directory yet a default one is created

```JavaScript
{
	"localhost:27017": {
		"database1": {},
		"database2": {
			"__includes": [
				"collection1",
				"collection2"
			],
			"collection1": {
				"discriminator": "discriminatorfield1"
			}
		},
		"database3": [
			"localhost:27017",
			"database1"
		]
	}
}
```

Change configuration settings to point to our sample database

```JavaScript
{
	"localhost:27017": {
		"msasample": {
			"multimedia":{
				"discriminator" : "type"
			}
		},
		"msasamplecopy": [
			"localhost:27017",
			"msasample"
		]
	}
}
```

And once again, execute `msa` tool from terminal

```bash
> msa
connecting to 'mongodb://localhost:27017/msasample' ...
all found collections: users,multimedia
retrieving metadata from collections: users,multimedia  ...
values of 'multimedia.type' discriminator: image,video,document

'msa.metadata.d.ts' file has been generated.
Add lines below at the beginning of you mongo shell script file:


/// <reference path="./msa.metadata.d.ts" />
var db = new Mongo("localhost:27017").getDB("msasample");
print(db.getCollectionNames());
//var data = db.__collection1__.find({}, {}).limit(10).toArray();
//printjson(data);
```

`msa.metadata.d.ts` TypeScript declaration file has been created.

Create a new MongoDb shell script `script.js` and copy the code above

```JavaScript
/// <reference path="./msa.metadata.d.ts" />
var db = new Mongo("localhost:27017").getDB("msasample");
print(db.getCollectionNames());
//var data = db.__collection1__.find({}, {}).limit(10).toArray();
//printjson(data);
```

Then run this script executing command `mongo script.js`

```bash
> mongo script.js
MongoDB shell version: 3.2.3
connecting to: test
multimedia,users
```

## intellisense and interactive REPL in Visual Studio Code

Mongo shell assistant provides intellisense in a variety of different places, including:

* a description of a Mongo shell API, 
* names of servers/databases/collections, 
* query or projection objects used with querying methods like `find` or `findOne` and 
* schema of documents returned from the database. 

Visual Studio Code has an integrated terminal window so we can open any REPL tool (for instance Mongo DB shell) and send selected pieces of text directly into opened terminal. Check out demo below to see how easy it is to interact with your MongoDB database. 

![](https://raw.githubusercontent.com/marcinnajder/mongo-shell-assistant/master/samples/demo/msa_demo_6__.gif)

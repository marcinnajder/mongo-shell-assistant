// // this is MongoDB shell script creating sample database
// // execute it from terminal: "mongo msasample.js"

// var msasampledb = new Mongo("localhost:27017").getDB("msasample");
// var users = [
//     { login: "john", roles: ["admin"], isActive: true },
//     { login: "steve", roles: ["editor"], isActive: false },
// ];
// var multimedia = [
//     { name: "flower.jpg", size: 100, type: "image", imageSize: { width: 50, height: 50 } },
//     { name: "sun.jpg", size: 200, type: "image", imageSize: { width: 500, height: 500 } },
//     { name: "presentation.mp4", size: 100000, type: "video", duration: 60 },
//     { name: "mydoc.pdf", size: 150, type: "document" }
// ];
// msasampledb.users.insertMany(users);
// msasampledb.multimedia.insertMany(multimedia);
// msasampledb.copyDatabase("msasample", "msasamplecopy");
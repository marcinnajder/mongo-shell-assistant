// this file can be loaded from mongo shell environment
declare var print;

namespace s {
    var maxColumnWidth = 30;
    var spaces = "                                                         ";
    var nl = "\n";

    // Overload signatures must all be ambient or non-ambient.
    export function dump(data) {
        var keys, value, isPrimitive, convertedvalue, headers = {}, newData = [], newRow, str = "";

        if (!Array.isArray(data)) {
            data = [data];
        }

        // figure out header (first row of the table)
        for (var row of data) {
            row = row || {};
            row = flatCopy(row);
            flattenObject(row);

            keys = Object.keys(row);
            newRow = {};

            for (var key of keys) {
                value = row[key];
                [isPrimitive, convertedvalue] = tryConvertToDisplayedValue(value);
                if (isPrimitive) {
                    value = convertedvalue;
                }
                else if (isObject(value)) {
                    // shouldn't be here because of flattening
                    continue;
                }
                else if (Array.isArray(value)) {
                    if (value.length > 0 && !isObject(value[0])) {
                        value = value.toString(); // conver array to string
                    }
                    else {
                        // for now skip arrays
                        continue;
                    }
                }
                else {
                    value = value.toString();
                }

                addNewColumn(newRow, key, value);
            }
            newData.push(newRow);
        }
        // display head
        str += "documents: " + data.length + nl;
        str += Object.keys(headers).map(h => padRight(h, headers[h])).join(" | ") + nl;
        str += Object.keys(headers).map(h => padRight("-".repeat(headers[h]), headers[h])).join(" | ") + nl;

        // display data
        for (var row of newData) {
            str += Object.keys(headers).map(h => padRight(row[h] || "", headers[h])).join(" | ") + nl;
        }

        return str;

        function addNewColumn(nr, k, v) {
            if (v.length > maxColumnWidth) {
                v = v.substring(0, maxColumnWidth) + "...";
            }
            headers[k] = Math.max(headers[k] || 0, v.length, k.length);
            nr[k] = v;
        }
    }

    function tryConvertToDisplayedValue(value) {
        if (value === null) return [true, "null"];
        if (value === undefined) return [true, "undefined"];
        // first check ensures mongo shell environment
        if (typeof ObjectId !== "undefined" && value instanceof ObjectId) return [true, value.str];
        if (value instanceof Date) return [true, value.toISOString()];
        return [false];
    }


    function flatCopy(obj) {
        return { ...obj };
        //data = JSON.parse(JSON.stringify(data));
    }

    function flattenObject(obj) {
        for (var k of Object.keys(obj)) {
            var v = obj[k];
            if (isObject(v)) {
                for (var kk of Object.keys(v)) {
                    obj[k + "." + kk] = v[kk];
                }
            }
        }
    }


    // function fomatRow(row){
    //     return str += Object.keys(headers).map(h => padRight(h, headers[h])).join(" | ");
    // }

    function padRight(text, count) {
        return text + spaces.substring(0, count - text.length);
    }

    /**https://github.com/jashkenas/underscore/blob/master/underscore.js */
    function isObject(obj) {
        if (Array.isArray(obj)) return false; // added
        var type = typeof obj;
        return type === 'function' || type === 'object' && !!obj;
    }
}

// // sample test, just execute:
// // node ./dist/src/s.js
// // ./mongodb/mongo  ./dist/src/s.js
// function log(obj) {
//     // node
//     if (typeof console !== "undefined") {
//         console.log(obj);
//     }
//     // mongo
//     else if (printjson) {
//         if (typeof obj === "string") {
//             print(obj);
//         } else {
//             printjson(obj);
//         }
//     }
// }

// var obj = {
//     //objectId: new ObjectId(),
//     id: null,
//     id2: undefined,
//     name: "john",
//     age: 123,
//     birthday: new Date(1982, 5, 13),
//     adress: ["Berlin", "Warsaw"],
//     job: {
//         name1: "IBM",
//         name2: "Comarch",
//     },
//     children: [{ name: "Adam" }, { name: "John" }],
// };
// log(obj);
// log(s.dump(obj));
// log(obj);
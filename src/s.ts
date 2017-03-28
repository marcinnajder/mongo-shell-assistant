// this file can be loaded from mongo shell environment
namespace s {
    var maxColumnWidth = 30;
    var spaces = "                                                         ";
    var nl = "\n";

    // Overload signatures must all be ambient or non-ambient.
    export function dump(data) {
        var keys, value, headers = {}, newData = [], newRow, str = "";

        if (!Array.isArray(data)) {
            data = [data];
        }

        // figure out header (first row of the table)
        for (var row of data) {
            keys = Object.keys(row || {});
            newRow = {};

            for (var key of keys) {

                value = row[key];

                if (value === null) {
                    value = "null";
                }
                else if (typeof ObjectId !== "undefined" && value instanceof ObjectId) {
                    value = value.str;
                }
                else if (value === undefined) {
                    value = "undefined";
                }
                else if (value instanceof Date) {
                    value = value.toISOString();
                }
                else if (Array.isArray(value) || isObject(value)) {
                    continue;
                    // for now skip objects and arrays
                }
                else {
                    value = value.toString();
                }

                if (value.length > maxColumnWidth) {
                    value = value.substring(0, maxColumnWidth) + "...";
                }
                headers[key] = Math.max(headers[key] || 0, value.length, key.length);
                newRow[key] = value;
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
    }

    // function fomatRow(row){
    //     return str += Object.keys(headers).map(h => padRight(h, headers[h])).join(" | ");
    // }

    function padRight(text, count) {
        return text + spaces.substring(0, count - text.length);
    }

    /**https://github.com/jashkenas/underscore/blob/master/underscore.js */
    function isObject(obj) {
        var type = typeof obj;
        return type === 'function' || type === 'object' && !!obj;
    }
}

// sample test, just execute "node ./dist/src/s.js""
// var obj = { name: "john", age: 123, adress: ["Berlin", "Warsaw"], jon: { name: "IBM" } };
// console.log(obj);
// console.log(s.dump(obj));
// console.log(obj);
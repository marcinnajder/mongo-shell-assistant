// import * as path from "path";
namespace s {
    var maxColumnWidth = 30;
    var spaces = "                                                         ";
    var nl = "\n";

    // Overload signatures must all be ambient or non-ambient.
    export function dump(data) {
        var keys, value, headers = {};
        var str = "";

        if (!Array.isArray(data)) {
            data = [data];
        }

        for (var row of data) {
            keys = Object.keys(row || {});

            for (var key of keys) {
                value = row[key];

                if (value === null) {
                    value = "null";
                }
                else if (value instanceof ObjectId) {
                    value = value.str;
                }
                else if (value === undefined) {
                    value = "undefined";
                }
                else if (value instanceof Date) {
                    value = value.toISOString();
                }
                else if (Array.isArray(value)) {
                    continue;
                    // pomijamy poki co tablice
                }
                else {
                    value = value.toString();
                }

                if (value.length > maxColumnWidth) {
                    value = value.substring(0, maxColumnWidth) + "...";
                }
                row[key] = value;
                headers[key] = Math.max(headers[key] || 0, value.length, key.length);
            }
        }

        str += "documents: " + data.length + nl;
        str += Object.keys(headers).map(h => padRight(h, headers[h])).join(" | ") + nl;
        str += Object.keys(headers).map(h => padRight("-".repeat(headers[h]), headers[h])).join(" | ") + nl;
        for (var row of data) {
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
}




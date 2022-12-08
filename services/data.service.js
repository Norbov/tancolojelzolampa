const fs = require("fs");
const { parse } = require("csv-parse");

function GetData() {
  var data = [];
    fs.createReadStream("./services/dtl.csv").pipe(parse({delimiter:";"}))
      .on("data", function (row) {
        data.push(row);
      })
      .on("error", function (error) {
        console.log(error.message);
      })
      .on("end", function () {
        console.log("finished");
      });

      return data;
}

module.exports.GetData = GetData;


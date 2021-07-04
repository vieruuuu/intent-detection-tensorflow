const fs = require("fs");
const path = require("path");
let trainData = [];

let files = fs.readdirSync(__dirname);

for (let i = 0; i < files.length; i++) {
  const file = files[i];
  const filename = path.join(__dirname, file);

  if (filename == __filename) {
    continue;
  }

  let data = require(filename);

  trainData = trainData.concat(data);
}

module.exports = trainData;

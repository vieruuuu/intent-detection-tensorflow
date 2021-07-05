const fs = require("fs");
const path = require("path");
let trainingData = [];

let files = fs.readdirSync(__dirname);

for (let i = 0; i < files.length; i++) {
  const file = files[i];
  const filename = path.join(__dirname, file);

  if (filename == __filename) {
    continue;
  }

  let data = require(filename);

  trainingData = trainingData.concat(data);
}

const tensor = {
  intends: ["age", "name"],
  mapping(t) {
    return [
      //
      t.intent == "age" ? 1 : 0,
      t.intent == "name" ? 1 : 0,
    ];
  },
};

module.exports = { trainingData, tensor };

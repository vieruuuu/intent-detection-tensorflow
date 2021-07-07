const fs = require("fs");
const path = require("path");
const isWhitespace = require("is-whitespace");

let trainingData = [];
let intents = [];

function getTrainingData(dirPath) {
  const files = fs.readdirSync(dirPath);

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    // if its a directory go trough its files
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      getTrainingData(filePath);
      continue;
    }

    // its a file
    if (!file.includes(".txt")) {
      continue;
    }

    // read the file
    const intent = file.split(".txt")[0];
    const fileData = fs.readFileSync(filePath, { encoding: "utf-8" });
    const lines = fileData.split("\n");

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.length < 2 || isWhitespace(line)) {
        continue;
      }

      trainingData.push({
        text: line,
        intent,
      });
    }

    intents.push(intent);
  }
}

getTrainingData(__dirname);

const tensor = {
  intents,
  mapping(t) {
    let map = [];

    for (let i = 0; i < tensor.intents.length; i++) {
      const intent = tensor.intents[i];

      map.push(t.intent == intent ? 1 : 0);
    }

    return map;
  },
};

module.exports = { trainingData, tensor };

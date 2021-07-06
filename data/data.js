const fs = require("fs");
const path = require("path");
const isWhitespace = require("is-whitespace");
let trainingData = [];

let files = fs.readdirSync(__dirname);

for (let i = 0; i < files.length; i++) {
  const file = files[i];
  const filename = path.join(__dirname, file);

  if (filename == __filename) {
    continue;
  }

  const data = fs.readFileSync(filename, { encoding: "utf-8" });

  const lines = data.split("\n");
  const intent = file.split(".txt")[0];

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
}

const tensor = {
  intends: ["age_number", "name_text"],
  mapping(t) {
    return [
      //
      t.intent == "age_number" ? 1 : 0,
      t.intent == "name_text" ? 1 : 0,
    ];
  },
};

module.exports = { trainingData, tensor };

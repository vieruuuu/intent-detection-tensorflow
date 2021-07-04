const trainAI = require("./train.js");
const test = require("./test.js");
const path = require("path");

async function main() {
  let Model = await trainAI();

  let savedModel = path.join(__dirname, "models", "Model");

  Model.save("file://" + savedModel);

  let prediction = await test(Model, "tell me your age");
  console.log(prediction);
}

main();

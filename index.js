const { train } = require("./lib/train.js");
const run = require("./lib/run.js");
const load = require("./lib/load.js");

async function main() {
  //let model = await train("Model");
  let model = await load("Model");

  let prediction = await run(model, "mi l sugi");
  console.log(prediction);
}

main();

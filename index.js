const { train } = require("./lib/train.js");
const run = require("./lib/run.js.js");
const load = require("./lib/load.js");

async function main() {
  //let model = await train("Model");
  let model = await load("Model");

  let prediction = await run(model, "tell me your age");
  console.log(prediction);
}

main();

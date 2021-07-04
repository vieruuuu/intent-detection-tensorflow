const tf = require("@tensorflow/tfjs-node");
const path = require("path");

async function load(modelName) {
  let savedModel = path.join(
    __dirname,
    "..",
    "models",
    modelName,
    "model.json"
  );

  console.log(savedModel);

  return tf.loadLayersModel("file://" + savedModel);
}

module.exports = load;

const path = require("path");

const tf = require("@tensorflow/tfjs-node");
const use = require("@tensorflow-models/universal-sentence-encoder");

const justTrain = async () => {
  let trainingData = require("../data/data");

  let sentenceEncoder = await use.load();
  let sentences = trainingData.map((t) => t.text.toLowerCase());
  let xTrain = await sentenceEncoder.embed(sentences);
  let yTrain = tf.tensor2d(
    trainingData.map((t) => [
      // doua de astea aici
      t.intent == "age" ? 1 : 0,
      t.intent == "name" ? 1 : 0,
    ])
  );

  const model = tf.sequential();
  model.add(
    tf.layers.dense({
      inputShape: [xTrain.shape[1]],
      activation: "softmax",
      units: 2, // deci o sa fie si doua de astea aici
    })
  );
  model.compile({
    loss: "categoricalCrossentropy",
    optimizer: tf.train.adam(0.001),
    metrics: ["accuracy"],
  });
  const onBatchEnd = (batch, logs) => {
    console.log("Accuracy", logs.acc);
  };
  // Train Model
  await model
    .fit(xTrain, yTrain, {
      batchSize: 32,
      validationSplit: 0.1,
      shuffle: true,
      epochs: 300,
      callbacks: { onBatchEnd },
    })
    .then((info) => {
      console.log("Final accuracy", info.history.acc);
    });
  return model;
};

const train = async (modelName) => {
  let model = await justTrain();

  let savedModel = path.join(__dirname, "..", "models", modelName);

  model.save("file://" + savedModel);

  return model;
};

module.exports = { train, justTrain };

const tf = require("@tensorflow/tfjs-node");
const use = require("@tensorflow-models/universal-sentence-encoder");

const trainAI = async () => {
  var trainingData = require("./data/data");

  var sentenceEncoder = await use.load();
  var sentences = trainingData.map((t) => t.text.toLowerCase());
  var xTrain = await sentenceEncoder.embed(sentences);
  var yTrain = tf.tensor2d(
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

module.exports = trainAI;

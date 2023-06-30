const mongoose = require('mongoose');
const {Schema,model} = require('mongoose');

const sequenceSchema = new Schema({
  _id: { type: String, required: true },
  sequenceValue: { type: Number, default: 0 }
});

module.exports = model('Sequence',sequenceSchema);

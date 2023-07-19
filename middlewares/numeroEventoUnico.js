const mongoose = require("mongoose");
const Sequence = require("../models/Sequence");

async function getNextSequenceValue(sequenceName) {
    const session = await mongoose.startSession();
    session.startTransaction();
  
    try {
      const sequenceDoc = await Sequence.findByIdAndUpdate(
        sequenceName,
        { $inc: { sequenceValue: 1 } },
        { new: true, upsert: true, session }
      ).exec();
  
      await session.commitTransaction();
      session.endSession();
  
      return sequenceDoc.sequenceValue;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }

  module.exports = getNextSequenceValue;
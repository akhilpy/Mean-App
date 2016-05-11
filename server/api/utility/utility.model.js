'use strict';

import mongoose from 'mongoose';

var UtilitySchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Utility', UtilitySchema);

const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  grossBurn: Number,
  netBurn: Number,
  revenue: Number,
  expenses: Number,
  cashFlow: {
    initialBalance: Number,
    cashInflows: Number,
    cashOutflows: Number,
    netCashFlow: Number,
    finalCashBalance: Number
  },
  margin: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Report', ReportSchema);

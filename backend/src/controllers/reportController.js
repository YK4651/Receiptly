const jwt = require('jsonwebtoken');
const Report = require('../models/Report');
const Receipt = require('../models/Receipt');

const generateReport = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const receipts = await Receipt.find({ userId });

    let revenue = 0, expenses = 0, inflows = 0, outflows = 0;
    const categorizedBurnRateData = {};

    receipts.forEach(receipt => {
      receipt.receiptData.forEach(data => {
        const total = parseFloat(data.total);
        if (isNaN(total)) {
          return res.status(400).json({ message: `Invalid receipt total: ${data.total}` });
        }

        const date = new Date(data.date);
        const month = date.toLocaleString("default", { month: "short" });

        if (data.receiptCategory === 'Retail') {
          revenue += total;
          inflows += total;
        } else {
          expenses += Math.abs(total);
          outflows += Math.abs(total);
        }

        if (!categorizedBurnRateData[month]) {
          categorizedBurnRateData[month] = 0;
        }
        categorizedBurnRateData[month] += Math.abs(total);
      });
    });

    const burnRateData = Object.keys(categorizedBurnRateData).map(month => ({
      month,
      burnRate: categorizedBurnRateData[month]
    }));

    const grossBurn = 10;
    const netBurn = inflows - expenses;
    const initialBalance = 1000;
    const netCashFlow = inflows - outflows;
    const finalCashBalance = initialBalance + netCashFlow;
    const margin = (revenue > 0) ? (revenue - expenses) / revenue * 100 : 0;

    const report = new Report({
      userId, grossBurn, netBurn, revenue, expenses,
      cashFlow: { initialBalance, cashInflows: inflows, cashOutflows: outflows, netCashFlow, finalCashBalance },
      margin,
      burnRateData
    });

    await report.save();
    res.json(report);

  } catch (err) {
    res.status(500).json({ message: 'Error generating report', error: err.message });
  }
};

module.exports = { generateReport };

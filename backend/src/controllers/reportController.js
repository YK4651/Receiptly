const jwt = require('jsonwebtoken');
const Report = require('../models/Report');
const Receipt = require('../models/Receipt');

const generateReport = async (req, res) => {
  try {
    // Extract JWT token from request headers
    const token = req.headers.authorization?.split(' ')[1]; // Expecting "Bearer <token>"
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id; // Assuming JWT payload contains { id: userId }

    // Fetch receipts for the authenticated user
    const receipts = await Receipt.find({ userId });

    let revenue = 0, expenses = 0, inflows = 0, outflows = 0;

    receipts.forEach(receipt => {
      //res.status(200).json({ message: 'Receipts found', receipt });
      receipt.receiptData.forEach(data => {
        const total = parseFloat(data.total);
        if (isNaN(total)) {
          return res.status(400).json({ message: `Invalid receipt total: ${data.total}` });
        }

        if (data.receiptCategory === 'Retail') {
          revenue += total;
          inflows += total;
        } else {
          expenses += Math.abs(total);
          outflows += Math.abs(total);
        }
      });
    });

    const grossBurn = expenses;
    const netBurn = inflows - expenses;
    const initialBalance = 1000; // Example starting balance
    const netCashFlow = inflows - outflows;
    const finalCashBalance = initialBalance + netCashFlow;
    const margin = (revenue > 0) ? (revenue - expenses) / revenue * 100 : 0;

    const report = new Report({
      userId, grossBurn, netBurn, revenue, expenses,
      cashFlow: { initialBalance, cashInflows: inflows, cashOutflows: outflows, netCashFlow, finalCashBalance },
      margin
    });

    await report.save();
    res.json(report);

  } catch (err) {
    res.status(500).json({ message: 'Error generating report', error: err.message });
  }
};

module.exports = { generateReport };
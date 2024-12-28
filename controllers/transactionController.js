const User = require('../models/User');

// Deposit Funds (Increase wallet balance)
exports.depositFunds = async (req, res) => {
  const { amount } = req.body;
  try {
    if (amount <= 0) {
      return res.status(400).json({ message: 'Amount must be greater than zero' });
    }

    const user = await User.findById(req.user.id); // Get user from JWT token
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.walletBalance += amount; // Increase wallet balance
    await user.save();
    res.status(200).json({
      message: `Successfully deposited ${amount}`,
      balance: user.walletBalance,
    });
  } catch (error) {
    res.status(400).json({ message: 'Error depositing funds', error });
  }
};

// Withdraw Funds (Decrease wallet balance)
exports.withdrawFunds = async (req, res) => {
  const { amount } = req.body;
  try {
    if (amount <= 0) {
      return res.status(400).json({ message: 'Amount must be greater than zero' });
    }

    const user = await User.findById(req.user.id); // Get user from JWT token
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.walletBalance < amount) {
      return res.status(400).json({ message: 'Insufficient funds' });
    }

    user.walletBalance -= amount; // Decrease wallet balance
    await user.save();
    res.status(200).json({
      message: `Successfully withdrew ${amount}`,
      balance: user.walletBalance,
    });
  } catch (error) {
    res.status(400).json({ message: 'Error withdrawing funds', error });
  }
};

// Transfer Funds (From one user to another)
exports.transferFunds = async (req, res) => {
  const { recipientId, amount } = req.body;
  try {
    if (amount <= 0) {
      return res.status(400).json({ message: 'Amount must be greater than zero' });
    }

    const sender = await User.findById(req.user.id); // Get sender from JWT token
    if (!sender) return res.status(404).json({ message: 'Sender not found' });

    const recipient = await User.findById(recipientId); // Get recipient
    if (!recipient) return res.status(404).json({ message: 'Recipient not found' });

    if (sender.walletBalance < amount) {
      return res.status(400).json({ message: 'Insufficient funds' });
    }

    sender.walletBalance -= amount; // Deduct from sender's balance
    recipient.walletBalance += amount; // Add to recipient's balance

    await sender.save();
    await recipient.save();

    res.status(200).json({
      message: `Successfully transferred ${amount} to ${recipient.name}`,
      senderBalance: sender.walletBalance,
      recipientBalance: recipient.walletBalance,
    });
  } catch (error) {
    res.status(400).json({ message: 'Error transferring funds', error });
  }
};

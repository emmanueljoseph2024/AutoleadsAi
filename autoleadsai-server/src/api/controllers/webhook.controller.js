import { paddleWebhookHandler } from '../../services/billing/paddle.webhook.js';
import crypto from 'crypto';

// POST /webhooks/paddle
export const handlePaddle = async (req, res, next) => {
  try {
    const signature = req.headers['paddle-signature'];
    const rawBody = JSON.stringify(req.body);
    const secret = process.env.PADDLE_WEBHOOK_SECRET;

    if (!signature || !paddleWebhookHandler.verifySignature(rawBody, signature, secret)) {
      return res.status(400).json({ error: 'Invalid signature' });
    }

    await paddleWebhookHandler.handleEvent(req.body);
    res.status(200).json({ received: true });
  } catch (error) {
    next(error);
  }
};

// POST /webhooks/slack – Slack events (optional)
export const handleSlack = async (req, res, next) => {
  // If you implement Slack event subscriptions, verify the request here
  res.status(200).send();
};
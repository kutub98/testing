import { Router } from 'express';
import {
  sendBulkSMS,
  getMessagingHistory,
  getMessagingStats,
} from './messaging.controller';
import { authenticate, requireRole } from '../../middleware/auth.middleware';

const MessagingRouter = Router();

// Send bulk message (SMS or WhatsApp) - Admin only
MessagingRouter.post(
  '/bulk-send',
  authenticate,
  requireRole(['admin']),
  sendBulkSMS,
);

// Get messaging history - Admin only
MessagingRouter.get(
  '/history',
  authenticate,
  requireRole(['admin']),
  getMessagingHistory,
);

// Get messaging statistics - Admin only
MessagingRouter.get(
  '/stats',
  authenticate,
  requireRole(['admin']),
  getMessagingStats,
);

export { MessagingRouter };

import express, { Request, Response } from 'express';
import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError
} from '@tixor/common';
import { Order, OrderStatus } from '../models/order';
import { OrderCancelledPublisher } from '../events/publishers/order-cancelled-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.delete(
  '/api/orders/:orderId',
  requireAuth,
  async (req: Request, res: Response) => {
    const { orderId } = req.params;

    const order = await Order.findById(orderId).populate('ticket');

    if (!order) {
      throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    order.status = OrderStatus.Cancelled;
    await order.save();

    // publishing an event saying this was cancelled!
    await new OrderCancelledPublisher(natsWrapper.client).publish({
      id: order.id,
      version: order.version,
      ticket: {
        id: order.ticket.id,
      },
    });
    // In delete.ts
    const debugData = {
      id: order.id,
      version: order.version,
      ticket: { id: order.ticket.id }
    };
    console.log("ACTUAL TYPE:", (debugData as any).constructor.name);

    type ExpectedType = Parameters<typeof OrderCancelledPublisher.prototype.publish>[0];
    console.log("REQUIRED SHAPE:", JSON.stringify({} as ExpectedType, null, 2));


    res.status(204).send(order);
  }
);

export { router as deleteOrderRouter };

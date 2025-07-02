import { Listener, OrderCancelled, OrderStatus, Subjects } from "@tixor/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";

export class OrderCancelledListener extends Listener<OrderCancelled> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
    queueGroupName = queueGroupName;

    async onMessage(data: OrderCancelled['data'], msg: Message) {
        const order = await Order.findOne({
            _id: data.id,
            version: data.version - 1,
        });

        // if (!order) {
        //   throw new Error('Order not found');
        // }

        if (!order) {
            console.warn('[payments] Order not found — likely already cancelled or never created:', data.id);
            return msg.ack(); // Acknowledge to avoid retry loop
        }

        // ✅ ADD THIS: do NOT cancel a completed order
        if (order.status === OrderStatus.Complete) {
            console.log('[payments] Skipping cancellation — already complete:', order.id);
            return msg.ack();
        }

        order.set({ status: OrderStatus.Cancelled });
        await order.save();

        msg.ack();
    }
}

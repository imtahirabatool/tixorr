import { Listener, PaymentCreated, Subjects, OrderStatus } from "@tixor/common";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";
import { queueGroupName } from "./queue-group-name";

export class PaymentCreatedListener extends Listener<PaymentCreated> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: PaymentCreated["data"], msg: Message) {
        const order = await Order.findById(data.orderId);

        if (!order) {
            console.warn("[orders] ❗ Order not found for payment:", data.orderId);
            return msg.ack();
        }

        order.set({ status: OrderStatus.Complete });
        await order.save();

        console.log("[orders] ✅ Order marked as Complete:", order.id);

        msg.ack();
    }
}

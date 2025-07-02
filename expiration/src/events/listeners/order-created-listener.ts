import { Listener, OrderCreated, Subjects } from "@tixor/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { expirationQueue } from "../../queues/expiration-queue";

export class OrderCreatedListener extends Listener<OrderCreated> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: OrderCreated['data'], msg: Message) {
        const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
        console.log("⌛ Waiting for this many milliseconds:", delay);

        await expirationQueue.add(
            { orderId: data.id },
            {
                delay, // ✅ Use calculated expiration delay
            }
        );

        msg.ack();
    }
}

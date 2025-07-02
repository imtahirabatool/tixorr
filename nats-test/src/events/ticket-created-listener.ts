import { Message } from "node-nats-streaming";
import { Listener } from "./baseListener";
import { TicketCreated } from "./ticket-created";
import { Subjects } from "./subjects";

export class TicketCreatedListener extends Listener<TicketCreated> {
    subject : Subjects.TicketCreated = Subjects.TicketCreated;
    queueGroupName = 'payment-service'

    onMessage(data: TicketCreated['data'], msg: Message) {
        console.log('Event data: ', data)

        msg.ack();
    }
}
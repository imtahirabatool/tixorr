import { Publisher } from "./base-publisher";
import { Subjects } from "./subjects";
import { TicketCreated } from "./ticket-created";


export class TicketCreatedPublisher extends Publisher<TicketCreated> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
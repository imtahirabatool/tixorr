import { Publisher, Subjects, TicketCreated } from '@tixor/common';

export class TicketCreatedPublisher extends Publisher<TicketCreated> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}

import { Subjects, Publisher, OrderCancelled } from '@tixor/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelled> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}

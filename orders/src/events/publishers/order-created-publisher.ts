import { Publisher, OrderCreated, Subjects } from '@tixor/common';

export class OrderCreatedPublisher extends Publisher<OrderCreated> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}

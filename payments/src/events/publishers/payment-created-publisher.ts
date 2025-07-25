import { PaymentCreated, Publisher, Subjects } from "@tixor/common";


export class PaymentCreatedPublisher extends Publisher<PaymentCreated> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
import { ExpirationComplete, Publisher, Subjects } from "@tixor/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationComplete> {
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;

}
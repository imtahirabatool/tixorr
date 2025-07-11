import { Subjects } from "./subjects";

export interface TicketCreated {
    subject: Subjects.TicketCreated;
    data: {
        id: string;
        title: string;
        price: number;
        userId: string;
        version: number;
    };
}
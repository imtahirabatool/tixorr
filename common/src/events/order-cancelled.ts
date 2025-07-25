import { Subjects } from "./subjects";

export interface OrderCancelled {
    subject: Subjects.OrderCancelled;
    data: {
        id: string;
        version: number;
        ticket: {
            id: string;
        };
    };
}
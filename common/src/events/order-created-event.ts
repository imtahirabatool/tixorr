import { Subjects } from "./subjects";
import { OrderStatus } from "./types/order-status";

export interface OrderCreated {
    subject: Subjects.OrderCreated,
    data: {
        id: string;
        version: number;
        status: OrderStatus;
        userId: string;
        expiresAt: string;
        ticket: {
            id: string,
            price: number;
        }
    }
}
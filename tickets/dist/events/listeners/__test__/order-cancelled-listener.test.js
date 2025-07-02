"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const nats_wrapper_1 = require("../../../nats-wrapper");
const order_cancelled_listener_1 = require("../order-cancelled-listener");
const ticket_1 = require("../../../models/ticket");
const setup = () => __awaiter(void 0, void 0, void 0, function* () {
    const listener = new order_cancelled_listener_1.OrderCancelledListener(nats_wrapper_1.natsWrapper.client);
    const orderId = new mongoose_1.default.Types.ObjectId().toHexString();
    const ticket = ticket_1.Ticket.build({
        title: 'concert',
        price: 20,
        userId: 'asdf',
    });
    ticket.set({ orderId });
    yield ticket.save();
    const data = {
        id: orderId,
        version: 0,
        ticket: {
            id: ticket.id,
        },
    };
    // @ts-ignore
    const msg = {
        ack: jest.fn(),
    };
    return { msg, data, ticket, orderId, listener };
});
it('updates the ticket, publishes an event, and acks the message', () => __awaiter(void 0, void 0, void 0, function* () {
    const { msg, data, ticket, orderId, listener } = yield setup();
    yield listener.onMessage(data, msg);
    const updatedTicket = yield ticket_1.Ticket.findById(ticket.id);
    expect(updatedTicket.orderId).not.toBeDefined();
    expect(msg.ack).toHaveBeenCalled();
    expect(nats_wrapper_1.natsWrapper.client.publish).toHaveBeenCalled();
}));

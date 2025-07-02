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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderCancelledListener = void 0;
const common_1 = require("@tixor/common");
const queue_group_name_1 = require("./queue-group-name");
const ticket_1 = require("../../models/ticket");
const ticket_updated_publisher_1 = require("../publishers/ticket-updated-publisher");
class OrderCancelledListener extends common_1.Listener {
    constructor() {
        super(...arguments);
        this.subject = common_1.Subjects.OrderCancelled;
        this.queueGroupName = queue_group_name_1.queueGroupName;
    }
    onMessage(data, msg) {
        return __awaiter(this, void 0, void 0, function* () {
            const ticket = yield ticket_1.Ticket.findById(data.ticket.id);
            if (!ticket) {
                throw new Error('Ticket not found');
            }
            ticket.set({ orderId: undefined });
            yield ticket.save();
            yield new ticket_updated_publisher_1.TicketUpdatedPublisher(this.client).publish({
                id: ticket.id,
                orderId: ticket.orderId,
                userId: ticket.userId,
                price: ticket.price,
                title: ticket.title,
                version: ticket.version,
            });
            msg.ack();
        });
    }
}
exports.OrderCancelledListener = OrderCancelledListener;

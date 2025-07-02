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
const ticket_1 = require("../ticket");
it('implements optimistic concurrency control', () => __awaiter(void 0, void 0, void 0, function* () {
    const ticket = ticket_1.Ticket.build({
        title: 'concert',
        price: 5,
        userId: '123',
    });
    yield ticket.save();
    const firstInstance = yield ticket_1.Ticket.findById(ticket.id);
    const secondInstance = yield ticket_1.Ticket.findById(ticket.id);
    firstInstance.set({ price: 10 });
    secondInstance.set({ price: 90 });
    yield firstInstance.save();
    // await secondInstance!.save()
    try {
        yield secondInstance.save();
    }
    catch (err) {
        return;
    }
    throw new Error('Should not reacg this point');
}));
it('increment the version number on multiple saves', () => __awaiter(void 0, void 0, void 0, function* () {
    const ticket = ticket_1.Ticket.build({
        title: 'concert',
        price: 5,
        userId: '123',
    });
    yield ticket.save();
    expect(ticket.version).toEqual(0);
    yield ticket.save();
    expect(ticket.version).toEqual(1);
    yield ticket.save();
    expect(ticket.version).toEqual(2);
}));

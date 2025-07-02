import nats from 'node-nats-streaming';
import { TicketCreatedPublisher } from './events/tickt-created-publisher';

console.clear();

const stan = nats.connect('tickets', 'publisher-abc', {
    url: 'http://localhost:4222'
});

stan.on('connect', async () => {
    console.log('Publisher connected to NATS.');

    const publisher = new TicketCreatedPublisher(stan);
    try {
        await publisher.publish({
            id: '123',
            title: 'concert',
            price: 20
        })
    } catch (error) {
        console.log(error)
    }
    // const data = JSON.stringify({
    //     id: '123',
    //     title: 'Title',
    //     price: 12
    // });

    // stan.publish('ticket:created', data, () => {
    //     console.log('Event published');
    // });
});

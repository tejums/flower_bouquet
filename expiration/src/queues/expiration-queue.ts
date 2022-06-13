import Queue from 'bull';
import { ExpirationCompeltePublisher } from '../events/publishers/expiration-complete-publisher';
import { natsWrapper } from '../nats-wrapper';

interface Payload {
    orderId: string;
}

const expiratonQueue = new Queue<Payload>('order:expiration', {
    redis: {
        host: process.env.REDIS_HOST
    }
});

expiratonQueue.process(async(job) => {
   new ExpirationCompeltePublisher(natsWrapper.client).publish({
       orderId: job.data.orderId,
   });
});

export { expiratonQueue };
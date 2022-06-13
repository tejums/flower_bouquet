import { Listener, OrderCreatedEvent, OrderStatus, Subjects } from "@mvsrtickets/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { expiratonQueue } from "../../queues/expiration-queue";



export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    queueGroupName: string = queueGroupName;

    async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
        const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
        await expiratonQueue.add({orderId: data.id}, { delay });

        msg.ack();
    }

}
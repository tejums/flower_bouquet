import { Listener, FlowerCreatedEvent, Subjects } from "@mvsrtickets/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Flower } from "../../models/flower";

export class FlowerCreatedListener extends Listener<FlowerCreatedEvent> {
    subject: Subjects.FlowerCreated = Subjects.FlowerCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: FlowerCreatedEvent['data'], msg: Message) {
        const { id, name, qty, price, userId } = data;
        
        const flower = Flower.build({
            id,
            name,
            qty,
            price,
            userId
        });

        await flower.save();

        msg.ack();
    }
}
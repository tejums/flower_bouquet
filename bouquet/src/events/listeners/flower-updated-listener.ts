import { Listener, Subjects, FlowerUpdatedEvent } from "@mvsrtickets/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Flower } from "../../models/flower";


export class FlowerUpdatedListener extends Listener<FlowerUpdatedEvent> {
    subject: Subjects.FlowerUpdated = Subjects.FlowerUpdated;
    queueGroupName = queueGroupName;

    async onMessage(data: FlowerUpdatedEvent['data'], msg: Message) {
        const flower = await Flower.findByEvent(data);

        if (!flower) {
            throw new Error('Flower not found');
        }
    
        const { id, name, qty, price, userId } = data;

        flower.set({
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
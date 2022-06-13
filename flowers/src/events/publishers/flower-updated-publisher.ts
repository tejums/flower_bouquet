import { FlowerUpdatedEvent, Publisher, Subjects } from "@mvsrtickets/common";

export class FlowerUpdatedPublisher extends Publisher<FlowerUpdatedEvent>{
    subject: Subjects.FlowerUpdated = Subjects.FlowerUpdated;
}
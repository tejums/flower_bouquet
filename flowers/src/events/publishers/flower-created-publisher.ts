import { FlowerCreatedEvent, Publisher, Subjects } from "@mvsrtickets/common";

export class FlowerCreatedPublisher extends Publisher<FlowerCreatedEvent>{
    subject: Subjects.FlowerCreated = Subjects.FlowerCreated;
}
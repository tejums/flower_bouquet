import { Publisher, Subjects } from "@mvsrtickets/common";
import { ExpirationCompleteEvent } from "@mvsrtickets/common";


export class ExpirationCompeltePublisher extends Publisher<ExpirationCompleteEvent>{
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
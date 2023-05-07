import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerCreated from "../customer-created.event";

export default class SendConsoleLog1Handler implements EventHandlerInterface<CustomerCreated> {
    handle(event: CustomerCreated): void {
        console.log("Esse é o primeiro console.log do evento: CustomerCreated");
    }

}
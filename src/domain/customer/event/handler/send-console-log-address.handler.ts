import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import ChangedAddressEvent from "../changed-address.event";

export default class SendConsoleLogAddressHandler implements EventHandlerInterface<ChangedAddressEvent> {
    handle(event: ChangedAddressEvent): void {
        console.log(`Endereço do cliente: ${event.eventData.id}, ${event.eventData.nome} alterado para: ${event.eventData.endereco}`);
    }

}
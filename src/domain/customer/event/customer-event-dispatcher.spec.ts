import EventDispatcher from "../../@shared/event/event-dispatcher";
import ChangedAddressEvent from "./changed-address.event";
import CustomerCreatedEvent from "./customer-created.event";
import SendConsoleLogAddressHandler from "./handler/send-console-log-address.handler";
import SendConsoleLog1Handler from "./handler/send-console-log.handler1";
import SendConsoleLog2Handler from "./handler/send-console-log.handler2";

describe ("customer event dispatcher test", () => {
    it("should register a customer event handler", ()=>{
        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new SendConsoleLog1Handler();
        const eventHandler2 = new SendConsoleLog2Handler();

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        expect(
            eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
        ).toBeDefined();
        
        expect(
            eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
        ).toMatchObject(eventHandler1);
        
        expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
        ).toMatchObject(eventHandler2);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);
    
    });

    it("should notify when a customer is created", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new SendConsoleLog1Handler();
        const eventHandler2 = new SendConsoleLog2Handler();
        const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
        const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        const customerCreatedEvent = new CustomerCreatedEvent({
            name: "Allyson",
            userLogin: "@allysonreis"
        });
        
        eventDispatcher.notify(customerCreatedEvent);

        expect(spyEventHandler1).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();
    });

    it("should notify when an address changes", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLogAddressHandler();

        eventDispatcher.register("ChangedAddressEvent", eventHandler);
        
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        const changeAddressEvent = new ChangedAddressEvent({
            id: 1,
            nome: "Allyson",
            endereco: "Porto Alegre - RS, Rua do Pardal nº 167 Centro"
        }); 

        eventDispatcher.notify(changeAddressEvent);

        expect(spyEventHandler).toBeCalled();
    });
});

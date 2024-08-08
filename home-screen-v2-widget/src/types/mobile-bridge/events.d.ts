import { BridgeEvent, BridgeEventsRecipient } from './types';
export declare type BridgeEventHandler = (event: BridgeEvent) => void;
export declare type BridgeEventUnlistener = () => void;
export declare type BridgeEventPredicate = (event: BridgeEvent) => boolean;
/**
 * Interface for a listener that can handle events coming from the native app.
 */
interface BridgeEventListener {
    /** Handler function that gets called when a matching event arrived. */
    handler: BridgeEventHandler;
    /** If given, all events where the predicate returns `false` are ignored. */
    predicate?: BridgeEventPredicate;
    /** Whether or not the listener should be unregistered once it's been fired. */
    once?: boolean;
}
/**
 * Create a predicate that matches for the given event IDs.
 *
 * @param eventIds
 */
export declare function createEventIdsFilter(eventIds: string[]): BridgeEventPredicate;
/**
 * Handles events coming from the native app and passes them along to interested parties.
 */
export declare class BridgeEvents implements BridgeEventsRecipient {
    private readonly listeners;
    private removeListenerHandle;
    private replayEvents;
    private forwardEvents;
    /**
     * Registers a listener for native events.
     *
     * @param listener See `BridgeEventListener` for details.
     * @return A function that can be called to stop receiving events.
     */
    addListener(listener: BridgeEventListener): BridgeEventUnlistener;
    /**
     * Register this instance as a handler for native events. If a handler is present already,
     * forward all received events to it. If not, it will replay events that has been triggered
     * before.
     *
     * Make sure to add handlers that handles events that can potentially be triggered very early
     * before calling this.
     *
     * @param globalObject The global object, which is `window` in most cases.
     */
    init(globalObject: Window): void;
    push(event: BridgeEvent): void;
}
export {};

import { EventEmitter } from 'events';
import { logger } from '../utils/logger.js';

// Singleton event bus instance
class EventBus extends EventEmitter {
  constructor() {
    super();
    // Set max listeners to avoid memory leak warnings
    this.setMaxListeners(100);
  }

  // Emit with error handling and logging
  emitEvent(eventName, payload) {
    logger.info({ event: eventName, payload }, `Event emitted: ${eventName}`);
    try {
      super.emit(eventName, payload);
    } catch (error) {
      logger.error({ event: eventName, error: error.message }, `Error emitting event: ${eventName}`);
    }
  }

  // Subscribe with error boundary
  onEvent(eventName, handler) {
    logger.info(`Listener registered for event: ${eventName}`);
    super.on(eventName, (payload) => {
      try {
        handler(payload);
      } catch (error) {
        logger.error(
          { event: eventName, error: error.message, stack: error.stack },
          `Error in event handler for: ${eventName}`
        );
      }
    });
  }

  // Subscribe once
  onceEvent(eventName, handler) {
    super.once(eventName, (payload) => {
      try {
        handler(payload);
      } catch (error) {
        logger.error(
          { event: eventName, error: error.message },
          `Error in once event handler for: ${eventName}`
        );
      }
    });
  }

  // Remove a listener
  offEvent(eventName, handler) {
    if (handler) {
      super.off(eventName, handler);
    } else {
      super.removeAllListeners(eventName);
    }
    logger.info(`Listener removed for event: ${eventName}`);
  }

  // Get all registered event names
  getRegisteredEvents() {
    return this.eventNames();
  }

  // Get listener count for an event
  getListenerCount(eventName) {
    return this.listenerCount(eventName);
  }
}

// Export singleton instance
export const eventBus = new EventBus();

// Export class for testing (allows creating fresh instances)
export { EventBus };
class EventMitt {
    listeners: Object;
    constructor() {
        this.listeners = {
            'EVENT:LOGIN': new Set(),
        };
    }
    on(event, listener) {
        if (!this.listeners[event]) return new Error('未注册该事件');
        this.listeners[event].add(listener);
    }

    emit(event, ...args) {
        if (!this.listeners[event]) return new Error('未注册该事件');
        this.listeners[event].forEach((listener) => listener(...args));
    }

    off(event, listener) {
        if (!this.listeners[event]) return new Error('未注册该事件');
        this.listeners[event].delete(listener);
    }
}

export default new EventMitt();

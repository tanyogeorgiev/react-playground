import observer from '../infrastructure/observer';

const notification = {
  push: (type, message) => {
    observer.trigger(observer.events.notification, {
      type,
      message
    });
  }
};

export default notification;

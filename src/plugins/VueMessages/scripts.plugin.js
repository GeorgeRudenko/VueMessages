import MessageController from '@/plugins/VueMessages/Controller';

export default {
  install: (Vue) => {
    Vue.config.globalProperties.$initVueMessages = function (options) {
      MessageController.init(options);
    }
    Vue.config.globalProperties.$messages = function (messageText, messageType) {
      let text = messageText ? messageText : null;
      let type = messageType ? messageType : 'primary';

      if (text && type) {
        MessageController.pushMessage({
          text: text,
          type: type
        });
      }
      else {
        console.error('You need send text in params to view a message!');
      }
    }
  }
}
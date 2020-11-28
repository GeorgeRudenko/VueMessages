import MessageController from '@/plugins/VueMessages/Controller';

export default {
  install: (Vue) => {
    MessageController.init();

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
class MessagesController {
  constructor() {
    this.counter = 1;
    this.messages = [];
    this.mode = {
      stack: true
    };
    this.containers = [];
    this.containers['top-right'] = null;
  }

  /* Methods */
  init() {
    this.addStyleInHeader();

    let pageBody = document.querySelector('body');

    this.containers['top-right'] = document.createElement('div');
    this.containers['top-right'].className = this.MESSAGES_WRAPPER_NAME;
    pageBody.insertBefore(this.containers['top-right'], pageBody.firstChild);
  }

  /* Push new message */
  pushMessage(options) {
    let opt = options ? options : null;
    let id = new Date().getTime();

    if (opt) {
      this.messages[id] = {
        text: opt.text,
        type: opt.type
      };

      if (this.mode.stack === true) {
        this.viewNewMessage(id);
      }
      else {
        let prevElem = document.querySelector('.vm__message_block');

        if (prevElem != null) prevElem.remove();

        this.viewNewMessage(id);
      }
    }
    else {
      return false;
    }
  }

  /* View new message */
  viewNewMessage(id) {
    let messageId = id;
    let container = document.querySelector(`.${this.MESSAGES_WRAPPER_NAME}`);

    if (messageId && container) {
      let msg = document.createElement('div');

      msg.id = `vm__${messageId}`;
      msg.className = `vm__message_block ${this.messages[messageId].type}`;
      msg.innerHTML = `
        <div class="vm__header">
            <h4 class="vm__title">Message</h4>
            <button class="vm__btn vm__remove" data-id="${messageId}" onclick="document.getElementById('vm__${messageId}').remove()">&times;</button>
        </div>
        <div class="vm__text">${this.messages[messageId].text}</div>
        <div class="vm__time_status"><span id="vm__line_${messageId}" class="vm__line"></span></div>
      `;
      /* Adding new element in DOM */
      container.insertBefore(msg, container.firstChild);

      /* Timer */
      let target = document.getElementById(`vm__${messageId}`);
      // Time to hide - in seconds
      let lifeTime = this.DEFAULT_OPTIONS.duration;
      let maxTime = this.DEFAULT_OPTIONS.duration;
      // Auto close
      let timerClear = false;
      // Timer Identification
      let timerID;

      // Create SetTimeout Timer
      let timer = (stop) => {
        if (stop === true) {
          clearTimeout(timerID);

          timerClear = false;
        }
        else {
          timerID = setTimeout(function UpdateTime() {
            lifeTime -= 0.1;
            // Time different in percent for timer status bar
            let timeDiff = (lifeTime / (maxTime / 100));

            document.getElementById(`vm__line_${messageId}`).style.width = `${timeDiff}%`;

            if (lifeTime < 0) {
              timerClear = true;

              document.getElementById(`vm__${messageId}`).remove();
            }
            else {
              timer(timerClear);
            }
          }, 100);
        }
      }
      // Stop timer
      let stopTimer = () => {
        timer(true);
      }

      /* Run timer for new created element */
      timer(timerClear);

      target.addEventListener("mouseenter", () => stopTimer());
      target.addEventListener("mouseleave", () => {if (timerClear === false) timer(false);});
    }
    else {
      return false;
    }
  }

  /* Adding styles in header */
  addStyleInHeader() {
    let css = this.containerStyle(),
        head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');

    style.appendChild(document.createTextNode(css));

    head.appendChild(style);
  }
  /* Plugin styles */
  containerStyle() {
    let css = `
      .vm__messages_wrapper {
        display: flex;
        flex-direction: column-reverse;
        justify-content: flex-start;
        align-items: flex-end;
        position: absolute;
        ${(this.DEFAULT_OPTIONS.position.top != null) ? `top: ${this.DEFAULT_OPTIONS.position.top}px;` : ``}
        ${(this.DEFAULT_OPTIONS.position.bottom != null) ? `bottom: ${this.DEFAULT_OPTIONS.position.bottom}px;` : ``}
        ${(this.DEFAULT_OPTIONS.position.left != null) ? `left: ${this.DEFAULT_OPTIONS.position.left}px;` : ``}
        ${(this.DEFAULT_OPTIONS.position.right != null) ? `right: ${this.DEFAULT_OPTIONS.position.right}px;` : ``}
      }
      .vm__message_block {
        max-width: 300px;
        min-width: 300px;
        width: 100%;
        margin: 0px 0px 20px;
        padding: 0px;
        background: #ffffff;
        border: 1px solid #cfcfcf;
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        overflow: hidden;
      }
      .vm__header {
        width: 100%;
        height: 28px;
        padding: 4px 32px 4px 12px;
        background: #efefef;
        border-bottom: 1px solid #cfcfcf;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        position: relative;
      }
      .vm__title {
        width: 100%;
        font-size: 16px;
        font-weight: 600;
        line-height: 1;
        text-align: left;
        margin: 0px;
      }
      .vm__btn {
        width: 24px;
        height: 24px;
        font-size: 18px;
        font-weight: 600;
        line-height: 1;
        text-align: center;
        color: #000000;
        background: none;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        outline: none;
        position: absolute;
        top: 2px;
        right: 2px;
      }
      .vm__text {
        width: 100%;
        margin: 0px;
        padding: 8px 8px 8px 12px;
        font-size: 16px;
        font-weight: 400;
        line-height: 1.4;
        text-align: left;
        color: #000000;
      }
      .vm__time_status {
        width: 100%;
        height: 6px;
        margin: 6px 0px 0px 0px;
        background: #f0f0f0;
        border-radius: 50px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: stretch;
      }
      .vm__line {
        width: 100%;
        height: 100%;
        background: #cfcfcf;
        border-radius: 50px;
        transition: all .1s ease;
      }
    `;
    
    let colorSchema = `
      .vm__message_block.primary {border-color: #007bff;}
      .vm__message_block.primary .vm__header, 
      .vm__message_block.primary .vm__btn {color: #ffffff; background-color: #007bff;}
      .vm__message_block.primary .vm__line {background-color: #007bff; opacity: 0.75;}
      .vm__message_block.secondary {border-color: #545b62;}
      .vm__message_block.secondary .vm__header, 
      .vm__message_block.secondary .vm__btn {color: #ffffff; background-color: #545b62;}
      .vm__message_block.secondary .vm__line {background-color: #545b62; opacity: 0.75;}
      .vm__message_block.success {border-color: #28a745;}
      .vm__message_block.success .vm__header, 
      .vm__message_block.success .vm__btn {color: #ffffff; background-color: #28a745;}
      .vm__message_block.success .vm__line {background-color: #28a745; opacity: 0.75;}
      .vm__message_block.danger {border-color: #bd2130;}
      .vm__message_block.danger .vm__header, 
      .vm__message_block.danger .vm__btn {color: #ffffff; background-color: #bd2130;}
      .vm__message_block.danger .vm__line {background-color: #bd2130; opacity: 0.75;}
      .vm__message_block.warning {border-color: #ffc107;}
      .vm__message_block.warning .vm__header, 
      .vm__message_block.warning .vm__btn {color: #ffffff; background-color: #ffc107;}
      .vm__message_block.warning .vm__line {background-color: #ffc107; opacity: 0.75;}
      .vm__message_block.info {border-color: #117a8b;}
      .vm__message_block.info .vm__header, 
      .vm__message_block.info .vm__btn {color: #ffffff; background-color: #117a8b;}
      .vm__message_block.info .vm__line {background-color: #117a8b; opacity: 0.75;}
      .vm__message_block.light {border-color: #dae0e5;}
      .vm__message_block.light .vm__header, 
      .vm__message_block.light .vm__btn {color: #212529; background-color: #dae0e5;}
      .vm__message_block.light .vm__line {background-color: #dae0e5; opacity: 0.75;}
      .vm__message_block.dark {border-color: #343a40;}
      .vm__message_block.dark .vm__header, 
      .vm__message_block.dark .vm__btn {color: #ffffff; background-color: #343a40;}
      .vm__message_block.dark .vm__line {background-color: #343a40; opacity: 0.75;}
    `;

    let styles = css + colorSchema;

    return styles;
  }

  /* Controller options */
  MESSAGES_WRAPPER_NAME = 'vm__messages_wrapper';
  DEFAULT_OPTIONS = {
    duration: 20, // sec.
    position: {
      right: 10,
      top: 10
    }, // in px
  }
}

export default new MessagesController();
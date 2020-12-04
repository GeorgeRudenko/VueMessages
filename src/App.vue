<template>
  <div class="project-wrapper">
    <!-- Language Example -->
    <h2 class="title">Отображение сообщений</h2>
    
    <div class="btn_wrapper">
      <button class="btn primary" v-on:click="this.$messages('Primary message...', 'primary')">Primary</button>
      <button class="btn secondary" v-on:click="this.$messages('Secondary message...', 'secondary')">Secondary</button>
      <button class="btn success" v-on:click="this.$messages('Success message...', 'success')">Success</button>
      <button class="btn danger" v-on:click="this.$messages('Danger message...', 'danger')">Danger</button>
      <button class="btn warning" v-on:click="this.$messages('Warning message...', 'warning')">Warning</button>
      <button class="btn info" v-on:click="this.$messages('Info message...', 'info')">Info</button>
      <button class="btn light" v-on:click="this.$messages('Light message...', 'light')">Light</button>
      <button class="btn dark" v-on:click="this.$messages('Dark message...', 'dark')">Dark</button>
    </div>

    <hr>

    <div class="input_wrapper">
      <div class="block">
        <label for="custom_message__text" class="label">Message text</label>
        <textarea name="custom_message__text" id="custom_message__text" placeholder="The text to be displayed in the message..." v-model="message.text" cols="30" rows="10"></textarea>
      </div>
      
      <div class="block">
        <label for="custom_message__text" class="label">Message type</label>
        <select name="custom_message__type" id="custom_message__type" v-model="message.type" class="select">
          <option value="primary">Primary</option>
          <option value="secondary">Secondary</option>
          <option value="success">Success</option>
          <option value="danger">Danger</option>
          <option value="warning">Warning</option>
          <option value="info">Info</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      
      <div class="block">
        <button class="btn primary" v-on:click="viewMessage()">View message</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      message: {
        type: 'primary',
        text: ''
      }
    }
  },
  mounted() {
    this.$initVueMessages({
      duration: 5,
      position: {
        left: 10,
        right: null,
        top: 10,
        bottom: null
      }
    });
  },
  methods: {
    viewMessage() {
      this.$messages(this.message.text, this.message.type);
    },
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

hr {
  width: 768px;
  height: 1px;
  
  margin: 28px 0px;
  
  background: #000;
}

.project-wrapper {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.btn_wrapper {
  max-width: 768px;
  width: 100%;
  margin: 20px 0px 0px 0px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.btn {
  width: 220px;
  height: 48px;
  
  margin: 12px;
  padding: 4px;
  
  font-size: 18px;
  font-weight: 600;
  
  color: #242424;
  background: #ffffff;
  
  border: 2px solid #242424;
  border-radius: 6px;
  
  cursor: pointer;
}
.btn.primary {
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
}
.btn.secondary {
  color: #fff;
  background-color: #5a6268;
  border-color: #545b62;
}
.btn.success {
  color: #fff;
  background-color: #28a745;
  border-color: #28a745;
}
.btn.danger {
  color: #fff;
  background-color: #c82333;
  border-color: #bd2130;
}
.btn.warning {
  color: #212529;
  background-color: #ffc107;
  border-color: #ffc107;
}
.btn.info {
  color: #fff;
  background-color: #138496;
  border-color: #117a8b;
}
.btn.light {
  color: #212529;
  background-color: #e2e6ea;
  border-color: #dae0e5;
}
.btn.dark {
  color: #fff;
  background-color: #343a40;
  border-color: #343a40;
}

.input_wrapper {
  width: 768px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.input_wrapper .block {
  width: 100%;
  margin: 0px 0px 14px 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.input_wrapper .block .label {
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  line-height: 1;
  text-align: left;
  margin: 0px 0px 4px 0px;
  color: #242424;
}
.input_wrapper .block textarea,
.input_wrapper .block select {
  width: 100%;
  height: 120px;
  font-size: 16px;
  font-weight: 400;
  padding: 8px;
  border: 1px solid #686868;
  border-radius: 6px;
  outline: none;
  resize: none;
}
.input_wrapper .block select {
  height: 42px;
}
.input_wrapper .block .btn {
  margin: 0px 0px 14px 0px;
}
</style>
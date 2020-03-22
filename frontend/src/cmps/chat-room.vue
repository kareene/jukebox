<template>
  <aside class="chat-room">
    <div
      class="chat-msg-line"
      :key="index"
      v-for="(message , index) in messages"
    >{{message.user}} :{{message.txt}}</div>

    <form class="chat-room-form" @submit.prevent="addMessage">
      <input
        class="chat-input"
        v-model="newMessage.txt"
        type="text"
        placeholder="Enter your massage here..."
      />
      <button class="send-mgs-btn buttons">Send</button>
    </form>
  </aside>
</template>

<script>
export default {
  name: "chatRoom",
  props: {
    currStation: Object
  },
  data() {
    return {
      newMessage: {
        txt: "",
        user: "Rotem"
      },
      messages: [],
      roomName: this.currStation._id
    };
  },
  methods: {
    pushMessage() {
      this.messages.push(this.newMessage);
    },
    addMessage() {
      this.pushMessage();
      this.newMessage = {
        txt: "",
        user: "Rotem"
      };
      setTimeout(() => {
        const randomMsg = {
          txt: "hi to u too!",
          user: "some one"
        };
        this.messages.push(randomMsg);
      }, 3000);
    }
  }
};
</script>
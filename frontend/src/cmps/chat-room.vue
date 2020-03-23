<template>
  <aside class="chat-room">
    <div
      class="chat-msg-line"
      v-bind:class="[(message.user===currUser) ? 'user-msg-bubble' : 'others-msg-bubble']"
      :key="index"
      v-for="(message , index) in messages">
      <label class="user-name-title">{{message.user}}:</label>
    {{message.txt}}</div>

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
      currUser: "",
      newMessage: {
        txt: "",
        user: ""
      },
      messages: [],
      roomName: this.currStation._id
    };
  },

  created() {
    this.currUser = localStorage.getItem("user");
    if (!this.currUser) {
      this.currUser = prompt("your name is?");
      localStorage.setItem("user", this.currUser);
    }
    this.newMessage.user=this.currUser;
  },
  methods: {
    pushMessage() {
      console.log(this.newMessage);
      this.messages.push(this.newMessage);
    },
    addMessage() {
      this.pushMessage();
      this.newMessage = {
        txt: "",
        user: this.currUser
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
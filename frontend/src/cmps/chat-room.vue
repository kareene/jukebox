<template>
  <aside class="chat-room">
    <section class="msgs-sec" ref="scrollToHere">
      <label :style="{ visibility: userTyping ? 'visible' : 'hidden' }">{{userTyping}} is Typing...</label>
      <div
        class="chat-msg-line"
        v-bind:class="[(message.user===currUser) ? 'user-msg-bubble' : 'others-msg-bubble']"
        :key="index"
        v-for="(message , index) in messages"
      >
        <label class="user-name-title">{{message.user}}:</label>
        <div>{{message.txt}}</div>
      </div>
      <!-- <div class="the-bar" ref="scrollToHere"></div> -->
    </section>

    <form class="chat-room-form" @submit.prevent="sendMsg">
      <input
        class="chat-input"
        v-model="newMessage.txt"
        type="text"
        placeholder="Enter your massage here..."
        @input="sendTyping"
      />
      <button class="send-mgs-btn buttons">Send</button>
    </form>
  </aside>
</template>

<script>
import socketService from "../services/socket.service.js";

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
      userTyping: "",
      timeout: null
    };
  },
  computed: {
    scrollToHere() {
      return this.$refs.scrollToHere;
    },
    loggedinUser() {
      return this.$store.getters.loggedinUser.fullName;
    },
    username() {
      return this.loggedinUser ? this.loggedinUser : "Guest";
    }
  },
  created() {

    socketService.setup();
    socketService.on("chat addMsg", this.addMsg);
    socketService.emit("chat room", this.currStation._id);
    socketService.on("chat displayTyping", this.displayTyping);
  },
  destroyed() {
    socketService.off("chat addMsg", this.addMsg);
    socketService.off("chat displayTyping", this.displayTyping);
    socketService.terminate();
  },
  methods: {
    scrollToBottom() {
      // this.scrollToHere.scrollTop = this.scrollToHere.scrollHeight;   ref on parent
      this.scrollToHere.scrollIntoView();
    },
    addMsg(msg) {
      this.messages.push(msg);
      this.scrollToBottom();
    },
    sendMsg() {
      if (!this.newMessage.txt) return;
      this.newMessage.user = this.username;
      this.currUser = this.newMessage.user;
      socketService.emit("chat newMsg", this.newMessage);
      this.newMessage.txt = "";
    },
    sendTyping() {
      socketService.emit("chat userTyping", this.username);
    },
    displayTyping(username) {
      this.userTyping = username;
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.userTyping = "";
      }, 1000);
    }
  }
};
</script>
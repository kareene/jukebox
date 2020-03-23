<template>
  <article v-if="toy" class="chat-app">
    <h3 slot="header" @click="toggleChat">Chat with Us</h3>
    <pop-up v-if="isChatOpen" @close="toggleChat">
      <p>Chat about {{toy.name}}</p>
      <p :style="{ visibility: userTyping ? 'visible' : 'hidden' }">{{userTyping}} is Typing...</p>
      <ul class="messages">
        <li v-for="(msg, idx) in chatMsgs" :key="idx"><span>{{msg.from}}: </span>{{msg.txt}}</li>
        <br ref="scrollToHere" />
      </ul>
      <p>Press ESC to close chat</p>
      <form slot="footer" @submit.prevent="sendMsg">
        <input type="text" v-model="currMsgTxt" @input="sendTyping" />
        <button>Send</button>
      </form>
    </pop-up>
  </article>
</template>

<script>
import socketService from '@/services/socket.service.js';
import popUp from '@/cmps/pop-up.vue';

export default {
  props: {
    toy: Object
  },
  data() {
    return {
      isChatOpen: false,
      chatMsgs: [],
      currMsgTxt: '',
      userTyping: '',
      timeout: null
    }
  },
  created() {
    socketService.setup();
    socketService.on('chat addMsg', this.addMsg);
    socketService.on('chat displayTyping', this.displayTyping);

  },
  destroyed() {
    socketService.off('chat addMsg', this.addMsg);
    socketService.off('chat displayTyping', this.displayTyping);
    socketService.terminate();
  },
  watch: {
    chatMsgs: {
      handler() {
        this.scrollToBottom();
      },
      deep: true
    },
    toy() {
      socketService.emit('chat topic', this.toy._id);
      this.chatMsgs = JSON.parse(localStorage.getItem(`chatMsgs-${this.toy._id}`));
      if (!this.chatMsgs) this.chatMsgs = [];
    }
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    },
    username() {
      return (this.loggedinUser) ? this.loggedinUser.username : 'guest user';
    }
  },
  methods: {
    scrollToBottom() {
      if (this.$refs.scrollToHere) this.$refs.scrollToHere.scrollIntoView();
    },
    toggleChat() {
      this.isChatOpen = !this.isChatOpen;
      if (this.isChatOpen) setTimeout(() => {
        this.scrollToBottom();
      }, 20)
    },
    addMsg(msg) {
      this.chatMsgs.push(msg);
      localStorage.setItem(`chatMsgs-${this.toy._id}`, JSON.stringify(this.chatMsgs));  
    },
    sendMsg() {
      if (!this.currMsgTxt) return;
      const msg = { from: this.username, txt: this.currMsgTxt };
      socketService.emit('chat newMsg', msg);
      this.currMsgTxt = '';
    },
    sendTyping() {
      socketService.emit('chat userTyping', this.username);
    },
    displayTyping(username) {
      this.userTyping = username;
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.userTyping = '';
      }, 1000);
    }
  },
  components: {
    popUp
  }
};
</script>
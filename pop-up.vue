<template>
  <section class="pop-up">
    <slot name="header"></slot>
    <slot></slot>
    <slot name="footer"></slot>
  </section>
</template>

<script>
export default {
  created() {
    document.addEventListener('keyup', this.escapeKeyListener);

  },
  destroyed() {
    document.removeEventListener('keyup', this.escapeKeyListener);
  },
  methods: {
    escapeKeyListener(ev) {
      if (ev.keyCode === 27) {
        this.$emit('close');
      }
    }
  }
}
</script>
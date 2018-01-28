const app = new Vue({
  el: '#app',
  data() {
    return {
      show: false
    }
  },
  methods: {
    handleClose() {
      this.show = false;
    }
  }
});

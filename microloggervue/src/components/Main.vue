<template>
  <div class="main">
    <button @click="on_off()">On/Off</button>
    <Grid :datalogs="logs" :columns="gridColumns" :filter-key="searchQuery" />
  </div>
</template>

<script>
import io from "socket.io-client";
import Grid from "./Grid.vue";

export default {
  name: "Main",
  components: {
    Grid,
  },
  data: () => ({
    error: "",
    onOff: true,
    socket: io("localhost:3001"),
    logs: [],
    gridColumns: [
      "ip",
      "date",
      "reqinfo",
      "codehttp",
      "code",
      "result",
      "userAgent",
    ],
  }),
  mounted() {
    fetch("http://localhost:3001/logs")
      .then((response) => response.json())
      .then((result) => {
        this.logs = result;
      });
    this.socket.on("logs", (data) => {
      this.logs = [...this.logs, data];
    });
  },
  methods: {
    on_off() {
      if (this.onOff) {
        this.socket.disconnect();
        this.onOff = false;
      } else {
        this.socket.connect();
        this.onOff = true;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #00bdf0;
}
</style>

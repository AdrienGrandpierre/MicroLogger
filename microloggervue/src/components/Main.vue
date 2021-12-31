<template>
  <div class="main">
    <small>{{ logs }}</small>
  </div>
</template>

<script>
import io from "socket.io-client";

export default {
  name: "Main",
  data: () => ({
    error: "",
    socket: io("localhost:3001"),
    logs: [],
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
  color: #42b983;
}
</style>

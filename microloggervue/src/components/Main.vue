<template>
  <div class="main">
    <Grid 
      :datalogs="gridData"
      :columns="gridColumns"
      :filter-key="searchQuery"/>
    <small>{{ logs }}</small>
  </div>
</template>

<script>
import io from "socket.io-client";
import Grid from "./Grid.vue";

export default {
  name: "Main",
  components:{
    Grid,
  },
  data: () => ({
    error: "",
    socket: io("localhost:3001"),
    logs: [],
    gridColumns: ["ip", "date", "reqinfo", "codehttp", "code", "result", "userAgent"],
          gridData: [
            {
              ip: "ip",
              date: "date",
              reqinfo: "reqinfo",
              codehttp: "codehttp",
              code: "code",
              result: "result",
              userAgent: "userAgent"
            }
          ]
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
  color: #00BDF0;
}
</style>

<template>
  <div> 
    <canvas 
    ref="momo" 
    width="800" 
    height="500"
    style="border: 1px solid black;">
    </canvas>
  </div>
</template>

<script>
  import io from "socket.io-client"; // import socket.io
  export default {
    name: 'MomosPlayground',
    data() {
      return {
        socket: {}, // to initalize the socket
        context: {}, // this is for the canvas
        position: {
          x: 0,
          y: 0
        }
      }
    },
    created() { // now we have to establish connection before VUE renders. 
      this.socket = io("http://localhost:3000"); // the socket from data. and specify location. 
    }, 
    mounted() { //AFTER VUE RENDERS we want to interact with the canvas. 
      console.log("HI")
      this.context = this.$refs.momo.getContext('2d'); // context refers to canvas. ref is our game we set as ref before in app.vue. This line is like a query to get the canvas and then apply getContext like from the other tutuorial. 
      this.socket.on("position", data => {
        this.context.fillRect(this.position.x, this.position.y, 2000, 2000) // Make shape. Inside socket.on listen so we can get pos from server. 
        this.position = data; // PROBLEM HERE
        this.context.clearRect(0, 0, 0, this.$refs.momo.width, this.$ref.momo.height);  
      });
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

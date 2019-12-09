<template>
  <div class="wnd-area">
    <!-- Window 1 -->
    <!-- <wnd-component
      :visible.sync="isVisibleWindow2"
      :initial-position="[160, 160]"
      @require-inner-item="window2RequireInnerItem"
    ></wnd-component>
    <div ref="window2Inner" class="window-second-inner">
      <img src="img/shopping.jpg" alt="neko" style="border-radius:50%" />
    </div>-->

    <wnd-component
      :visible.sync="isVisibleWindow2"
      :initial-position="[200, 200]"
      @require-inner-item="window2RequireInnerItem"
    ></wnd-component>
    <div ref="window2Inner" class="window-second-inner">
      <img src="img/shopping.jpg" style="margin:0px 1em;border-radius:50%;" align="left" />
      <!-- <img src="img/shopping.jpg" style="border-radius:50%;float:left;" /> -->
      <p
        style="text-align:left;word-break: break-all;font-size:1.0em;"
      >XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</p>
      <!-- <p>XXXXXXXXXX</p>
      <p>XXXXXXXXXX</p>
      <p>XXXXXXXXXX</p>-->
      <br clear="left" />
      <img src="img/hakoneko.png" style="width:100%;height:100%;" />
    </div>

    <!-- Window 2 -->
    <!-- <wnd-component
      :visible.sync="isVisibleWindow2"
      :initial-position="[160, 160]"
      @require-inner-item="window2RequireInnerItem"
    ></wnd-component>
    <div ref="window2Inner" class="window-second-inner">
      <img src="img/shopping.jpg" alt="neko" style="border-radius:50%" />
    </div>-->
  </div>
</template>

<script>
import store from "./store.js";
import wndComponent from "./wnd.vue";

export default {
  components: {
    wndComponent
  },
  data: function() {
    return {
      isVisibleWindow: true, //Window1 visible
      isVisibleWindow2: true, //Window2 visible
      isVisibleWindow3: true //Window3 visible
    };
  },
  store,
  methods: {
    window1RequireInnerItem: function(callback) {
      //ウインドウ1に内包すべき要素を設定
      callback(this.$refs.window1Inner);
    },
    window2RequireInnerItem: function(callback) {
      //ウインドウ2に内包すべき要素を設定
      callback(this.$refs.window2Inner);
    },
    window3RequireInnerItem: function(callback) {
      //ウインドウ3に内包すべき要素を設定
      callback(this.$refs.window3Inner);
    },
    buttonClicked: function(item) {
      //押されたボタンを表示する
      alert(`押されたボタンは「${item.caption}」`);
    }
  }
};
</script>

<style scoped>
.wnd-area {
  width: 100%;
  height: 100%;
  position: absolute;
  user-select: none;
  /* background-color: black; */
}
.window-first-inner {
  width: 200px;
  height: 100px;
  color: white;
}
.window-second-inner,
.window-third-inner {
  color: #000;
}
.window-second-inner img {
  display: block;
  width: 100px;
  height: 100px;
}
</style>

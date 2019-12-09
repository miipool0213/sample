<template>
  <transition v-on:enter="enter">
    <div
      class="wnd_outer"
      v-show="_visible"
      v-bind:style="{
                width: this._width,
                height: this._height,
                left: this._x,
                top: this._y,
                zIndex: this.zIndex,
             }"
    >
      <!-- <img src="img/shopping.jpg" style="width:50%;height:50%;border-radius:50%;" align="left" />
      <p>XXXXXXXXXX</p>-->

      <!-- <div class="bg_screen" v-if="dialogMode"></div>
      <div class="caption" @mousedown.prevent="mousedown">{{ caption }}</div>-->
      <!-- <div
        class="wnd_inner"
        ref="wndInner"
        v-bind:class="{wnd_inner_withbtn: selectButtons.length > 0 }"
      ></div>-->
      <div class="wnd_inner" ref="wndInner"></div>

      <!-- <div class="wnd_button_outer" ref="buttonOuter" v-if="selectButtons.length">
        <button
          v-for="(item, index) in selectButtons"
          :key="index"
          class="button_item"
          @click="buttonClicked(item)"
        >{{ item.caption }}</button>
      </div>-->
    </div>
  </transition>
</template>

<script>
export default {
  data: function() {
    return {
      wndID: 0,
      x: null,
      y: null,
      cursorOffset: { x: 0, y: 0 },
      cursorStartPos: null,
      stateAtSizeChangeStarted: { width: 0, height: 0, cursorX: 0, cursorY: 0 },
      width: this.initialWidth,
      height: this.initialHeight
    };
  },
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    caption: {
      type: String,
      default: ""
    },
    initialPosition: {
      type: Array,
      default: null
    },
    sizeChangeEnable: {
      type: Boolean,
      default: true
    },
    initialWidth: {
      type: Number,
      default: 0
    },
    initialHeight: {
      type: Number,
      default: 0
    },
    selectButtons: {
      type: Array,
      default: () => []
    },
    dialogMode: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    _visible: function() {
      if (this.visible) {
        this.$emit("opened");
      } else {
        this.$emit("closed");
      }
      return this.visible;
    },
    _width: function() {
      return this.width ? `${this.width}px` : "auto";
    },
    _height: function() {
      return this.height ? `${this.height}px` : "auto";
    },
    _x: function() {
      return `${this.x}px`;
    },
    _y: function() {
      return `${this.y}px`;
    },
    zIndex: function() {
      return this.$store.state.wndStatuses[this.wndID].zIndex || 0;
    }
  },
  created: function() {
    this.wndID = this.$store.state.wndCount;
    this.$store.dispatch("setWndStatuses", {
      wndID: this.$store.state.wndCount
    });
  },
  mounted: function() {
    this.$emit("require-inner-item", el => {
      this.$refs.wndInner.appendChild(el);
      //（v-show=falseの時は要素の高さが取れないので初期化しない）
      if (this.visible && this.$el) {
        this.setInitialState();
      }
    });
  },
  methods: {
    //
    //  Initialize
    //

    enter: function() {
      this.setInitialState();
    },
    setInitialState: function() {
      //v-ifなどで要素自体が取れない場合は処理を中断
      if (!this.$el || !this.$refs.wndInner) return;
      let buttonItemRect = null;
      if (this.selectButtons.length) {
        buttonItemRect = this.$refs.buttonOuter.getBoundingClientRect();
      }
      let innerItemRect = this.$refs.wndInner.getBoundingClientRect();
      this.width = this.initialWidth || innerItemRect.width;
      this.height =
        (this.initialHeight || innerItemRect.height) +
        22 +
        (this.selectButtons.length && buttonItemRect
          ? buttonItemRect.height
          : 0);

      //初期化が済んでいれば処理を終了
      if (this.x !== null && this.y !== null) return;
      if (this.initialPosition && this.initialPosition.length === 2) {
        this.x = this.initialPosition[0];
        this.y = this.initialPosition[1];
      } else {
        this.x = window.innerWidth / 2 - this.$el.clientWidth / 2;
        this.y = window.innerHeight / 2 - this.$el.clientHeight / 2;
      }
    },

    //
    //  Change position
    //

    mousedown: function(e) {
      this.cursorOffset.x = e.pageX;
      this.cursorOffset.y = e.pageY;
      this.cursorStartPos = { x: this.x, y: this.y };
      document.addEventListener("mousemove", this.mousemove);
      document.addEventListener("mouseup", this.mouseup);
      this.$store.dispatch("moveWndToTop", { wndID: this.wndID });
    },
    mousemove: function(e) {
      this.x = this.cursorStartPos.x + (e.pageX - this.cursorOffset.x);
      this.y = this.cursorStartPos.y + (e.pageY - this.cursorOffset.y);
    },
    mouseup: function(e) {
      this.cursorStartPos = null;
      document.removeEventListener("mousemove", this.mousemove);
      document.removeEventListener("mouseup", this.mouseup);
    },

    //
    //  Resize window
    //

    startSizeChange: function(e) {
      let wndRect = this.$el.getBoundingClientRect();
      this.stateAtSizeChangeStarted = {
        width: wndRect.width,
        height: wndRect.height,
        cursorX: e.pageX,
        cursorY: e.pageY
      };
      document.addEventListener("mousemove", this.whileSizeChange, false);
      document.addEventListener("mouseup", this.endSizeChange, false);
    },
    whileSizeChange: function(e) {
      this.width =
        this.stateAtSizeChangeStarted.width +
        e.pageX -
        this.stateAtSizeChangeStarted.cursorX;
      this.height =
        this.stateAtSizeChangeStarted.height +
        e.pageY -
        this.stateAtSizeChangeStarted.cursorY;
    },
    endSizeChange: function(e) {
      document.removeEventListener("mousemove", this.whileSizeChange, false);
      document.removeEventListener("mouseup", this.endSizeChange, false);
    },

    //
    //  Buttons
    //

    buttonClicked: function(item) {
      this.$emit("button-clicked", item);
    },
    closeButtonClicked: function() {
      this.$emit("closed");
      this.$emit("update:visible", false);
    }
  }
};
</script>

<style scoped>
.wnd_outer {
  /* position: fixed; */
  position: relative;
  background-color: white;
  width: 100%;
  /* height: 100%; */
  background-color: rgba(0, 0, 0, 0);
  z-index: 1000;
  position: relative;
  display: inline-block;
  margin: 1.5em 0;
  padding: 1em;
  min-width: 12em;
  max-width: 100%;
  text-align: center;
  color: #333;
  font-size: 16px;
  /* background: #eee; */
  background: #fff;
  /* border: solid 3px #ccc; */
  border-radius: 0.5em;
  box-sizing: border-box;
  -webkit-filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.3));
}
.wnd_outer:before {
  content: "";
  position: absolute;
  bottom: -24px;
  left: 50%;
  margin-left: -15px;
  border: 12px solid transparent;
  border-top: 12px solid #fff;
  z-index: 2;
}
.wnd_outer:after {
  content: "";
  position: absolute;
  bottom: -30px;
  left: 50%;
  margin-left: -17px;
  border: 14px solid transparent;
  /* border-top: 14px solid #ccc; */
  z-index: 1;
}
.wnd_inner {
  width: 100%;
  height: calc(100% - 22px);
  /* height: 100%; */
  position: relative;
}
.wnd_inner_withbtn {
  height: calc(100% - 67px);
}
.wnd_button_outer {
  position: absolute;
  width: 100%;
  height: 45px;
  text-align: center;
}
.button_item {
  height: 30px;
  min-width: 90px;
  padding: 5px 15px;
  margin-top: 9px;
  margin-left: 5px;
  border-style: solid;
  border-color: black;
  border-width: 1px 3px 3px 1px;
  border-radius: 3px;
  background-color: #333;
  color: white;
  cursor: pointer;
  position: relative;
  box-sizing: border-box;
  display: inline-block;
  vertical-align: top;
}
.button_item:active {
  border-width: 1px;
  top: 2px;
  left: 2px;
}
.bg_screen {
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
</style>

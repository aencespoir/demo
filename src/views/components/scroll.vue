<template>
  <div class="Scroll" ref="ScrollRef">
    <div class="empty">AENCESPOIR</div>
    <div ref="playgroundRef" class="playground">
      <div class="animation-container">
        <div ref="listRef" class="list">
          <div ref="listItemRef" :dataOrder="el.orderVal" class="list-item" v-for="(el, index) in data" :key="index">
            <img :src="require(`@assets/images/${el.url}`)" alt="/">
            <div class="name">{{  el.name  }}</div>
            <div class="desc">{{  el.desc  }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="empty">EMPTY</div>
  </div>
</template>

<script>
export default {
  name: 'Scroll',
  data() {
    return {
      ss: null,
      data: [
        { url: '0.png', orderVal: 3, name: '姓名', desc: '某某岗位高管' },
        { url: '1.png', orderVal: 1, name: '姓名', desc: '某某岗位高管' },
        { url: '2.png', orderVal: 2, name: '姓名', desc: '某某岗位高管' },
        { url: '3.png', orderVal: 0, name: '姓名', desc: '某某岗位高管' },
        { url: '4.png', orderVal: 2, name: '姓名', desc: '某某岗位高管' },
        { url: '5.png', orderVal: 1, name: '姓名', desc: '某某岗位高管' },
        { url: '6.png', orderVal: 3, name: '姓名', desc: '某某岗位高管' },
        { url: '7.png', orderVal: 0, name: '姓名', desc: '某某岗位高管' },
        { url: '8.png', orderVal: 1, name: '姓名', desc: '某某岗位高管' },
        { url: '9.png', orderVal: 2, name: '姓名', desc: '某某岗位高管' },
        { url: '10.png', orderVal: 0, name: '姓名', desc: '某某岗位高管' },
        { url: '11.png', orderVal: 2, name: '姓名', desc: '某某岗位高管' },
        { url: '12.png', orderVal: 1, name: '姓名', desc: '某某岗位高管' },
        { url: '13.png', orderVal: 3, name: '姓名', desc: '某某岗位高管' },
        { url: '14.png', orderVal: 0, name: '姓名', desc: '某某岗位高管' },
        { url: '15.png', orderVal: 2, name: '姓名', desc: '某某岗位高管' },
        { url: '16.png', orderVal: 2, name: '姓名', desc: '某某岗位高管' },
        { url: '17.png', orderVal: 3, name: '姓名', desc: '某某岗位高管' }
      ]
    }
  },
  props: {},
  components: {},
  methods: {
    initAnimation() {
      this.ss = this.$refs.ScrollRef
      const items = this.$refs.listItemRef
      const list = this.$refs.listRef
      const playGround = this.$refs.playgroundRef
      let ssY = 0

      // 创建一个动画函数
      function createAnimation(scrollStart, scrollEnd, valueStart, valueEnd) {
        return function(scroll) {
          // 当给定的值在开始位置之前， 返回当前的值，之后则同理
          if (scroll < scrollStart) {
            return valueStart
          }
          if (scroll >= scrollEnd) {
            return valueEnd
          }
          // 在之间：
          return valueStart + (valueEnd - valueStart) * (scroll - scrollStart) / (scrollEnd - scrollStart)
        }
      }

      const animationMap = new Map()
      function getAnimationMap(scrollStart, scrollEnd, dom) {
        scrollStart = scrollStart + dom.getAttribute("dataOrder") * 400
        // 透明度
        const opacityAnimation =  createAnimation(scrollStart, scrollEnd, 0, 1)
        const opacity = function(scroll) {
          return opacityAnimation(scroll)
        }
        // 缩放
        const scaleAnimation =  createAnimation(scrollStart, scrollEnd, 0.5, 1)
        const xAnimation = createAnimation(scrollStart, scrollEnd,  list.clientWidth / 2 - dom.offsetLeft - dom.clientWidth / 2, 0 )
        const yAnimation = createAnimation(scrollStart, scrollEnd,  list.clientHeight / 2 - dom.offsetTop - dom.clientHeight / 2, 0 )
        const transform = function(scroll) {
          return `translate(${xAnimation(scroll)}px, ${yAnimation(scroll)}px) scale(${scaleAnimation(scroll)})`
        }
        return {
          opacity,
          transform
        }
      }

      // 生成各个元素的样式组合 Map
      function updateMap() {
        animationMap.clear()
        const stemp = Math.floor(list.clientHeight / 2) + 100
        const playGroundRect = playGround.getBoundingClientRect()
        const scrollStart = playGroundRect.top + ssY - stemp
        const scrollEnd = playGroundRect.bottom + ssY - window.innerHeight
        for(const item of items) {
          animationMap.set(item, getAnimationMap(scrollStart, scrollEnd, item))
        }
      }
      updateMap() // 初始化调用一次

      // 设置元素的样式
      function updateStyle() {
        // 遍历每一个元素
        for(let [dom , value] of animationMap) {
          /**
           * value: {
           *    xxx: function() {}
           * }
           */
          for (const cssProp in value) {
            dom.style[cssProp] = value[cssProp](ssY)
          }
        }
        updateMap()
      }

      updateStyle()

      this.ss.addEventListener('scroll', (e) => {
        this.ssY = Math.floor(e.target.scrollTop)
        updateStyle()
      })
    }
  },
  created() {
    this.$nextTick(() => {
      this.initAnimation()
    })
  },
  beforeDestroy() {
    this.ss.removeEventListener('scroll')
  }
}
</script>

<style lang="less" scoped>
.Scroll {
  width: 100%;
  height: 100%;
  overflow: auto;
  .empty {
    width: 100%;
    height: 100vh;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #666;
    letter-spacing: 2px;
    font-size: 60px;
    font-weight: bold;
  }
  .playground {
    width: 100%;
    height: 2500px;
    // background-color: #ccc;
    .animation-container {
      width: 100%;
      height: 100vh;
      position: sticky;
      top: 0;
      .list {
        --column: 6;
        --row: 2;
        --gap: 50px;
        --ipx: 120px;
        // --paddingTB: calc((100% - (var(--ipx) * var(--row) + var(--gap) * (var(--row) - 1) + var(--ipx) + 100px)) / 4);
        // --paddingLR: calc((100% - (var(--ipx) * var(--column) + var(--gap) * (var(--column) - 1))) / 2);
        width: 100%;
        height: 100%;
        background: #000;
        // padding: var(--paddingTB) var(--paddingLR);
        padding: 0 50px;
        display: grid;
        justify-items: center;
        align-items: center;
        grid-template-columns: repeat(var(--column), calc(100% / var(--column)));
        // grid-template-rows: repeat(var(--row), calc(100% / var(--row)));
        .list-item {
          --imgPx: 70px;
          width: var(--ipx);
          height: calc(var(--ipx) + var(--ipx) / 2);
          padding: 15px;
          border-radius: 10px;
          // background-color: #dedede;
          // box-shadow: 0 0 20px #549922;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: #666;
          cursor: pointer;
          transition: .3s;
          &:hover {
            box-shadow: 0 0 20px #666;
          }
          img {
            width: var(--imgPx);
            height: var(--imgPx);
            border-radius: 50%;
            margin-bottom: 20px;
          }
          .name {
            word-wrap: break-word;
            font-weight: bold;
            margin-bottom: 10px;
            font-size: 14px;
          }
          .desc {
            word-wrap: break-word;
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>

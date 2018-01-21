Vue.component('tabs', {
  template: `
    <div class="tabs">
      <div class="tabs-bar">
        <div
          :class="tabCls(item)"
          v-for="(item, index) in navList"
          @click="handleChange(index)"
        >
        {{item.label}}
        </div>
      </div>

      <div class="tabs-content">
        <slot></slot>
      </div>
    </div>
  `,
  data() {
    return {
      navList: [],
      curValue: this.value
    }
  },
  props: {
    value: {
      type: [String, Number]
    }
  },
  methods: {
    tabCls(item) {
      return [
        'tabs-tab',
        {
          'tabs-tab-active': item.name === this.curValue
        }
      ]
    },
    handleChange(index) {
      this.curValue = this.navList[index].name;

      // 向父传递更新value-activeKey
      this.$emit('input', this.curValue);

      // 触发一个自定义事件，供父级使用
      this.$emit('on-click',  this.curValue);
    },
    getTabs() {
      // 遍历子组件获取所有pane组件
      return this.$children.filter((item) => {
        return item.$options.name === 'pane';
      })      
    },
    updateNav() {
      this.navList.length = 0;

      // debugger;

      this.getTabs().forEach((pane, index) => {
        this.navList.push({
          label: pane.label,
          name: pane.name || index
        });

        (!pane.name) && (pane.name = index);

        // 默认打开第一项
        !index && !this.curValue && (this.curValue = pane.name);
      });

      this.updateStatus();
    },
    updateStatus() {
      this.getTabs().forEach((tab) => {
        tab.show = tab.name === this.curValue;
      })
    }
  },
  watch: {
    value: function(val) {
      this.curValue = value;
    },
    curValue: function() {
      this.updateStatus();
    }
  }
});
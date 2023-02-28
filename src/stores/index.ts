import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { allanStore } from './allan'

export const mainStore = defineStore('main', {
  state: () => {
    return {
      msg: 'Hello world!',
      count: 1
    }
  },
  getters: {
    getCountBuff(state) {
      // getter中的值有缓存特性，如果值没有改变，多次使用也只会调用一次
      console.log('getter被调用', this)
      return `${state.msg}***${state.msg}`
    },
    //从另一个store获取allanStore中的moiveList
    getAllanStoreList(): string[] {
      return allanStore().movieList
    }
  },
  actions: {
    changeState() {
      this.count++
      this.msg = this.msg === 'Hello world!' ? '我是通过actions修改的' : 'Hello world!!!'
    }
  }
})

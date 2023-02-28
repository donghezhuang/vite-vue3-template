import { defineStore } from 'pinia'

export const allanStore = defineStore('allan', {
  state: () => {
    return {
      movieList: ['泰坦尼克号', '绿皮书', '肖申克的救赎', '阿甘正传']
    }
  },
  getters: {},
  actions: {}
})

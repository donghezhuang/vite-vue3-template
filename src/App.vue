<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'

import { mainStore } from '@/stores'
import { storeToRefs } from 'pinia'
import axios from '@/utils/axios'
const store = mainStore()
// 传统方式解构，count不会响应式更新
// Pinia使用storeRoRefs去解构

const { count, msg } = storeToRefs(store)
const addone = () => {
  store.count++
}

// 多条数据修改 $patch
// $patch + 对象
const onObjClick = () => {
  store.$patch({
    count: store.count + 2,
    msg: store.msg === 'Hello world!' ? '疫情快过去吧' : 'Hello world!!!'
  })
}

// $patch + 函数
const onFuncClick = () => {
  store.$patch((state) => {
    state.count = state.count + 2
    state.msg = state.msg === 'Hello world!' ? '疫情快过去吧' : 'Hello world!!'
  })
}

// 通过actions修改多个状态
const actionClick = () => {
  store.changeState()
}

axios
  .get('/users/XPoet')
  .then((res) => {
    console.log('res', res)
  })
  .catch((err) => {
    console.log('err', err)
  })
</script>

<template>
  <button @click="addone">+1</button>
  <button @click="onObjClick">修改所有状态($patch + 对象)</button>
  <button @click="onFuncClick">修改所有状态($patch + 函数)</button>
  <button @click="actionClick">修改所有状态(actions)</button>
  <h2>{{ count }}</h2>
  <h2>{{ msg }}</h2>

  <h2>getter获取数据</h2>
  <div>{{ store.getCountBuff }}</div>
  <div>{{ store.getCountBuff }}</div>
  <div>{{ store.getCountBuff }}</div>
  <div>{{ store.getCountBuff }}</div>

  <h2>store互相调用</h2>
  <ul>
    <li v-for="item in store.getAllanStoreList" :key="item">{{ item }}</li>
  </ul>

  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>

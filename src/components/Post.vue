<template>
    <div class="post-container">
      <h2>Post</h2>
      <select v-model="selectUser" @change="$emit('fetchPosts')">
        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
      </select>
      <div v-for="post in posts" :key="post.id">
        <h3>{{ post.title }}</h3>
        <p>{{ post.body }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['users', 'posts', 'selectedUser']
  };
  </script>
  
  <style scoped>
  /* styling remains the same */
  </style>
  

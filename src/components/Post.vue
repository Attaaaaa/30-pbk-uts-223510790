<template>
  <div class="post-container">
    <h2>Post</h2>
    <select v-model="localSelectedUser" @change="handleUserChange">
      <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
    </select>
    <div v-if="posts && posts.length">
      <div v-for="post in posts" :key="post.id">
        <h3>{{ post.title }}</h3>
        <p>{{ post.body }}</p>
      </div>
    </div>
    <div v-else>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['users', 'selectedUser'],
  data() {
    return {
      localSelectedUser: this.selectedUser,
      posts: []
    };
  },
  watch: {
    selectedUser(newVal) {
      this.localSelectedUser = newVal;
      this.fetchPosts(newVal);
    }
  },
  methods: {
    handleUserChange() {
      this.$emit('update:selectedUser', this.localSelectedUser);
      this.fetchPosts(this.localSelectedUser);
    },
    fetchPosts(userId) {
      axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then(response => {
          this.posts = response.data;
        })
        .catch(error => {
          console.error("Error fetching posts:", error);
          this.posts = [];
        });
    }
  },
  created() {
    if (this.localSelectedUser) {
      this.fetchPosts(this.localSelectedUser);
    }
  }
};
</script>

<style scoped>
/* styling remains the same */
</style>

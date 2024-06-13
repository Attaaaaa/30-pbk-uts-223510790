<template>
  <div class="post-container">
    <h2>Post</h2>
    <select v-model="localSelectedUser" @change="handleUserChange">
      <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
    </select>
    <div v-if="posts && posts.length" class="posts-list">
      <div v-for="post in posts" :key="post.id" class="post-item">
        <h3>{{ post.title }}</h3>
        <p>{{ post.body }}</p>
      </div>
    </div>
    <div v-else>
      <p>No posts available.</p>
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
.post-container {
  background-color: #b3ffb3; 
  padding: 20px;
  text-align: center; 
}

.post-container h2 {
  margin-bottom: 10px;
}

.posts-list {
  margin-top: 20px;
}

.post-item {
  background-color: white;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>

<template>
  <div class="post-container">
    <h2>Post</h2>
    <select v-model="selectedUser" @change="fetchPosts">
      <option value="">Pilih user</option>
      <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
    </select>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div v-if="filteredPosts.length === 0">Tidak ada posting untuk pengguna ini.</div>
      <div v-else>
        <div v-for="post in filteredPosts" :key="post.id">
          <h3>{{ post.title }}</h3>
          <p>{{ post.body }}</p>  
          <p>User ID: {{ post.userId }}</p>
          <p>Post ID: {{ post.id }}</p>
          <hr>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['users'],
  data() {
    return {
      selectedUser: '', // Inisialisasi selectedUser
      posts: [],
      loading: false
    };
  },
  computed: {
    filteredPosts() {
      if (!this.selectedUser) {
        return []; // Jika selectedUser kosong, tidak ada posting yang ditampilkan
      }
      return this.posts.filter(post => post.userId === parseInt(this.selectedUser)); // Filter posting berdasarkan selectedUser
    }
  },
  methods: {
    async fetchPosts() {
      if (!this.selectedUser) return;
      this.loading = true;
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${this.selectedUser}`);
        this.posts = response.data;
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
/* styling remains the same */
</style>

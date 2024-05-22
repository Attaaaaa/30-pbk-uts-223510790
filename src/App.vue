<template>
  <div>
    <button @click="showTodoListForm">TodoList</button>
    <button @click="goToPost">Post</button>
    <Todos v-if="!showPost" :activities="activities" @cancelActivity="cancelActivity" @addActivity="addActivity" @toggleCompletion="toggleCompletion" />
    <Post v-if="showPost" :users="users" />
  </div>
</template>

<script>
import Todos from './components/Todos.vue';
import Post from './components/Post.vue';
import axios from 'axios';

export default {
  components: {
    Todos,
    Post
  },
  data() {
    return {
      showPost: false,
      users: [],
      activities: []
    };
  },
  methods: {
    showTodoListForm() {
      this.showPost = false;
    },
    goToPost() {
      this.showPost = true;
    },
    async fetchUsers() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        this.users = response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    addActivity(activity) {
      this.activities.push(activity);
    },
    cancelActivity(index) {
      this.activities.splice(index, 1);
    },
    toggleCompletion(activity) {
      // implementasi masih sama
    }
  },
  async created() {
    await this.fetchUsers();
  }
};
</script>

<style scoped>
/* styling remains the same */
</style>

<template>
  <div>
    <button @click="goToPost">Post</button>
    <button @click="showTodoListForm">TodoList</button>
    <Todos v-if="!showPost" v-bind:activities="activities" @cancelActivity="cancelActivity" @toggleCompletion="toggleCompletion" />
    <Post v-if="showPost" v-bind:users="users" v-bind:posts="posts" v-model="selectedUser" @fetchPosts="fetchPosts" />
  </div>
</template>

<script>
import Todos from './components/Todos.vue';
import Post from './components/Post.vue';

export default {
  components: {
    Todos,
    Post
  },
  data() {
    return {
      showPost: false,
      activities: [],
      users: [],
      selectedUser: null,
      posts: []
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
      // implementation remains the same
    },
    async fetchPosts() {
      // implementation remains the same
    },
    cancelActivity(index) {
      // implementation remains the same
    },
    toggleCompletion(activity) {
      // implementation remains the same
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

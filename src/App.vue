<template>
  <header class="header">
    <nav class="menu">
      <div class="container">
        <ul class="nav-links">
          <li @click="setCurrentView('Todos')" :class="{ active: currentView === 'Todos' }">TodoList</li>
          <li @click="setCurrentView('Post')" :class="{ active: currentView === 'Post' }">Post</li>
          <li @click="setCurrentView('Albums')" :class="{ active: currentView === 'Albums' }">Albums</li>
        </ul>
      </div>
    </nav>
  </header>
    <div class="view-container">
      <Todos v-if="currentView === 'Todos'" :activities="activities" @cancelActivity="cancelActivity" @addActivity="addActivity" @toggleCompletion="toggleCompletion" />
      <Post v-if="currentView === 'Post'" :users="users" />
      <router-view v-if="currentView === 'Albums'"></router-view>
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
      currentView: 'Todos',
      activities: [],
      users: []
    };
  },
  methods: {
    setCurrentView(view) {
      this.currentView = view;
      if (view === 'Albums') {
        this.$router.push('/albums');
      }
    },
    async fetchData() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        this.users = await response.json();
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
      activity.completed = !activity.completed;
    }
  },
  async created() {
    await this.fetchData();
  }
};
</script>

<style scoped>
.header {
  background-color: #000000;
  color: #ffffff; /* Teks putih */
  padding: 20px;
  text-align: center;
}

.menu {
  display: flex;
  justify-content: center;
}

.menu .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
}

.menu ul li {
  margin: 0 15px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s; 
}

.menu ul li.active {
  font-weight: bold;
}

.menu ul li:hover {
  background-color: #255b7c;
  border-radius: 20px;
}

.view-container {
  margin-top: 20px;
}
</style>
s
<template>
  <div>
    <button @click="goToPost">Post</button>
    <button @click="showTodoListForm">TodoList</button>
    <RegistrationForm v-if="!showForm" />
    <div v-if="showForm" class="form-container">
      <h2>Form Pendaftaran Kegiatan</h2>
      <table>
        <tr>
          <td><label for="activity">Kegiatan:</label></td>
          <td><input type="text" id="activity" v-model="newActivity"></td>
        </tr>
        <tr>
          <td><label for="date">Tanggal:</label></td>
          <td><input type="date" id="date" v-model="newDate"></td>
        </tr>
        <tr>
          <td><label for="time">Jam:</label></td>
          <td><input type="time" id="time" v-model="newTime"></td>
        </tr>
        <tr>
          <td><label for="hobby">Hobi:</label></td>
          <td><input type="text" id="hobby" v-model="newHobby"></td>
        </tr>
        <tr>
          <td colspan="2"><button @click="addActivity">Daftar</button></td>
        </tr>
      </table>

      <h2>Daftar Kegiatan</h2>
      <table>
        <tr v-for="(activity, index) in activities" :key="index">
          <td>
            <input type="checkbox" v-model="activity.completed" @change="toggleCompletion(activity)">
          </td>
          <td :class="{ 'completed': activity.completed }">{{ activity.name }}</td>
          <td>{{ activity.date }}</td>
          <td>{{ activity.time }}</td>
          <td>{{ activity.hobby }}</td>
          <td><button @click="cancelActivity(index)">Batalkan</button></td> 
        </tr>
      </table>
    </div>

    <div v-if="showPost" class="post-container">
      <h2>Post</h2>
      <select v-model="selectedUser" @change="fetchPosts">
        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
      </select>
      <div v-for="post in posts" :key="post.id">
        <h3>{{ post.title }}</h3>
        <p>{{ post.body }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showForm: false,
      showPost: false,
      newActivity: '',
      newDate: '',
      newTime: '',
      newHobby: '',
      activities: [],
      users: [],
      selectedUser: null,
      posts: []
    };
  },
  methods: {
    showTodoListForm() {
      this.showForm = true; // Tampilkan form TodoList
      this.showPost = false; // Sembunyikan bagian Post
    },
    goToPost() {
      this.showPost = true; // Tampilkan bagian Post
      this.showForm = false; // Sembunyikan form TodoList
    },
    async fetchUsers() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const users = await response.json();
        this.users = users;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    async fetchPosts() {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${this.selectedUser}`);
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const posts = await response.json();
        this.posts = posts;
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    },
    addActivity() {
      if (this.newActivity && this.newDate && this.newTime && this.newHobby) {
        this.activities.push({
          name: this.newActivity,
          date: this.newDate,
          time: this.newTime,
          hobby: this.newHobby,
          completed: false
        });
        this.newActivity = '';
        this.newDate = '';
        this.newTime = '';
        this.newHobby = '';
      }
    },
    cancelActivity(index) {
      this.activities.splice(index, 1);
    },
    toggleCompletion(activity) {
      if (activity.completed) {
        // Add your toggle completion logic here
      }
    }
  },
  async created() {
    await this.fetchUsers();
  }
};
</script>

<style scoped>
input[type="checkbox"] {
  margin-right: 10px;
}

.completed {
  text-decoration: line-through;
}

.form-container {
  margin-top: 20px;
}

.post-container {
  margin-top: 20px;
}
</style>

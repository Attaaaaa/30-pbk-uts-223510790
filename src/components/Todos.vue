<template>
  <div class="form-container">
    <table class="container-table">
      <tr>
        <td>
          <!-- Mulai tabel form -->
          <table class="form-table">
            <caption>Form Pendaftaran Kegiatan</caption>
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
          <!-- Akhir tabel form -->
        </td>
      </tr>
    </table>

    <h2>Daftar Kegiatan</h2>
    <table class="activity-table">
      <tr>
        <th>Status</th>
        <th>Kegiatan</th>
        <th>Tanggal</th>
        <th>Jam</th>
        <th>Hobi</th>
        <th>Aksi</th>
      </tr>
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
</template>

<script>
export default {
  props: ['activities'],
  data() {
    return {
      newActivity: '',
      newDate: '',
      newTime: '',
      newHobby: ''
    };
  },
  
  methods: {
    addActivity() {
      if (this.newActivity && this.newDate && this.newTime && this.newHobby) {
        this.$emit('addActivity', {
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
    toggleCompletion(activity) {
      
    },
    cancelActivity(index) {
      this.$emit('cancelActivity', index); 
    }
  }
};
</script>

<style scoped>
.form-container {
  background-color: #71dab0; 
  text-align: center;
  margin-top: 20px;
}

.container-table {
  margin: 0 auto;
  width: 100%; 
  border-collapse: collapse;
}

.form-table {
  margin: 0 auto; 
  width: 50%; 
  border-collapse: collapse; 
}

.form-table caption {
  font-size: 1.5rem; 
  margin-bottom: 10px; 
}

.form-table td, .form-table th {
  padding: 8px; 
  text-align: left; 
}

.form-table label {
  display: inline-block; 
  width: 120px; 
}

.activity-table {
  margin: 20px auto; 
  width: 80%; 
  border-collapse: collapse; 
}

.activity-table th, .activity-table td {
  border: 1px solid #dddddd; 
  padding: 8px; 
  text-align: left; 
}

.activity-table th {
  background-color: #f2f2f2; 
}

.completed {
  text-decoration: line-through; 
}
</style>

<template>
    <div>
      <h2 class="title">Albums</h2>
      <div v-if="albums.length">
        <table class="album-table">
          <tbody>
            <tr v-for="album in albums" :key="album.id" class="album-item" @click="goToAlbumDetails(album.id)">
              <td class="album-id">{{ album.id }}</td>
              <td class="album-title">{{ album.title }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="no-albums">
        <p>Tidak ada album yang tersedia.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import axios from 'axios'
  
  const albums = ref([])
  const router = useRouter()
  
  const fetchAlbums = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/albums')
      albums.value = response.data
    } catch (error) {
      console.error('Kesalahan dalam mengambil album:', error)
    }
  }
  
  const goToAlbumDetails = (id) => {
    router.push(`/albums/${id}`)
  }
  
  onMounted(fetchAlbums)
  </script>
  
  <style scoped>
  .title {
    color: #00ff62;
    text-align: center;
    font-weight: bold;
    margin-bottom: 20px;
  }
  
  .album-table {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    border-collapse: separate;
    border-spacing: 0 10px;
  }
  
  .album-item {
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
  }
  
  .album-item:hover {
    background-color: #00ff55;
    color: white;
  }
  
  .album-id, .album-title {
    padding: 10px;
    border: 1px solid #00ff5e;
    text-align: left;
  }
  
  .album-id {
    font-weight: bold;
    width: 10%;
    text-align: center;
  }
  
  .album-title {
    font-family: 'Arial', sans-serif;
    width: 90%;
  }
  
  .no-albums {
    text-align: center;
    margin-top: 20px;
  }
  </style>
  
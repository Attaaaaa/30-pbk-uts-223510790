<template>
  <div>
    <h2 class="title">Foto-foto dalam Album {{ albumId }}</h2>
    <div v-if="photos.length">
      <table class="photos-table">
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="photo in photos" :key="photo.id" class="photo-item">
            <td>
              <img :src="photo.thumbnailUrl" @click="showPhoto(photo.url)" class="thumbnail">
            </td>
            <td>{{ photo.title }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="no-photos">
      <p>Tidak ada foto yang tersedia untuk album ini.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const albumId = ref(route.params.id)
const photos = ref([])

const fetchPhotos = async () => {
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/albums/${albumId.value}/photos`)
    photos.value = response.data
  } catch (error) {
    console.error('Kesalahan dalam mengambil foto-foto:', error)
  }
}

const showPhoto = (url) => {
  window.open(url, '_blank')
}

onMounted(fetchPhotos)
</script>

<style scoped>
.title {
  color: #00ff5e;
  text-align: center;
  font-weight: bold;
  margin-bottom: 20px;
}

.photos-table {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  border-collapse: collapse;
}

.photo-item {
  text-align: center;
}

.thumbnail {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border: 1px solid #00ff59;
  border-radius: 5px;
  cursor: pointer;
  transition: border-color 0.3s;
}

.thumbnail:hover {
  border-color: #00b342;
}

.no-photos {
  text-align: center;
  margin-top: 20px;
}
</style>

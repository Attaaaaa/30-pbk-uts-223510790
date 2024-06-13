import { createRouter, createWebHistory } from 'vue-router'
import Todos from '../components/Todos.vue'
import Post from '../components/Post.vue';
import AlbumList from '../components/AlbumList.vue';
import AlbumDetails from '../components/AlbumDetails.vue';


const routes = [
  { path: '/', redirect: '/todos' },
  { path: '/todos', component: Todos },
  { path: '/posts', component: Post },
  { path: '/albums', component: AlbumList },
  { path: '/albums/:id', component: AlbumDetails }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

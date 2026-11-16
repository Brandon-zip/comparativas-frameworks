<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { User } from '@/types/user';
import { fetchUsers } from '@/services/usersService';
import UserCard from '@/components/UserCard.vue';
import vueLogo from '@/assets/logo.svg';

const users = ref<User[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const search = ref('');
const favoriteIds = ref<number[]>([]);
const onlyFavorites = ref(false);

onMounted(async () => {
  try {
    loading.value = true;
    error.value = null;
    users.value = await fetchUsers();
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Ocurrió un error al cargar los usuarios.';
  } finally {
    loading.value = false;
  }
});

function handleToggleFavorite(userId: number) {
  if (favoriteIds.value.includes(userId)) {
    favoriteIds.value = favoriteIds.value.filter((id) => id !== userId);
  } else {
    favoriteIds.value = [...favoriteIds.value, userId];
  }
}

const filteredUsers = computed(() => {
  return users.value.filter((user) => {
    const matchesName = user.name.toLowerCase().includes(search.value.toLowerCase());
    const matchesFav = onlyFavorites.value ? favoriteIds.value.includes(user.id) : true;
    return matchesName && matchesFav;
  });
});
</script>

<template>
  <main class="container">
    <header class="app-header">
      <div class="title-group">
        <img :src="vueLogo" alt="Logo Vue" class="framework-logo" />
        <h1>Directorio de Usuarios (Vue)</h1>
      </div>
      <span class="fav-counter">Favoritos: {{ favoriteIds.length }}</span>
    </header>

    <section class="controls">
      <input
        v-model="search"
        type="text"
        placeholder="Buscar por nombre..."
        aria-label="Buscar por nombre"
      />
      <label class="filter-check">
        <input v-model="onlyFavorites" type="checkbox" />
        Solo favoritos
      </label>
    </section>

    <p v-if="loading" class="status-msg">Cargando...</p>
    <p v-else-if="error" class="status-msg error">Error: {{ error }}</p>

    <template v-else>
      <p v-if="filteredUsers.length === 0" class="status-msg">
        No se encontraron usuarios con ese filtro.
      </p>
      <section v-else class="users-grid">
        <UserCard
          v-for="user in filteredUsers"
          :key="user.id"
          :user="user"
          :is-favorite="favoriteIds.includes(user.id)"
          @toggle-favorite="handleToggleFavorite"
        />
      </section>
    </template>
  </main>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Roboto', system-ui, -apple-system, sans-serif;
  background: linear-gradient(135deg, #f0f4f8 0%, #e2e8f0 100%);
  color: #1e293b;
  min-height: 100vh;
  padding: 2.5rem 1.25rem;
}

.container {
  max-width: 1040px;
  margin: 0 auto;
}

.app-header {
  background: #ffffff;
  padding: 1.5rem 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(15, 23, 42, 0.06);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
  border: 1px solid rgba(226, 232, 240, 0.8);
}

.title-group {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.framework-logo {
  width: 36px;
  height: 36px;
}

.app-header h1 {
  font-size: 1.65rem;
  font-weight: 700;
  color: #0f172a;
  letter-spacing: -0.02em;
}

.fav-counter {
  background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
  color: #065f46;
  font-weight: 700;
  font-size: 0.95rem;
  padding: 0.55rem 1.15rem;
  border-radius: 999px;
  border: 1px solid #42b883;
  box-shadow: 0 2px 6px rgba(66, 184, 131, 0.2);
}

.controls {
  background: #ffffff;
  padding: 1rem 1.5rem;
  border-radius: 14px;
  box-shadow: 0 2px 12px rgba(15, 23, 42, 0.04);
  display: flex;
  gap: 1.25rem;
  margin-bottom: 1.75rem;
  align-items: center;
  flex-wrap: wrap;
  border: 1px solid #e2e8f0;
}

.controls input[type="text"] {
  flex: 1;
  min-width: 250px;
  padding: 0.75rem 1rem;
  border: 1.5px solid #cbd5e1;
  border-radius: 10px;
  font-size: 0.95rem;
  font-family: inherit;
  color: #0f172a;
  transition: border-color 0.2s, box-shadow 0.2s;
  background-color: #f8fafc;
}

.controls input[type="text"]::placeholder {
  color: #64748b;
}

.controls input[type="text"]:focus {
  outline: none;
  border-color: #10b981;
  background-color: #ffffff;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
}

.filter-check {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  color: #334155;
  user-select: none;
}

.filter-check input[type="checkbox"] {
  width: 1.1rem;
  height: 1.1rem;
  accent-color: #42b883;
  cursor: pointer;
}

.users-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  gap: 1.25rem;
}

.user-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.25rem;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.04);
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.user-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
}

.user-card.is-favorite {
  border: 1.5px solid #42b883;
  background: linear-gradient(180deg, #f0fdf4 0%, #ffffff 100%);
}

.user-info h3 {
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 0.65rem;
  color: #0f172a;
}

.user-info p {
  font-size: 0.9rem;
  color: #475569;
  margin-bottom: 0.35rem;
  line-height: 1.4;
}

.user-info strong {
  color: #334155;
}

.fav-btn {
  width: 100%;
  padding: 0.65rem 1rem;
  border: 1.5px solid #cbd5e1;
  border-radius: 10px;
  background: #f8fafc;
  color: #334155;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  font-family: inherit;
  transition: all 0.2s ease;
}

.fav-btn:hover {
  background: #f1f5f9;
  border-color: #94a3b8;
}

.fav-btn.active {
  background: linear-gradient(135deg, #42b883 0%, #33a06f 100%);
  color: #ffffff;
  border-color: #2f9265;
  box-shadow: 0 3px 10px rgba(66, 184, 131, 0.3);
}

.fav-btn.active:hover {
  filter: brightness(1.05);
}

.status-msg {
  background: #ffffff;
  border-radius: 12px;
  text-align: center;
  padding: 2.5rem;
  font-size: 1.05rem;
  color: #475569;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
}

.status-msg.error {
  color: #dc2626;
  border: 1px solid #fecaca;
  background: #fef2f2;
  font-weight: 600;
}

</style>
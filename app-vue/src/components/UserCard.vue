<script setup lang="ts">
import type { User } from '@/types/user';

const props = defineProps<{
    user: User;
    isFavorite: boolean;
}>();

const emit = defineEmits<{
    toggleFavorite: [id: number];
}>();

</script>

<template>
    <article class="user-card" :class="{ 'is-favorite': isFavorite}">
        <div class="user-info">
            <h3>{{ user.name }}</h3>
            <p><strong>Correo: </strong>{{ user.email }}</p>
            <p><strong>Ciudad: </strong>{{ user.address?.city }}</p>
        </div>

        <button
        type="button"
        class="fav-btn"
        :class="{ active: isFavorite }"
        @click="emit('toggleFavorite', props.user.id)"
        >
            {{ isFavorite ? '★ Favorito' : '☆ Favorito' }}
        </button>
    </article>
</template>
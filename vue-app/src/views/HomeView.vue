<script setup lang="ts">
import { useRoute } from 'vue-router'

type QueryParams = Partial<{
  ids: string
}>

const queryParams: QueryParams = useRoute().query
const ids = queryParams?.ids.split(',') ?? []
</script>

<template>
  <main>
    <h3>Received uuids in Vue</h3>
    <ul>
      <li v-for="id in ids">
        {{ id }}
      </li>
    </ul>
  </main>
</template>

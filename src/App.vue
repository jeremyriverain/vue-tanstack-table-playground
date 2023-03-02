<script setup lang="ts">
import TableWithSorting from '@/components/TableWithSorting.vue'
import ExternalLink from '@/components/ExternalLink.vue';
import TableWithHeadersGrouped from '@/components/TableWithHeadersGrouped.vue';
</script>

<template>
  <h1>Vue Tanstack Table Playground</h1>
  
  <h2>Table with sorting capability (<ExternalLink href="https://github.com/jeremyriverain/vue-tanstack-table-playground/blob/main/src/components/TableWithSorting.vue">Source code</ExternalLink>)</h2>
  <TableWithSorting />

  <h2>Table with some headers grouped (<ExternalLink href="https://github.com/jeremyriverain/vue-tanstack-table-playground/blob/main/src/components/TableWithHeadersGrouped.vue">Source code</ExternalLink>)</h2>
  <TableWithHeadersGrouped />
</template>

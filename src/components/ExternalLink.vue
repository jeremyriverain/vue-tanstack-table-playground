<template>
  <a :href="href" rel="noopener noreferrer" target="_blank"><slot /></a>
</template>

<script lang="ts" setup>
defineProps({ href: { required: true, type: String } })
</script>

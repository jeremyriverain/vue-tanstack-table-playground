<template>
    <input type="checkbox" :indeterminate="state === 'indeterminate'" :checked="state === 'checked'">
</template>

<script lang="ts" setup>
defineProps<{state: 'indeterminate' | 'unchecked' | 'checked'}>()
</script>
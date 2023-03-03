<script setup lang="ts">
import TableWithSorting from '@/components/TableWithSorting.vue'
import ExternalLink from '@/components/ExternalLink.vue';
import TableWithHeadersGrouped from '@/components/TableWithHeadersGrouped.vue';
import TableWithPagination from '@/components/TableWithPagination.vue';
import TableWithRowSelection from '@/components/TableWithRowSelection.vue';
import TableWithEditableCell from '@/components/TableWithEditableCell.vue';
</script>

<template>
  <h1>Vue Tanstack Table Playground</h1>
  
  <h2>Table with sorting capability (<ExternalLink href="https://github.com/jeremyriverain/vue-tanstack-table-playground/blob/main/src/components/TableWithSorting.vue">Source code</ExternalLink>)</h2>
  <TableWithSorting />

  <h2>Table with some headers grouped (<ExternalLink href="https://github.com/jeremyriverain/vue-tanstack-table-playground/blob/main/src/components/TableWithHeadersGrouped.vue">Source code</ExternalLink>)</h2>
  <TableWithHeadersGrouped />

  <h2>Table with paginated results (<ExternalLink href="https://github.com/jeremyriverain/vue-tanstack-table-playground/blob/main/src/components/TableWithPagination.vue">Source code</ExternalLink>)</h2>
  <TableWithPagination />

  <h2>Table with row selection (<ExternalLink href="https://github.com/jeremyriverain/vue-tanstack-table-playground/blob/main/src/components/TableWithRowSelection.vue">Source code</ExternalLink>)</h2>
  <TableWithRowSelection />

  <h2>Table with editable cell (<ExternalLink href="https://github.com/jeremyriverain/vue-tanstack-table-playground/blob/main/src/components/TableWithEditableCell.vue">Source code</ExternalLink>)</h2>
  <TableWithEditableCell />
</template>

<template>
  <table>
    <thead>
      <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
        <th v-for="header in headerGroup.headers" :key="header.id" :colSpan="header.colSpan">
          <FlexRender :render="header.column.columnDef.header" :props="header.getContext()" />
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in table.getRowModel().rows" :key="row.id">
        <td v-for="cell in row.getVisibleCells()" :key="cell.id">
          <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import { makeData, type Person } from '@/makeData'
import { createColumnHelper, getCoreRowModel } from '@tanstack/table-core'
import { FlexRender, useVueTable } from '@tanstack/vue-table'
import { ref } from 'vue'

const columnHelper = createColumnHelper<Person>()

const columns = [
  columnHelper.group({
    header: 'Name',
    columns: [
      columnHelper.accessor((row) => row.firstName, {
        id: 'firstName',
        cell: (info) => info.getValue(),
        header: () => 'First Name'
      }),
      columnHelper.accessor((row) => row.lastName, {
        id: 'lastName',
        cell: (info) => info.getValue(),
        header: () => 'Last Name'
      })
    ]
  }),
  columnHelper.group({
    header: 'Info',
    columns: [
      columnHelper.accessor((row) => row.age, {
        id: 'age',
        cell: (info) => info.getValue(),
        header: () => 'Age'
      }),
      columnHelper.accessor((row) => row.visits, {
        id: 'visits',
        cell: (info) => info.getValue(),
        header: () => 'Visits'
      }),
      columnHelper.accessor((row) => row.status, {
        id: 'status',
        cell: (info) => info.getValue(),
        header: () => 'Status'
      }),
      columnHelper.accessor((row) => row.progress, {
        id: 'progress',
        cell: (info) => info.getValue(),
        header: () => 'Progress'
      })
    ]
  })
]

const data = ref<Person[]>(makeData(8))

const table = useVueTable({
  columns,
  get data() {
    return data.value
  },
  getCoreRowModel: getCoreRowModel()
})
</script>

<style scoped>
table {
  border-collapse: collapse;
}

th,
td {
  border: 1px solid black;
  padding: 10px;
}

th {
  font-weight: bold;
}
</style>
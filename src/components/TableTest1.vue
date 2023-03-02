<template>
  <table>
    <thead>
      <tr>
        <th v-for="header in table.getFlatHeaders()" :key="header.id" @click="header.column.getToggleSortingHandler()?.($event)"
        :class="{'cursor-pointer': header.column.getCanSort()}"
        >
          <FlexRender :render="header.column.columnDef.header" :props="header.getContext()"/>
          <span v-if="header.column.getIsSorted()">
            {{ header.column.getIsSorted() === 'desc' ? ' 🔼' : ' 🔽' }}
          </span>
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
import { createColumnHelper, getCoreRowModel, getSortedRowModel, type SortingState } from '@tanstack/table-core'
import { FlexRender, useVueTable } from '@tanstack/vue-table';
import { ref } from 'vue';

type Person = {
  firstName: string
  lastName: string
  profession: string
  age: number
}

const defaultData: Person[] = [
  {
    firstName: 'tanner',
    lastName: 'linsley',
    age: 24,
    profession: 'dentist'
  },
  {
    firstName: 'tandy',
    lastName: 'miller',
    age: 40,
    profession: 'developer'
  },
  {
    firstName: 'joe',
    lastName: 'dirte',
    age: 45,
    profession: 'clown'
  },
  {
    firstName: 'averell',
    lastName: 'dalton',
    age: 35,
    profession: 'gangster'
  }
]

const columnHelper = createColumnHelper<Person>()

const columns = [
  columnHelper.accessor((row) => row.firstName, {
    id: 'firstName',
    cell: (info) => info.getValue(),
    header: () => 'First Name',
  }),
  columnHelper.accessor((row) => row.lastName, {
    id: 'lastName',
    cell: (info) => info.getValue(),
    header: () => 'Last Name',
  }),
  columnHelper.accessor((row) => row.age, {
    id: 'age',
    cell: (info) => info.getValue(),
    header: () => 'Âge',
  }),
  columnHelper.accessor((row) => row.profession, {
    id: 'profession',
    cell: (info) => info.getValue(),
    header: () => 'Profession'
  }),
]

const data = ref(defaultData)

const sorting = ref<SortingState>([{desc: false, id: 'firstName'}])
const table = useVueTable({
  columns,
  get data() {
    return data.value
  },
  state: {
   get sorting() {
    return sorting.value
   }
  },
  onSortingChange: updaterOrValue => {
    console.log('updaterOrValue', updaterOrValue)
    sorting.value = typeof updaterOrValue === 'function' ? updaterOrValue(sorting.value) : updaterOrValue
  },
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
})
</script>

<style scoped>
table{
  border-collapse: collapse;
}

th, td{
  border: 1px solid black;
  padding: 10px;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
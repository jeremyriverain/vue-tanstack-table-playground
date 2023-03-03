<template>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th v-for="header in table.getFlatHeaders()" :key="header.id">
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
  </div>

  <br />
  <ul>
    <li v-for="row in table.getRowModel().rows" :key="row.id">
      {{ row.getValue('firstName') }} {{ row.getValue('lastName') }},
      {{ row.getValue('age') }} years old
    </li>
  </ul>
  <!-- <ul>
    <li v-for="(person, i) in data()" :key="i">
      {{ person.firstName }} {{ person.lastName }}, {{ person.age }} years old
    </li>
  </ul> -->
</template>

<script lang="ts" setup>
import { makeData, type Person } from '@/makeData'
import { createSignal } from '@/createSignal'
import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  type ColumnDef
} from '@tanstack/table-core'
import { FlexRender, useVueTable } from '@tanstack/vue-table'
import { h } from 'vue'

const columnHelper = createColumnHelper<Person>()

const columns = [
  columnHelper.accessor((row) => row.firstName, {
    id: 'firstName',
    header: () => 'First Name'
  }),
  columnHelper.accessor((row) => row.lastName, {
    id: 'lastName',
    header: () => 'Last Name'
  }),
  columnHelper.accessor((row) => row.age, {
    id: 'age',
    cell: (info) => info.getValue(),
    header: () => 'Age'
  })
]

const [data, setData] = createSignal<Person[]>(makeData(2))

const defaultColumn: Partial<ColumnDef<Person>> = {
  cell: ({ row: { index }, column: { id } }) => {
    const d = [...data()]
    const item: Record<string, any> = d[index]
    const onInput = (evt: InputEvent) => {
      item[id] = (evt.target as HTMLInputElement).value
      d.splice(index, 1, item as Person)
      setData(d)
    }
    return h('input', { type: 'text', value: item[id], onInput })
  }
}

const table = useVueTable({
  columns,
  defaultColumn,
  get data() {
    return data()
  },
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel()
})
</script>

<template>
  
    <div>
        <input
          :value="globalFilter()"
          @input="setGlobalFilter(($event.target as HTMLInputElement).value)"
          placeholder="Search all columns..."
        />
      </div>
  
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th v-for="header in table.getFlatHeaders()" :key="header.id">
            <FlexRender :render="header.column.columnDef.header" :props="header.getContext()" />
            <div>
              <input type="text" :value="header.column.getFilterValue()" @input="header.column.setFilterValue(($event.target as HTMLInputElement).value)" placeholder="Search" />
            </div>
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
</template>

<script lang="ts" setup>
import { createSignal } from '@/createSignal'
import { makeData, type Person } from '@/makeData'
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  type ColumnFiltersState,
type OnChangeFn
} from '@tanstack/table-core'
import { FlexRender, useVueTable } from '@tanstack/vue-table'
import { ref } from 'vue'

const columnHelper = createColumnHelper<Person>()

const columns = [
  columnHelper.accessor((row) => row.firstName, {
    id: 'firstName',
    cell: (info) => info.getValue(),
    header: () => 'First Name'
  }),
  columnHelper.accessor((row) => row.lastName, {
    id: 'lastName',
    cell: (info) => info.getValue(),
    header: () => 'Last Name'
  }),
  columnHelper.accessor((row) => row.status, {
    id: 'status',
    cell: (info) => info.getValue(),
    header: () => 'Status'
  })
]

const data = ref<Person[]>(makeData(10))

const [columnFilters, setColumnFilters] = createSignal<ColumnFiltersState>([])
const [globalFilter, setGlobalFilter] = createSignal('')

const table = useVueTable({
  columns,
  get data() {
    return data.value
  },
  state: {
    get columnFilters() {
      return columnFilters()
    },
    get globalFilter() {
      return globalFilter()
    }
  },
  onGlobalFilterChange: setGlobalFilter,
  onColumnFiltersChange: setColumnFilters as OnChangeFn<ColumnFiltersState>,
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
})
</script>

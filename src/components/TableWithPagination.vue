<template>
  <div class="table-container">
    <div class="pagination">
      <button @click="table.setPageIndex(0)" :disabled="!table.getCanPreviousPage()">
        &lt;&lt;
      </button>
      <button @click="table.previousPage()" :disabled="!table.getCanPreviousPage()">&lt;</button>
      <button @click="table.nextPage()" :disabled="!table.getCanNextPage()">&gt;</button>
      <button
        @click="table.setPageIndex(table.getPageCount() - 1)"
        :disabled="!table.getCanNextPage()"
      >
        &gt;&gt;
      </button>
      <span>
        Page
        <strong>
          {{ table.getState().pagination.pageIndex + 1 }} of
          {{ table.getPageCount() }}
        </strong>
      </span>
      <span>
        | Go to page:
        <input
          type="number"
          min="1"
          :max="table.getPageCount()"
          :defaultValue="table.getState().pagination.pageIndex + 1"
          v-model.number="page"
        />
      </span>
      <select v-model.number="resultsPerPage">
        <option v-for="num in [10, 20, 30, 40, 50]" :key="num" :value="num">Show {{ num }}</option>
      </select>
    </div>
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
</template>

<script lang="ts" setup>
import { makeData, type Person } from '@/makeData'
import { createColumnHelper, getCoreRowModel, getPaginationRowModel } from '@tanstack/table-core'
import { FlexRender, useVueTable } from '@tanstack/vue-table'
import { computed, ref } from 'vue'

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
  columnHelper.accessor((row) => row.age, {
    id: 'age',
    cell: (info) => info.getValue(),
    header: () => 'Age'
  }),
  columnHelper.accessor((row) => row.visits, {
    id: 'visits',
    cell: (info) => info.getValue(),
    header: () => 'Visits'
  })
]

const data = ref<Person[]>(makeData(100))

const table = useVueTable({
  columns,
  get data() {
    return data.value
  },
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel()
})

const page = computed({
  get() {
    return table.getState().pagination.pageIndex + 1
  },
  set(newValue) {
    table.setPageIndex(newValue - 1)
  }
})

const resultsPerPage = computed({
  get() {
    return table.getState().pagination.pageSize
  },
  set(newValue) {
    table.setPageSize(newValue)
  }
})
</script>

<style>
.pagination {
  display: flex;
  align-items: center;
  margin-bottom: 0.3rem;
}
.pagination > * + * {
  margin-left: 0.5rem;
}
</style>

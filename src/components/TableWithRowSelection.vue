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
  <div>
    <pre>{{ rowSelection() }}</pre>
  </div>

</template>

<script lang="ts" setup>
import { makeData, type Person } from '@/makeData'
import { createColumnHelper, getCoreRowModel, type Table, type Row, type RowSelectionState, type OnChangeFn } from '@tanstack/table-core'
import { FlexRender, useVueTable } from '@tanstack/vue-table'
import { h, ref } from 'vue'
import CheckboxSelector from '@/components/CheckboxSelector.vue'
import { shallowRef, triggerRef } from 'vue'

const columnHelper = createColumnHelper<Person>()

const columns = ref([
  {
    id: 'select',
    header: ({ table }: { table: Table<Person> }) => {
      const state = table.getIsAllRowsSelected()
        ? 'checked'
        : table.getIsSomeRowsSelected()
        ? 'indeterminate'
        : 'unchecked'
      return h(CheckboxSelector, {
        state,
        onChange: table.getToggleAllRowsSelectedHandler()
      })
    },
    cell: ({ row }: { row: Row<Person> }) => {
      const state = row.getIsSelected() ? 'checked' : 'unchecked'
      return h(CheckboxSelector, {
        state,
        onChange: row.getToggleSelectedHandler()
      })
    }
  },
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
  columnHelper.accessor((row) => row.status, {
    id: 'status',
    cell: (info) => info.getValue(),
    header: () => 'Status'
  }),
  columnHelper.accessor((row) => row.visits, {
    id: 'visits',
    cell: (info) => info.getValue(),
    header: () => 'Visits'
  })
])

const data = ref<Person[]>(makeData(4))

const [rowSelection, setRowSelection] = createSignal<RowSelectionState>({})


function createSignal<T>(value: T, options?: any): [() => T, (v: T) => void] {
  const r = shallowRef(value)
  const get = () => r.value
  const set = (v: T) => {
    r.value = typeof v === 'function' ? v(r.value) : v
    if (options?.equals === false) triggerRef(r)
  }
  return [get, set]
}

const table = useVueTable({
  get columns() {
    return columns.value
  },
  get data() {
    return data.value
  },
  state: {
    get rowSelection() {
        return rowSelection()
    },
  },
  enableRowSelection: true,
  onRowSelectionChange: setRowSelection as OnChangeFn<RowSelectionState>,
  getCoreRowModel: getCoreRowModel()
})
</script>

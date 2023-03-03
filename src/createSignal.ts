import { shallowRef, triggerRef } from "vue"

export function createSignal<T>(value: T, options?: any): [() => T, (v: T) => void] {
  const r = shallowRef(value)
  const get = () => r.value
  const set = (v: T) => {
    r.value = typeof v === 'function' ? v(r.value) : v
    if (options?.equals === false) triggerRef(r)
  }
  return [get, set]
}
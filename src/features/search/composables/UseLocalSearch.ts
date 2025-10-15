import { type Ref, ref, watch, computed } from "vue";

type Options<T> = {
  selector: (item: T) => string;
  minChars?: number;
  debounceMs: number;
  limit?: number;
};

export function useLocalSearch<T>(source: Ref<Array<T>>, opts: Options<T>) {
  const minChars = opts.minChars ?? 1;
  const debounceMs = opts.debounceMs ?? 200;

  const query = ref<string>("");
  const debounced = ref<string>("");

  let t: number | undefined;
  watch(query, (q) => {
    if (t) window.clearTimeout(t);
    t = window.setTimeout(() => (debounced.value = q), debounceMs);
  });

  const active = computed(() => debounced.value.trim().length >= minChars);

  const results = computed<Array<T>>(() => {
    const q = debounced.value.trim().toLowerCase();
    if (!active.value) return [];
    const out: Array<T> = [];
    for (const item of source.value) {
      const text = opts.selector(item).toLowerCase();
      if (text.includes(q)) {
        out.push(item);
        if (opts.limit && out.length >= opts.limit) break;
      }
    }
    return out;
  });

  function clear() {
    query.value = "";
    debounced.value = "";
  }

  return { query, debounced, active, results, clear };
}

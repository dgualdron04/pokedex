<template>
  <div class="search-input">
    <label for="search_input">
      <SearchSvg class="search-input__icon" />
    </label>
    <input
      :value="modelValue"
      @input="onInput"
      type="search"
      :placeholder="placeholder"
      autocomplete="off"
      class="search-input__field"
      id="search_input"
    />
    <button
      v-if="modelValue"
      class="search-input__button"
      @click="$emit('update:modelValue', '')"
    >
      x
    </button>
  </div>
</template>

<script setup lang="ts">
import SearchSvg from "@/app/assets/icones/Search.svg?component";
const props = defineProps<{ modelValue: string; placeholder?: string }>();
const emit = defineEmits<{ (e: "update:modelValue", v: string): void }>();

function onInput(e: Event) {
  const v = (e.target as HTMLInputElement).value;
  emit("update:modelValue", v);
}
</script>

<style scoped>
.search-input {
  align-items: center;
  background-color: var(--color-white);
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.04);
  display: flex;
  justify-content: left;
  padding: 16px 15px;
  border-radius: 5px;
  margin-bottom: 2.5rem;
}

.search-input .search-input__icon {
  margin-left: 0;
  margin-right: 10px;
}

.search-input .search-input__field {
  background-color: transparent;
  border: none;
  color: var(---color-text-heading);
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  font-weight: 500;
  outline: none;
  width: 100%;
}

.search-input .search-input__field::placeholder {
  color: var(--color-text-placeholder);
  font-family: "Montserrat", sans-serif;
  line-height: 140%;
}

input[type="search"]::-webkit-search-cancel-button {
  -webkit-appearance: none;
  appearance: none;
}

.search-input__button {
  background: unset;
  border: unset;
  font-size: 16px;
  color: var(--color-text-placeholder);
  cursor: pointer;
}
</style>

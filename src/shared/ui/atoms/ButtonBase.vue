<template>
  <component
    :is="as === 'router-link' ? RouterLink : as"
    v-bind="componentProps"
    class="btn-base"
    :class="[`btn-${variant}`]"
    @click="onClick"
  >
    <slot>{{ label }}</slot>
  </component>
</template>

<script setup lang="ts">
import { RouterLink, type RouteLocationRaw } from "vue-router";
import { computed } from "vue";

type ComponentType = "button" | "a" | "router-link";

interface Props {
  as?: ComponentType;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  label?: string;
  variant?: "primary";
}

interface ButtonProps extends Props {
  as?: "button";
}

interface AnchorProps extends Props {
  as: "a";
  href?: string;
  target?: string;
  rel?: string;
}

interface RouterLinkProps extends Props {
  as: "router-link";
  to: RouteLocationRaw;
}

type ButtonBaseProps = ButtonProps | AnchorProps | RouterLinkProps;

const props = withDefaults(defineProps<ButtonBaseProps>(), {
  as: "button",
  type: "button",
  disabled: false,
  label: "",
  variant: "primary",
});

const emit = defineEmits<{ (e: "click", ev: MouseEvent): void }>();

function onClick(e: MouseEvent) {
  if (props.disabled) {
    e.preventDefault();
    e.stopPropagation();
    return;
  }
  emit("click", e);
}

const componentProps = computed(() => {
  if (props.as === "button") {
    return {
      type: props.type,
      disabled: props.disabled,
    };
  }
  if (props.as === "a") {
    return {
      href: props.href,
      target: props.target,
      rel: props.rel,
    };
  }
  if (props.as === "router-link") {
    return { to: props.to };
  }
  return {};
});
</script>

<style scoped>
.btn-base {
  display: inline-flex;
  align-items: center;
  border: 0;
  border-radius: 3.75rem;
  padding: 0.6rem 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: filter 0.2s;
  text-decoration: none;
}

.btn-primary {
  background: var(--color-button-bg);
  color: var(--color-button-text);
}

.btn-base:is([disabled]) {
  filter: grayscale(1);
  cursor: not-allowed;
  opacity: 0.7;
}
</style>

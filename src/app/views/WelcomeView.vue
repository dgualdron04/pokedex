<template>
  <div class="welcome">
    <PikachuSvg class="welcome__img" />
    <div class="welcome__text">
      <p class="welcome__text-title">Welcome to Pokédex</p>
      <p class="welcome__text-description">
        The digital encyclopedia created by Professor Oak is an invaluable tool
        to Trainers in the Pokémon world.
      </p>
      <ButtonBase
        as="router-link"
        :to="{ name: 'pokedex' }"
        variant="primary"
        class="welcome__btn"
      >
        Get Started
      </ButtonBase>
    </div>
  </div>
</template>

<script setup lang="ts">
import PikachuSvg from "@/app/assets/images/pikachu.svg?component";
import ButtonBase from "@/shared/ui/atoms/ButtonBase.vue";
</script>

<style scoped>
.welcome {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100dvh;
  justify-content: center;
  text-align: center;
  width: 100%;
}

.welcome .welcome__img {
  height: 18rem;
  margin-bottom: 3.75rem;
  width: 20rem;
}

.welcome .welcome__text {
  margin-bottom: 3.1rem;
}

.welcome .welcome__text .welcome__text-title {
  color: var(--color-text-heading);
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 1.8rem;
}

.welcome .welcome__text .welcome__text-description {
  color: var(--color-text-body);
  font-size: 1.12rem;
  font-weight: 400;
  line-height: 150%;
}

.welcome .welcome__btn {
  font-size: 18px;
  margin-top: 3.1rem;
}
</style>

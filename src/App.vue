<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="header-container">
      <img alt="Vue logo" class="logo" src="@/assets/FullLogo_Transparent.png" />
      <!-- This is the content area rendered dynamically by the router -->
    </div>
  </header>
  <div class="app-right">
      <RouterView />
  </div>
</template>

<style scoped>
/* General header styling */
header {
  line-height: 1.5;
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
}

/* The container for the header elements (logo and content) */
.header-container {
  display: flex;                      /* Use flex to align items horizontally */
  justify-content: flex-start;        /* Align logo to the left */
  align-items: center;                /* Vertically align items in the center */
  gap: 2rem;                          /* Add space between logo and content */
  width: 100%;
}

.app-right {
  display: flex;
  justify-content: center;
  align-items: center;
}
/* Logo styling */
.logo {
  max-width: 500px;                   /* Limit the logo's size */
  height: auto;
}

/* For the RouterView content: make sure it fills the available space */
.router-view {
  flex-grow: 1;                       /* Ensure the content grows to take available space */
  max-width: 100%;                    /* Ensure the content doesn't exceed 100% width */
}

/* Responsive layout for larger screens (1024px and up) */
@media (min-width: 1024px) {
  .header-container {
    /* This is already set, but ensure the content doesn't shrink */
    flex-direction: row;              /* Make sure items are aligned horizontally */
  }

  .logo {
    max-width: 500px;                 /* Set a reasonable size for the logo */
    margin-right: 3rem;               /* More space between logo and content */
  }
}

/* Responsive layout for smaller screens (below 1024px) */
@media (max-width: 1023px) {
  .header-container {
    flex-direction: column;           /* Stack logo and content vertically */
    align-items: center;              /* Center everything horizontally */
    text-align: center;               /* Ensure text is centered */
  }

  .logo {
    margin-bottom: 1rem;              /* Space between logo and content */
    max-width: 300px;                 /* Make logo smaller on smaller screens */
  }

  .router-view {
    width: 100%;                      /* Make content take up the full width */
    padding: 1rem;                    /* Padding for small screens */
  }
}
</style>

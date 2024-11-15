<!-- src/views/HomePage.vue -->
<template>
  <div class="home-page">
    <h1>Welcome to BeeJay Bets!</h1>
    <p>The Best In The Business.</p>
    <router-link to="/signup">
      <button class="cta-button">Sign Up</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "HomePage",
};
</script>

<style scoped>
.home-page {
  text-align: center;
}

.cta-button {
  background-color: #4CAF50;
  color: white;
  padding: 15px 32px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 20px;
}

.cta-button:hover {
  background-color: #45a049;
}
</style>

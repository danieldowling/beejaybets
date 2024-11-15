<template>
  <div class="thank-you-page">
    <h2>Thank You, {{ firstName }} {{ lastName }}!</h2>
    <p>Your registration is complete. We're excited to have you on BeeJay Bets!</p>

    <!-- Go back to Home button -->
    <button @click="goHome">Go Back to Home</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const firstName = ref('');
const lastName = ref('');
const router = useRouter();
const route = useRoute();

// Fetch the user details from Airtable when the component mounts
onMounted(async () => {
  const username = route.query.username as string;

  if (username) {
    try {
      const response = await fetch(`http://localhost:3000/api/get-user/${username}`);
      const data = await response.json();

      if (response.ok) {
        // If user is found, populate first and last name
        firstName.value = data.FirstName || 'User';
        lastName.value = data.LastName || '';
      } else {
        console.error('User not found:', data.message);
        firstName.value = 'User';
        lastName.value = '';
      }
    } catch (error) {
      console.error('Error fetching user from Airtable:', error);
      firstName.value = 'User';
      lastName.value = '';
    }
  }
});

// Method to go back to the homepage
const goHome = () => {
  router.push({ name: 'home' });
};
</script>

<style scoped>
.thank-you-page {
  text-align: center;
  padding: 20px;
}

h2 {
  font-size: 2rem;
  color: #4CAF50;
}

p {
  font-size: 1.2rem;
  color: #333;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  margin-top: 20px;
  border-radius: 5px;
}

button:hover {
  background-color: #45a049;
}
</style>

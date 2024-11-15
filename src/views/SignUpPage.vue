<template>
  <div class="signup-page">

    <h2>Sign Up for BeeJay Bets</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="username">UserName</label>
        <input type="text" id="username" v-model="formData.username" required />
      </div>
      <div>
        <label for="firstname">First Name</label>
        <input type="text" id="firstname" v-model="formData.firstName" required />
      </div>
      <div>
        <label for="lastname">Last Name</label>
        <input type="text" id="lastname" v-model="formData.lastName" required />
      </div>
      <div>
        <label for="email">Email</label>
        <input type="email" id="email" v-model="formData.email" required />
      </div>
      <div>
        <label for="phone">Phone Number</label>
        <input type="tel" id="phone" v-model="formData.phoneNumber" required />
      </div>
      <button @click="goBack" class="back-button">Back to Home</button>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "SignUpPage",
  data() {
    return {
      formData: {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
      }
    };
  },
    methods: {
    // This method is called when the Back button is clicked
    goBack() {
      this.$router.push('/');  // Navigate back to the homepage
    },
    async handleSubmit() {
        try {
            const response = await fetch('http://localhost:3000/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.formData)
            });

            if (response.ok) {
                // Redirect to the Thank You page with username as a query param
                this.$router.push({ 
                    name: 'thank-you', 
                    query: { 
                        username: this.formData.username,  // Send the username to ThankYouPage
                }    
                });
            } else {
                alert('Error signing up!');
            }
            } catch (error) {
                console.error('Error:', error);
                alert('There was an error submitting the form.');
            }
        }
    }
};
</script>

<style scoped>
.signup-page {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

/* Styling for the Back button */
.back-button {
  background-color: #f44336;  /* Red color */
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  margin-right: 10px;
  border-radius: 5px;
}

.back-button:hover {
  background-color: #d32f2f;  /* Darker red when hovering */
}

form div {
  margin-bottom: 15px;
}

input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
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

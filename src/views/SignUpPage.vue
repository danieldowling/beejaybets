<template>
  <div class="signup-page">

    <h2>Sign Up for BeeJay Bets</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="username">UserName</label>
        <input type="text" id="username" v-model="formData.username" required @input="checkUsername"/>
      </div>
      <div v-if="usernameError" class="error">{{ usernameError }}</div>
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
      <button type="submit" :disabled="usernameError || !isFormValid">Submit</button>
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
      },
      usernameError: '',
      isFormValid: true,
    };
  },
    methods: {
    // This method is called when the Back button is clicked
    goBack() {
      this.$router.push('/');  // Navigate back to the homepage
    },
    // Check if username is unique
    async checkUsername() {
      // Clear any existing error
      this.usernameError = '';
      
      try {
        const response = await axios.post('http://localhost:3000/check-username', {
          username: this.formData.username,
        });

        if (response.data.message === 'Username available') {
          this.usernameError = ''; // Clear any previous error
        }
      } catch (error) {
        if (error.response && error.response.status === 422) {
          this.usernameError = error.response.data.message; // Display the error from the backend
        } else {
          this.usernameError = 'Error checking username. Please try again later.';
        }
      }
    },
    async handleSubmit() {
      try {
        const response = await axios.post('http://localhost:3000/api/signup', this.formData);

        if (response.status === 200 && response.data.success === true) {
          this.$router.push('/thank-you');
        } else {
            alert('Error signing up: ' + (response.data.message || 'Something went wrong.'));
        }
      } catch (error) {
        console.error('Error:', error);
        if (error.response) {
            // Show specific server-side error message
            alert('Error signing up: ' + error.response.data.message);
        } else {
            // Show a generic error message if no response was received
            alert('There was an error submitting the form.');
        }
      }
    },
  },
  computed: {
    isFormValid() {
      return this.formData.username && this.formData.firstName && this.formData.lastName && this.formData.email && this.formData.phoneNumber;
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

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error {
  color: red;
  font-size: 12px;
}
</style>

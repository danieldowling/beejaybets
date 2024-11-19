<template>
  <div class="signup-page">

    <h2>Sign Up for BeeJay Bets</h2>
    <form @submit.prevent="handleSubmit">

        <div>
        <label for="username">UserName</label>
        <input type="text" id="username" v-model="formData.username" required @input="checkUsername"/>
      </div>
      <div v-if="usernameError" class="error">{{ usernameError }}</div>
      <div class="form-row">
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="formData.password" required />
      </div>
      <div v-if="passwordError" class="error">{{ passwordError }}</div>
      <div class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input type="password" id="confirmPassword" v-model="formData.confirmPassword" required />
      </div>
      <div v-if="passwordMatchError" class="error">{{ passwordMatchError }}</div>
    </div>
    <div class="form-row">
        <div class="form-group">
        <label for="firstname">First Name</label>
        <input type="text" id="firstname" v-model="formData.firstName" required />
      </div>
      <div class="form-group">
        <label for="lastname">Last Name</label>
        <input type="text" id="lastname" v-model="formData.lastName" required />
      </div>

      <div class="form-group">
        <label for="phone">Phone Number</label>
        <input v-mask="'(###) ###-####'"  type="tel" id="phone" v-model="formData.phoneNumber" @blur="normalizePhoneNumber" required />
      </div>
      <div v-if="phoneNumberError" class="error">{{ phoneNumberError }}</div>
    <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="formData.email" required />
      </div>
    </div>
    <div class="form-row">
        <div class="form-group">
            <button @click="goBack" class="back-button">Back to Home</button>
        </div>
        <div class="form-group">
            <button type="submit" :disabled="usernameError || !isFormValid">Submit</button>
        </div>
        
    </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { isValidPhoneNumber, parsePhoneNumberFromString } from 'libphonenumber-js';

export default {
  name: "SignUpPage",
  data() {
    return {
      formData: {
        username: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
      },
      usernameError: '',
      passwordError: '',
      passwordMatchError: '',
      phoneNumberError: '',
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
    normalizePhoneNumber() {
      let phone = this.formData.phoneNumber;

      // Remove non-numeric characters to normalize the phone number
      phone = phone.replace(/[^\d]/g, '');

      // Check if the phone number has at least 10 digits (e.g., +1 for US)
      if (phone.length === 10) {
        this.phoneNumberError = '';
        // Format phone number to +1XXXXXXXXXX (E.164 format)
        this.formData.phoneNumber = '+1' + phone;
      } else {
        this.phoneNumberError = 'Invalid phone number. Please enter a valid 10-digit phone number.';
      }
    },
    // Validate the passwords
    validatePassword() {
      if (this.formData.password !== this.formData.confirmPassword) {
        this.passwordMatchError = "Passwords do not match!";
      } else {
        this.passwordMatchError = '';
      }

      // Additional password validation (e.g., length, strength)
      if (this.formData.password.length < 6) {
        this.passwordError = "Password must be at least 6 characters long.";
      } else {
        this.passwordError = '';
      }
    },
    async handleSubmit() {
        if (this.passwordError || this.passwordMatchError) {
            return;
        }
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
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
}

.form-group {
  flex: 1 1 calc(50% - 20px); /* 50% width minus gap */
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

/* Styling for the Back button */
.back-button {
  background-color: #781f19;  /* Red color */
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  margin-right: 10px;
  border-radius: 5px;
}

.back-button:hover {
  background-color: #ad2920;  /* Darker red when hovering */
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
  color: #ad2920;
  font-size: 12px;
}

@media (max-width: 768px) {
  .form-group {
    flex: 1 1 100%; /* Full width on smaller screens */
  }

  button {
    width: 100%;
  }
}
</style>

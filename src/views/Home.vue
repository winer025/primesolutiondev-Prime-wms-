<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Left side -->
    <div class="w-1/2 bg-blue-900 flex items-center justify-center p-12">
      <div class="text-white">
        <h1 class="text-4xl font-bold mb-4">Welcome to</h1>
        <h2 class="text-5xl font-bold">Warehouse Management System</h2>
      </div>
    </div>
    
    <!-- Right side -->
    <div class="w-1/2 flex items-center justify-center">
      <div class="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 class="font-poppins text-[25px] font-bold leading-[39px] text-[#333333] w-[266.03px] text-left pl-0">Hello!</h2>
        <p class="text-gray-600 mb-8 text-left">Sign in to Get Started</p>
        
        <!-- Form for user login -->
        <form @submit.prevent="handleSubmit">
          <!-- Username input field -->
          <div class="relative mb-6">
            <input
              v-model="username"
              type="text"
              placeholder="Username"
              class="w-full h-[60px] pl-12 pr-6 rounded-[30px] border border-gray-300 focus:outline-none focus:border-blue-500 text-gray-700 placeholder-gray-400 bg-white"
            />
            <svg xmlns="http://www.w3.org/2000/svg" class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
          </div>
          <!-- Password input field -->
          <div class="relative mb-6">
            <input
              v-model="password"
              type="password"
              placeholder="Password"
              class="w-full h-[60px] pl-12 pr-6 rounded-[30px] border border-gray-300 focus:outline-none focus:border-blue-500 text-gray-700 placeholder-gray-400 bg-white"
            />
            <svg xmlns="http://www.w3.org/2000/svg" class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <!-- Submit button -->
          <button
            type="submit"
            class="w-full h-[57px] rounded-[30px] text-white font-semibold bg-gradient-to-r from-[#112A49] to-[#2965AF] hover:from-[#0e2238] hover:to-[#245a9e] transition duration-300"
          >
            <span v-if="!loading">Login</span>
            <span v-else>Loading...</span>
          </button>
        </form>
        
        <div class="mt-4 text-center">
          <label class="text-sm text-gray-600">
            Remember me
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

// Mock user data for testing
const testUsers = [
  { username: "admin", password: "admin123", permissions: ["goods_receive", "putaway", "picking", "qc", "packing", "goods_issue", "replenishment"] },
  { username: "warehouse", password: "wh123", permissions: ["goods_receive", "putaway", "picking"] },
  { username: "packer", password: "pack123", permissions: ["packing", "goods_issue"] },
  { username: "qc", password: "qc123", permissions: ["qc"] },
];

export default defineComponent({
  name: "Home",
  setup() {
    // Define reactive variables for username, password, and loading state
    const username = ref("");
    const password = ref("");
    const loading = ref(false);
    const router = useRouter();

    // Function to handle form submission
    const handleSubmit = async () => {
      if (username.value && password.value) {
        loading.value = true;
        try {
          // Simulate API call with our test data
          const user = testUsers.find(u => u.username === username.value && u.password === password.value);
          
          if (user) {
            // Create a simple token (in a real app, this would be a proper JWT)
            const token = btoa(JSON.stringify({ username: user.username, permissions: user.permissions }));
            
            // Store token and permissions in localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("permissions", JSON.stringify(user.permissions));
            
            // Redirect to dashboard
            router.push("/dashboard");
          } else {
            throw new Error("Invalid credentials");
          }
        } catch (error) {
          alert("Login failed. Please check your username and password.");
        } finally {
          loading.value = false;
        }
      } else {
        alert("Please enter your username and password.");
      }
    };

    return {
      username,
      password,
      loading,
      handleSubmit,
    };
  },
});
</script>
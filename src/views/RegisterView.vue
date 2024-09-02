<script setup>
import { ref } from "vue";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const form = ref({
  email: "",
  password: "",
});

const handleRegister = () => {
  console.log(` ${form.value.email}, ${form.value.password}`);
  createUserWithEmailAndPassword(auth, form.value.email, form.value.password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.error(`${errorCode} : ${errorMessage}`);
    });
};
</script>

<template>
  <div class="bg-gray-900 mw-dvw h-dvh bg-gray-900 grid place-content-center">
    <form
      @submit.prevent="handleRegister"
      class="text-white w-[25dvw] bg-gray-800 p-8 rounded-lg"
    >
      <input
        v-model="form.email"
        type="text"
        class="w-full bg-gray-800 border border-gray-600 p-2 rounded-sm mb-6"
        placeholder="Email"
      />
      <input
        v-model="form.password"
        type="text"
        class="w-full bg-gray-800 border border-gray-600 p-2 rounded-sm mb-6"
        placeholder="Password"
      />
      <button
        class="bg-blue-900 px-4 py-2 rounded border border-gray-600 w-full"
      >
        Register
      </button>
    </form>
  </div>
</template>

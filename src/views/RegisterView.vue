<script setup>
import { ref } from "vue";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { router } from "../router";
import { useToast } from "vue-toastification";

const form = ref({
  email: "",
  password: "",
});

const handleRegister = () => {
  // router.push("/");
  const toast = useToast();
  console.log(` ${form.value.email}, ${form.value.password}`);
  createUserWithEmailAndPassword(auth, form.value.email, form.value.password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      console.log(user);
      toast.info("Successfully creating an account!");
      router.push("/login");
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
        required
      />
      <input
        v-model="form.password"
        type="text"
        class="w-full bg-gray-800 border border-gray-600 p-2 rounded-sm mb-6"
        placeholder="Password"
        required
      />
      <button
        class="bg-blue-900 px-4 py-2 rounded border border-gray-600 w-full"
      >
        Sign up
      </button>
    </form>
  </div>
</template>

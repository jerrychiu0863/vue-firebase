<script setup>
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { router } from "../router";

const form = ref({
  email: "",
  password: "",
});

const handleSumbit = () => {
  // console.log(`${form.value.email}, ${form.value.password}`);
  // console.log(data);

  signInWithEmailAndPassword(auth, form.value.email, form.value.password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      router.push("/");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`Code:${errorCode}, Message:${errorMessage}`);
    });
};

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user);
      // router.push("/");
    } else {
      console.log("no user");
    }
  });
});
</script>

<template>
  <div class="bg-gray-900 mw-dvw h-dvh bg-gray-900 grid place-content-center">
    <div
      class="text-white min-w-[350px] w-[90dvw] md:w-[25dvw] bg-gray-800 p-8 rounded-lg"
    >
      <form @submit.prevent="handleSumbit" class="mb-4">
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
          Log In
        </button>
      </form>
      <RouterLink
        class="px-4 py-2 rounded border border-gray-600 w-full block text-center hover:bg-gray-700"
        to="/register"
      >
        Sign up
      </RouterLink>
    </div>
  </div>
</template>

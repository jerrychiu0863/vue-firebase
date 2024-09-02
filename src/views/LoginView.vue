<script setup>
import { ref } from "vue";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
const form = ref({
  email: "",
  passowrd: "",
});

const handleSumbit = async () => {
  const data = {
    content: form.value.content,
    type: form.value.type,
  };
  // console.log(data);

  try {
    const docRef = await addDoc(collection(db, "words"), data);
    form.value.content = "";
    console.log(docRef);
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div class="bg-gray-900 mw-dvw h-dvh bg-gray-900 grid place-content-center">
    <form
      @submit.prevent="handleSumbit"
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
        Log In
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import { onAuthStateChanged } from "firebase/auth";
import {
  doc,
  setDoc,
  arrayUnion,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { router } from "../router";

const word = ref({
  content: "",
  type: "noun",
});

const currentUser = ref({
  email: "",
  id: "",
});

const handleSumbit = async () => {
  const newWord = {
    content: word.value.content,
    type: word.value.type,
  };
  // Add new item
  await updateDoc(doc(db, "todos", currentUser.value.id), {
    lists: arrayUnion(newWord),
  });

  // Remove item
  // await updateDoc(doc(db, "todos", currentUser.value.id), {
  //   lists: arrayRemove({ content: "New Word", type: "noun" }),
  // });

  // await setDoc(doc(db, "todos", currentUser.value.id), data);
  // console.log(currentUser.value.id);
  console.log(newWord);
};

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      currentUser.value.email = user.email;
      currentUser.value.id = user.uid;
    } else {
      // User is signed out
      // ...
    }
  });
});
</script>

<template>
  <div class="bg-gray-900 mw-dvw h-dvh bg-gray-900 grid place-content-center">
    <div class="text-white w-[25dvw] bg-gray-800 p-8 rounded-lg">
      <p>Email: {{ currentUser.email }}</p>
      <p>ID: {{ currentUser.id }}</p>
      <form @submit.prevent="handleSumbit">
        <input
          v-model="word.content"
          type="text"
          class="w-full bg-gray-800 border border-gray-600 p-2 rounded-sm mb-6"
          placeholder="word..."
        />
        <select name="" id="" class="text-gray-700" v-model="word.type">
          <option value="noun" selected>Noun</option>
          <option value="adjective">Adjective</option>
        </select>
        <button
          class="bg-blue-900 px-4 py-2 rounded border border-gray-600 w-full"
        >
          Log In
        </button>
      </form>
      <RouterLink to="/register">Test</RouterLink>
    </div>
  </div>
</template>

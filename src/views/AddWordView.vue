<script setup>
import { ref } from "vue";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
const form = ref({
  content: "",
  type: "noun",
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
        v-model="form.content"
        type="text"
        class="w-full bg-gray-800 border border-gray-600 p-2 rounded-sm mb-6"
      />
      <select
        v-model="form.type"
        name=""
        id=""
        class="w-full bg-gray-800 border border-gray-600 p-2 rounded-sm mb-6"
      >
        <option value="noun" selected>Noun</option>
        <option value="verb">Verb</option>
        <option value="adj.">Adjective</option>
        <option value="adv.">Adverb</option>
        <option value="prep.">Preposition</option>
        <option value="phrasal verb">Phrasal Verb</option>
        <option value="idom">Idom</option>
      </select>
      <button
        class="bg-blue-900 px-4 py-2 rounded border border-gray-600 w-full"
      >
        Add Word
      </button>
    </form>
  </div>
</template>

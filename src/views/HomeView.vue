<script setup>
import { ref, onMounted } from "vue";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { router } from "../router";

const x = ref(0);
const y = ref(0);
const words = ref([]);
const shuffledWords = ref([]);
const form = ref({
  content: "",
  done: true,
});
const currentUser = ref({
  email: "",
  id: "",
});
// onMounted(() => {
//   window.addEventListener("mousemove", (e) => {
//     x.value = e.pageX;
//     y.value = e.pageY;
//   });
// });

const handleSignOut = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log("Sign out");
      router.push("/login");
    })
    .catch((error) => {
      // An error happened.
      console.error("Error signing out");
    });
};

onMounted(() => {
  // create a listener for real-time updates
  onSnapshot(collection(db, "words"), (querySnapshot) => {
    let dbWords = [];
    querySnapshot.forEach((doc) => {
      let word = {};
      // console.log(`${doc.id} => ${doc.data()}`);
      word.id = doc.id;
      word.content = doc.data().content;
      word.type = doc.data().type;
      dbWords.push(word);
    });
    words.value = dbWords;
  });

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      currentUser.value.email = user.email;
    } else {
      // User is signed out
      // ...
    }
  });
});

// onUnmounted(() => {
//   window.removeEventListener("mousemove", (e) => {
//     x.value = e.pageX;
//     y.value = e.pageY;
//   });
// });
const shuffle = () => {
  const duplicatedWords = words.value.slice().sort(() => Math.random() - 0.5);
  shuffledWords.value = duplicatedWords.slice(0, 5);
  console.log(duplicatedWords.slice(0, 5));
};

const handleSubmit = async () => {
  const data = {
    content: form.value.content,
    done: form.value.done,
  };

  try {
    const docRef = await addDoc(collection(db, "todos"), data);
    console.log(docRef);
  } catch (error) {}
};

const handleDelete = async (id) => {
  const confirm = window.confirm("Delete Word?");
  if (confirm) {
    try {
      await deleteDoc(doc(db, "words", id));
    } catch (error) {
      console.error("Error deleting word" + error);
    }
  }
};
</script>

<template>
  <div class="w-dvw h-dvh bg-gray-900 flex divide-x divide-gray-600">
    <div class="w-4/5 text-white p-4 max-h-dvh overflow-y-auto">
      <div class="grid grid-cols-4 gap-4">
        <div
          v-for="word in words"
          :key="word.id"
          class="bg-gray-800 border border-gray-600 text-gray-300 rounded-lg p-4"
        >
          <div class="flex items-end justify-between mb-4">
            <p class="italic">{{ word.type }}</p>
            <button class="hover:text-gray-100" @click="handleDelete(word.id)">
              X
            </button>
          </div>
          <div class="text-center mb-4">
            <p class="text-2xl font-bold">
              <a
                class="underline decoration-solid"
                target="_blank"
                :href="`https://dictionary.cambridge.org/zht/%E8%A9%9E%E5%85%B8/%E8%8B%B1%E8%AA%9E-%E6%BC%A2%E8%AA%9E-%E7%B9%81%E9%AB%94/${word.content}`"
              >
                {{ word.content }}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="w-1/5 text-white p-4 max-h-dvh overflow-y-auto">
      <div>
        <p>User : {{ currentUser.email }}</p>
        <p>Id : {{ currentUser.id }}</p>
      </div>
      <div class="mb-4 flex justify-between">
        <button
          class="bg-blue-900 px-4 py-2 rounded border border-gray-600"
          @click="shuffle"
        >
          Suffle Voculabury
        </button>
        <button
          @click="handleSignOut"
          class="border border-gray-600 px-4 py-2 rounded"
        >
          Log out
        </button>
      </div>
      <div class="grid grid-cols-1 gap-4">
        <div
          v-for="shuffledWord in shuffledWords"
          :key="shuffledWord"
          class="bg-gray-800 border border-gray-600 text-gray-300 rounded-lg p-4"
        >
          <div class="flex items-start justify-between">
            <p class="text-2xl font-bold">
              <a
                class="underline decoration-solid"
                target="_blank"
                :href="`https://dictionary.cambridge.org/zht/%E8%A9%9E%E5%85%B8/%E8%8B%B1%E8%AA%9E-%E6%BC%A2%E8%AA%9E-%E7%B9%81%E9%AB%94/${shuffledWord.content}`"
              >
                {{ shuffledWord.content }}
              </a>
            </p>
            <p class="italic">{{ shuffledWord.type }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

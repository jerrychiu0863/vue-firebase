<script setup>
import { ref, onMounted } from "vue";
// Firebase
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
  setDoc,
  getDoc,
  arrayUnion,
  arrayRemove,
  getFirestore,
} from "firebase/firestore";
import { db } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
// Router
import { router } from "../router";
// Dependency
import { v4 as uuidv4 } from "uuid";

const x = ref(0);
const y = ref(0);
const words = ref([]);
const shuffledWords = ref([]);
const currentUser = ref({
  email: "",
  id: "",
});
const form = ref({
  content: "",
  type: "noun",
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

const shuffle = () => {
  const duplicatedWords = words.value.slice().sort(() => Math.random() - 0.5);
  shuffledWords.value = duplicatedWords.slice(0, 5);
  // console.log(duplicatedWords.slice(0, 5));
};

const handleDelete = async (word) => {
  const confirm = window.confirm("Delete Word?");
  if (confirm) {
    try {
      await updateDoc(doc(db, "todos", currentUser.value.id), {
        lists: arrayRemove(word),
      });
    } catch (error) {
      console.error("Error deleting word" + error);
    }
  }
};

const handleAddWord = async () => {
  const data = {
    content: form.value.content,
    type: form.value.type,
    id: uuidv4(),
  };

  const firestore = getFirestore();
  const docRef = doc(firestore, "todos", currentUser.value.id);
  const userDoc = await getDoc(docRef);

  // Check if user exists
  if (!userDoc.exists()) {
    // Add a new document in collection "cities"
    await setDoc(doc(db, "todos", currentUser.value.id), {
      lists: [data],
    });
  } else {
    // Add new item
    await updateDoc(doc(db, "todos", currentUser.value.id), {
      lists: arrayUnion(data),
    });
  }
  form.value.content = "";
};

onMounted(() => {
  // create a listener for real-time updates
  // onSnapshot(collection(db, "words"), (querySnapshot) => {
  //   let dbWords = [];
  //   querySnapshot.forEach((doc) => {
  //     let word = {};
  //     // console.log(`${doc.id} => ${doc.data()}`);
  //     word.id = doc.id;
  //     word.content = doc.data().content;
  //     word.type = doc.data().type;
  //     dbWords.push(word);
  //   });
  //   words.value = dbWords;
  // });

  // console.log(currentUser.value.id);

  //

  // onSnapshot(
  //   getDoc(doc(db, "todos", currentUser.value.id)),
  //   (querySnapshot) => {
  //     let dbWords = [];
  //     querySnapshot.forEach((doc) => {
  //       let word = {};
  //       // console.log(`${doc.id} => ${doc.data()}`);
  //       word.id = doc.id;
  //       word.content = doc.data().content;
  //       word.type = doc.data().type;
  //       dbWords.push(word);
  //     });
  //     words.value = dbWords;
  //   }
  // );

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      currentUser.value.email = user.email;
      currentUser.value.id = user.uid;
      onSnapshot(doc(db, "todos", currentUser.value.id), (doc) => {
        if (doc.data()) {
          words.value = doc.data().lists;
        }
        // console.log(doc.data());
        // // if (doc.data().lists.length) {
        // //   words.value = doc.data().lists;
        // // }
        // // console.log(doc.data());
      });
    } else {
      // User is signed out
      // ...
    }
  });
});

// onMounted(async () => {
//   const docSnap = await getDoc(doc(db, "words", "019VHOnbSw17SGzVZNvy"));
//   if (docSnap.exists()) {
//     console.log(docSnap.data());
//   } else {
//     console.log("Doc does not exist.");
//   }
// });

// onUnmounted(() => {
//   window.removeEventListener("mousemove", (e) => {
//     x.value = e.pageX;
//     y.value = e.pageY;
//   });
// });
</script>

<template>
  <div class="w-dvw h-dvh bg-gray-900 flex md:divide-x divide-gray-600">
    <div class="hidden md:block w-4/5 text-white max-h-dvh">
      <!-- <button @click="addToCollection">Add to New Collection</button> -->
      <div class="h-[10dvh] p-4 flex items-center pb-0">
        <form
          @submit.prevent="handleAddWord"
          class="text-white rounded-lg flex items-center flex-grow"
        >
          <input
            v-model="form.content"
            type="text"
            class="bg-gray-800 border border-gray-600 p-2 rounded-sm flex-grow"
            placeholder="Add New Word"
          />
          <select
            v-model="form.type"
            name=""
            id=""
            class="bg-gray-800 border border-gray-600 p-2 rounded-sm text-white mx-4 h-[42px]"
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
            type="submit"
            class="bg-blue-900 px-4 py-2 rounded border border-gray-600"
          >
            Add Word
          </button>
        </form>
      </div>
      <div class="grid grid-cols-4 gap-4 p-4 max-h-[90dvh] overflow-y-auto">
        <div
          v-for="word in words"
          :key="word.id"
          class="bg-gray-800 border border-gray-600 text-gray-300 rounded-lg p-4"
        >
          <div class="flex items-end justify-between mb-4">
            <p class="italic">{{ word.type }}</p>
            <button class="hover:text-gray-100" @click="handleDelete(word)">
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
    <div class="w-screen md:w-1/5 text-white p-4 max-h-dvh overflow-y-auto">
      <div class="mb-4 flex justify-between items-center">
        <p class="text-gray-300">
          <i class="pi pi-user"></i> : {{ currentUser.email }}
        </p>
        <button
          @click="handleSignOut"
          class="border border-gray-600 py-2 px-4 rounded"
        >
          <i class="pi pi-sign-out"></i>
        </button>
        <!-- <p>Id : {{ currentUser.id }}</p> -->
      </div>
      <div class="mb-4 flex justify-between">
        <button
          class="bg-blue-900 px-4 py-2 rounded border border-gray-600"
          @click="shuffle"
        >
          Suffle Voculabury
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

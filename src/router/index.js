import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AddWordView from "../views/AddWordView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import TestView from "../views/TestView.vue";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/add-word",
      name: "add-word",
      component: AddWordView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/test",
      name: "test",
      component: TestView,
    },
  ],
});

// const getCurrentUse = () => {
//   return new Promise((resolve, reject) => {
//     const removeListener = onAuthStateChanged(
//       auth,
//       (user) => {
//         removeListener();
//         resolve(user);
//       },
//       reject
//     );
//   });
// };

// console.log(auth);
router.beforeEach(async (to, from, next) => {
  // console.log(auth.currentUser);
  await auth.authStateReady();
  // console.log(auth.currentUser);
  if (to.meta.requireAuth) {
    if (auth.currentUser) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

export { router };

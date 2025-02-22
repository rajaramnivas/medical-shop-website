import { create } from "zustand";
import { persist } from "zustand/middleware";

const ADMIN_CREDENTIALS = {
  email: "admin@medicare.com",
  password: "admin123",
  name: "Admin",
};

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null, // Logged-in user object
      isAdmin: false, // Indicates if the user is an admin
      users: [], // Registered users (only for local store)

      // Register User
      registerUser: (userData) => {
        const existingUserEmail = get().users.find(
          (user) => user.email === userData.email
        );
        if (existingUserEmail) {
          return { success: false, message: "Email already registered" };
        }

        const existingUserMobile = get().users.find(
          (user) => user.mobile === userData.mobile
        );
        if (existingUserMobile) {
          return {
            success: false,
            message: "Mobile number already registered with another email",
          };
        }

        set((state) => ({
          users: [...state.users, userData],
        }));
        return { success: true, message: "Registration successful" };
      },

      // Login Handler (compatible with Firebase and custom logic)
      login: (credentials) => {
        // Check if user is Admin
        if (
          credentials.email === ADMIN_CREDENTIALS.email &&
          credentials.password === ADMIN_CREDENTIALS.password
        ) {
          set({ user: ADMIN_CREDENTIALS, isAdmin: true });
          return { success: true, user: ADMIN_CREDENTIALS };
        }

        // Allow Firebase user or local store user login
        const firebaseUser = credentials.uid
          ? credentials // If the user comes from Firebase, they will have a UID
          : get().users.find(
              (u) =>
                u.email === credentials.email &&
                u.password === credentials.password
            );

        if (firebaseUser) {
          set({ user: firebaseUser, isAdmin: false });
          return { success: true, user: firebaseUser };
        }

        return { success: false, message: "Invalid email or password" };
      },

      // Logout User
      logout: () => set({ user: null, isAdmin: false }),

      // Get Current User
      getCurrentUser: () => get().user,
    }),
    {
      name: "auth-storage", // Name of the local storage key
    }
  )
);





// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// const ADMIN_CREDENTIALS = {
//   email: "admin@medicare.com",
//   password: "admin123",
//   name: "Admin",
// };

// export const useAuthStore = create(
//   persist(
//     (set, get) => ({
//       user: null,
//       isAdmin: false,
//       users: [],
//       registerUser: (userData) => {
//         const existingUserEmail = get().users.find(user => user.email === userData.email);
//         if (existingUserEmail) {
//           return { success: false, message: 'Email already registered' };
//         }

//         const existingUserMobile = get().users.find(user => user.mobile === userData.mobile);
//         if (existingUserMobile) {
//           return { success: false, message: 'Mobile number already registered with another email' };
//         }

//         set((state) => ({
//           users: [...state.users, userData]
//         }));
//         return { success: true, message: 'Registration successful' };
//       },
//       login: (credentials) => {
//         // Check admin credentials
//         if (
//           credentials.email === ADMIN_CREDENTIALS.email && 
//           credentials.password === ADMIN_CREDENTIALS.password
//         ) {
//           set({ user: ADMIN_CREDENTIALS, isAdmin: true });
//           return { success: true, user: ADMIN_CREDENTIALS };
//         }
        
//         // Check regular user credentials
//         const user = get().users.find(
//           u => u.email === credentials.email && u.password === credentials.password
//         );
        
//         if (user) {
//           set({ user, isAdmin: false });
//           return { success: true, user };
//         }
        
//         return { success: false, message: 'Invalid email or password' };
//       },
//       logout: () => set({ user: null, isAdmin: false }),
//       getCurrentUser: () => get().user,
//     }),
//     {
//       name: 'auth-storage',
//     }
//   )
// );

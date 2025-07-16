import { create } from 'zustand';

const useAuthStore = create((set) => {
  const bc = new BroadcastChannel('auth_channel');
  let initialized = false;

  const store = {
    jwtToken: null,
    role: null,
    username: null,

    setAuthData: ({ jwtToken, role, username }) => {
      set({ jwtToken, role, username });
      bc.postMessage({ jwtToken, role, username });
    },

    clearAuthData: () => set({ jwtToken: null, role: null, username: null }),

    initializeJwtToken: () => {
      if (!initialized) {
        bc.onmessage = (event) => {
          const { jwtToken, role, username } = event.data;
          set({ jwtToken, role, username });
        };
        initialized = true;
      }
    },
  };

  store.initializeJwtToken();
  return store;
});

export default useAuthStore;

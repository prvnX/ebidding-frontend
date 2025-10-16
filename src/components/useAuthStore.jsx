import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => {
      const bc = new BroadcastChannel('auth_channel');
      let initialized = false;

      const store = {
        jwtToken: null,
        role: null,
        username: null,
        _hasHydrated: false,

        setHasHydrated: (state) => {
          set({ _hasHydrated: state });
        },

        setAuthData: ({ jwtToken, role, username }) => {
          console.log('[Auth Store] Setting auth data:', { role, username, hasToken: !!jwtToken });
          set({ jwtToken, role, username });
          bc.postMessage({ jwtToken, role, username });
        },

        clearAuthData: () => {
          console.log('[Auth Store] Clearing auth data');
          set({ jwtToken: null, role: null, username: null });
          localStorage.removeItem('auth-storage');
        },

        initializeJwtToken: () => {
          if (!initialized) {
            bc.onmessage = (event) => {
              const { jwtToken, role, username } = event.data;
              console.log('[Auth Store] Received broadcast:', { role, username });
              set({ jwtToken, role, username });
            };
            initialized = true;
          }
        },
      };

      store.initializeJwtToken();
      return store;
    },
    {
      name: 'auth-storage', // localStorage key
      partialize: (state) => ({
        jwtToken: state.jwtToken,
        role: state.role,
        username: state.username,
      }),
      onRehydrateStorage: () => (state) => {
        console.log('[Auth Store] Hydration complete:', state);
        state?.setHasHydrated(true);
      },
    }
  )
);

export default useAuthStore;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, Language } from '../../entities';

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    updateUserLanguage: (state, action: PayloadAction<Language>) => {
      if (state.user) {
        state.user.language = action.payload;
      }
    },
    updateUserPremium: (state, action: PayloadAction<boolean>) => {
      if (state.user) {
        state.user.premium = action.payload;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
  },
});

export const { setUser, updateUserLanguage, updateUserPremium, setLoading, logout } = userSlice.actions;

import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Profile, ProfileState } from "../types/Profile";

// Initial state
const initialState: ProfileState = {
  profiles: [],
  draftProfile: {},
  loading: false,
};

// Simulated async save (mock API)
export const saveProfileAsync = createAsyncThunk(
  "profile/saveProfile",
  async (profile: Profile) => {
    return new Promise<Profile>((resolve) => {
      setTimeout(() => {
        resolve(profile);
      }, 1000);
    });
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    // Update draft data across steps
    updateDraft: (state, action: PayloadAction<Partial<Profile>>) => {
      state.draftProfile = {
        ...state.draftProfile,
        ...action.payload,
      };
    },

    // Clear draft after submit
    clearDraft: (state) => {
      state.draftProfile = {};
    },

    // Delete profile
    deleteProfile: (state, action: PayloadAction<string>) => {
      state.profiles = state.profiles.filter(
        (profile) => profile.id !== action.payload
      );
    },

    // Load existing profile for editing
    setDraftForEdit: (state, action: PayloadAction<Profile>) => {
      state.draftProfile = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(saveProfileAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveProfileAsync.fulfilled, (state, action) => {
        const index = state.profiles.findIndex(
          (p) => p.id === action.payload.id
        );

        if (index >= 0) {
          state.profiles[index] = action.payload;
        } else {
          state.profiles.push(action.payload);
        }

        state.loading = false;
        state.draftProfile = {};
      });
  },
});

export const {
  updateDraft,
  clearDraft,
  deleteProfile,
  setDraftForEdit,
} = profileSlice.actions;

export default profileSlice.reducer;

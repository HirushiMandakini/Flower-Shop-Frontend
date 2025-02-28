// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Define user type based on backend model
// interface User {
//   id: string;
//   name: string;
//   email: string;
//   createdAt: string;
// }

// // Define auth state
// interface AuthState {
//   user: User | null;
//   token: string | null;
//   loading: boolean;
//   error: string | null;
// }

// // Initial state
// const initialState: AuthState = {
//   user: null,
//   token: localStorage.getItem("token") || null,
//   loading: false,
//   error: null,
// };

// // ✅ Async thunk for user signup
// export const signupUser = createAsyncThunk(
//   "auth/signup",
//   async (userData: { name: string; email: string; password: string }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post("http://localhost:4000/api/user/register", userData);
//       localStorage.setItem("token", response.data.token); // Store token
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || "Signup failed");
//     }
//   }
// );

// // ✅ Async thunk for user login
// export const loginUser = createAsyncThunk(
//   "auth/login",
//   async (credentials: { email: string; password: string }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post("http://localhost:4000/api/user/login", credentials);
//       localStorage.setItem("token", response.data.token); // Store token
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || "Login failed");
//     }
//   }
// );

// // ✅ Auth slice
// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       localStorage.removeItem("token");
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Handle Signup
//       .addCase(signupUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(signupUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//       })
//       .addCase(signupUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })

//       // Handle Login
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// // Export actions & reducer
// export const { logout } = authSlice.actions;
// export default authSlice.reducer;








import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Signup User
export const signupUser = createAsyncThunk(
  "auth/signup",
  async (userData: { name: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:4000/user/register", userData);
      return response.data;
    } catch (error) {
      const errorMessage = (error as any).response?.data?.message || "Signup failed";
      return rejectWithValue(errorMessage);
    }
  }
);

// ✅ Login User
export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:4000/user/login", userData);
      localStorage.setItem("token", response.data.token); // ✅ Store token in localStorage
      return response.data;
    } catch (error) {
      const errorMessage = (error as any).response?.data?.message || "Login failed";
      return rejectWithValue(errorMessage);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: !!localStorage.getItem("token"),
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null as string | null,
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem("token"); // ✅ Remove token on logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

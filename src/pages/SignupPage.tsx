// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // ✅ Signup User
// export const signupUser = createAsyncThunk(
//   "auth/signup",
//   async (userData: { name: string; email: string; password: string }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post("http://localhost:4000/api/auth/signup", userData);
//       return response.data;
//     } catch (error) {
//       const errorMessage = (error as any).response?.data?.message || "Signup failed";
//       return rejectWithValue(errorMessage);
//     }
//   }
// );

// // ✅ Login User
// export const loginUser = createAsyncThunk(
//   "auth/login",
//   async (userData: { email: string; password: string }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post("http://localhost:4000/api/auth/login", userData);
//       localStorage.setItem("token", response.data.token); // ✅ Store token in localStorage
//       return response.data;
//     } catch (error) {
//       const errorMessage = (error as any).response?.data?.message || "Login failed";
//       return rejectWithValue(errorMessage);
//     }
//   }
// );

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     isAuthenticated: !!localStorage.getItem("token"),
//     token: localStorage.getItem("token") || null,
//     loading: false,
//     error: null as string | null,
//   },
//   reducers: {
//     logout: (state) => {
//       state.isAuthenticated = false;
//       state.token = null;
//       localStorage.removeItem("token"); // ✅ Remove token on logout
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(signupUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(signupUser.fulfilled, (state) => {
//         state.loading = false;
//       })
//       .addCase(signupUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.isAuthenticated = true;
//         state.token = action.payload.token;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { signupUser } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

interface SignupFormData {
  name: string;
  email: string;
  password: string;
}

const SignupPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const { register, handleSubmit } = useForm<SignupFormData>();

  const onSubmit = async (data: SignupFormData) => {
    const result = await dispatch(signupUser(data));
    if (signupUser.fulfilled.match(result)) {
      navigate("/login");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Signup</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <input {...register("name")} placeholder="Name" className="border p-2 rounded" required />
          <input {...register("email")} type="email" placeholder="Email" className="border p-2 rounded" required />
          <input {...register("password")} type="password" placeholder="Password" className="border p-2 rounded" required />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded" disabled={loading}>
            {loading ? "Signing up..." : "Signup"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;

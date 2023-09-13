import { auth } from '@/lib/firebase';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

interface IUserState {
  user: {
    email: string | null;
  };
  isLoading: boolean;
  isError: boolean;
  error: string | null;
}

const initialState: IUserState = {
  user: {
    email: null,
  },
  isLoading: false,
  isError: false,
  error: null,
};

interface ICredential {
  email: string;
  password: string;
}

// signup user
export const createUser = createAsyncThunk(
  'user/createUser',
  async ({ email, password }: ICredential) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    //  must be return
    return data.user.email;
  }
);

// login user
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: ICredential) => {
    const data = await signInWithEmailAndPassword(auth, email, password);
    //  must be return
    return data.user.email;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // for logout
    setUser : (state, action : PayloadAction<string | null>)=>{
      state.user.email = action.payload;
    },
    setLoading: (state,action : PayloadAction<boolean>)=>{
      state.isLoading = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.user.email = action.payload;
        state.isLoading = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.user.email = null;
        state.isLoading = false;
        state.isError = true;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        state.error = action.error.message!;
      })

      //loging user case
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user.email = action.payload;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.user.email = null;
        state.isLoading = false;
        state.isError = true;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        state.error = action.error.message!;
      })
  },
});

export const {setUser,setLoading} = userSlice.actions;
export default userSlice.reducer;

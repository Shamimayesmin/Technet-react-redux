import { IProduct } from "@/types/globalTypes";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ICart {
    products: IProduct[];
}


const initialState : ICart = {
    products: []
}



const cartSlice = createSlice({
    name : 'cart',
    initialState,
    reducers :{
        addToCart: (state, action: PayloadAction<IProduct>) => {
            const existing = 
            state.products.find((product) => product._id === action.payload._id);

            if(existing){
               // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
               existing.quantity = existing.quantity! + 1;
            }else{
                state.products.push({...action.payload, quantity: 1})
            }
        },
    },

})

export const {addToCart,} = cartSlice.actions;

export default cartSlice.reducer;

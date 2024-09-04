import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  trashedNotes: [],
};

const trashSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    addTrashNote: (
      state,
      action: PayloadAction<{ notes: any; type: string }>
    ) => {
      if (state.trashedNotes.length === 0) {
        state.trashedNotes.push(...action.payload?.notes);
      }
    },
    deleteTrashNote: (state, action: PayloadAction<string>) => {
      state.trashedNotes = state.trashedNotes.filter(
        (note: any) => note.note_id !== action.payload
      );
    },
  },
});

export const { addTrashNote, deleteTrashNote } = trashSlice.actions;

export default trashSlice.reducer;

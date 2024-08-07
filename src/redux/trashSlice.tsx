import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Note {
  id: string;
  title: string;
  description: string;
}

interface NotesState {
  trashedNotes: Note[];
}

const initialState: NotesState = {
  trashedNotes: [],
};

const trashSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    addTrashNote: (
      state,
      action: PayloadAction<{ id: string; title: string; description: string }>
    ) => {
      state.trashedNotes.push({ ...action.payload });
    },
    deleteTrashNote: (state, action: PayloadAction<string>) => {
      state.trashedNotes = state.trashedNotes.filter(
        (note) => note.id !== action.payload
      );
    },
  },
});

export const { addTrashNote, deleteTrashNote } = trashSlice.actions;

export default trashSlice.reducer;

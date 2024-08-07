import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

interface Note {
  id: string;
  title: string;
  description: string;
}

interface NotesState {
  notes: Note[];
}

const initialState: NotesState = {
  notes: [],
};

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    addNote: (
      state,
      action: PayloadAction<{ title: string; description: string }>
    ) => {
      state.notes.push({ id: nanoid(), ...action.payload });
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
    updateNote: (
      state,
      action: PayloadAction<{
        id: string;
        newTitle: string;
        newDescription: string;
      }>
    ) => {
      const { id, newTitle, newDescription } = action.payload;
      const note = state.notes.find((note) => note.id === id);
      if (note) {
        note.title = newTitle;
        note.description = newDescription;
      }
    },
  },
});

export const { addNote, deleteNote, updateNote } = noteSlice.actions;

export default noteSlice.reducer;

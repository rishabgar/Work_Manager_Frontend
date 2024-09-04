import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Note {
  note_id?: string;
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
      action: PayloadAction<{
        note_id?: any;
        title?: any;
        description?: any;
        type: string;
        notes?: any;
      }>
    ) => {
      // state.notes.push({ id: nanoid(), ...action.payload });
      if (action.payload.type === "object") {
        state.notes.push({
          note_id: action.payload.note_id,
          title: action.payload.title,
          description: action.payload.description,
        });
      } else if (
        state.notes.length === 0 &&
        action.payload.notes !== undefined
      ) {
        state.notes.push(...action.payload?.notes);
      }
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter(
        (note) => note.note_id !== action.payload
      );
    },
    updateNote: (
      state,
      action: PayloadAction<{
        note_id: string;
        newTitle: string;
        newDescription: string;
      }>
    ) => {
      // const { id, newTitle, newDescription } = action.payload;
      // const note = state.notes.find((note) => note.id === id);
      // if (note) {
      //   note.title = newTitle;
      //   note.description = newDescription;
      // }
      const { note_id, newTitle, newDescription } = action.payload;
      const note = state.notes.find((note) => note.note_id === note_id);
      if (note) {
        note.title = newTitle;
        note.description = newDescription;
      }
    },
  },
});

export const { addNote, deleteNote, updateNote } = noteSlice.actions;

export default noteSlice.reducer;

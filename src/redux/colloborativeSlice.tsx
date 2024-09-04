import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  notes: [],
};

const colloborativeNoteSlice = createSlice({
  name: "colloborativeNote",
  initialState,
  reducers: {
    cAddNote: (
      state,
      action: PayloadAction<{
        notes: any;
        type: string;
      }>
    ) => {
      if (state.notes.length === 0) {
        state.notes.push(...action.payload?.notes);
      } else if (action.payload.type === "object") {
        state.notes.push({
          note_id: action.payload.notes.note_id,
          title: action.payload.notes.title,
          description: action.payload.notes.description,
        });
      }
    },
    cDeleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter(
        (note: any) => note.note_id !== action.payload
      );
    },
    cUpdateNote: (
      state,
      action: PayloadAction<{
        note_id: string;
        newTitle: string;
        newDescription: string;
      }>
    ) => {
      const { note_id, newTitle, newDescription } = action.payload;
      const note = state.notes.find((note: any) => note.note_id === note_id);
      if (note) {
        note.title = newTitle;
        note.description = newDescription;
      }
    },
  },
});

export const { cAddNote, cDeleteNote, cUpdateNote } =
  colloborativeNoteSlice.actions;

export default colloborativeNoteSlice.reducer;

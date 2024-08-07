import { useEffect, useState } from "react";
import { Input } from "../components";
import NoteModal from "../modal/NoteMoodal";
import ShowTaskModal from "../modal/ShowTaskModal";
import { useDispatch, useSelector } from "react-redux";
import { addNote, updateNote, deleteNote } from "../redux/noteSlice";
import { addTrashNote } from "../redux/trashSlice";
import { MdDeleteForever } from "react-icons/md";
import { addAuth } from "../redux/authSlice";
import useLocalStorage from "../customHooks/getLocalStorageData";
import { useLocation } from "react-router-dom";

interface Note {
  id: number;
  title: string;
  description: string;
}

interface NotesState {
  notes: Note[];
}

interface RootState {
  notes: NotesState;
}

function NotePage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const dispatch = useDispatch();
  const notes = useSelector((state: RootState) => state?.notes.notes);
  const [open, setOpen] = useState(false);

  const [inputClicked, setInputClicked] = useState(false);
  const [note, setNote] = useState({
    title: "",
    description: "",
  });
  const [noteId, setNoteId] = useState<any>("");

  function handleNoteSave() {
    setInputClicked(false);
    dispatch(addNote(note));
  }

  const handleOpen = (tit: string, des: string) => {
    setNote({
      title: tit,
      description: des,
    });

    setOpen(true);
  };

  const handleClose = () => {
    dispatch(
      updateNote({
        id: noteId,
        newTitle: note.title,
        newDescription: note.description,
      })
    );
    setOpen(false);
  };

  const handleDeleteNote = ({ pNoteId, pTitle, pDescription }: any) => {
    dispatch(deleteNote(pNoteId));
    dispatch(
      addTrashNote({ id: pNoteId, title: pTitle, description: pDescription })
    );
  };

  useEffect(() => {
    const query: any = queryParams.get("token");
    query !== null && localStorage.setItem("authData", query);
    const authKey = useLocalStorage("authData");
    dispatch(addAuth({ authKey: authKey }));
  }, []);

  return (
    <div className="overflow-auto">
      <div className="w-full flex justify-center items-start">
        {inputClicked ? (
          <NoteModal handleNote={setNote} handleSave={handleNoteSave} />
        ) : (
          <div
            className={`h-12 w-[35rem] mt-9 shadow-[2px_2px_2px_3px_rgba(0,0,0,0.2)] rounded-lg px-2 `}
            onClick={() => setInputClicked(true)}
          >
            <Input type="text" placeholder="Take a note..." />
          </div>
        )}
      </div>
      <div className="my-7 mx-10 flex flex-wrap ">
        {notes.map((note) => {
          return (
            <div className="group" key={note.id}>
              <div
                className="min-h-32 max-h-60 w-64 shadow-[2px_2px_2px_3px_rgba(0,0,0,0.2)] cursor-pointer overflow-hidden mr-4 p-2"
                onClick={() => {
                  handleOpen(note.title, note.description);
                  setNoteId(note.id);
                }}
              >
                <p className="mb-2 font-bold">{note.title}</p>
                <p>{note.description}</p>
              </div>
              <div className=" hidden group-hover:block shadow-[2px_2px_2px_3px_rgba(0,0,0,0.2)] w-64 h-10">
                <div
                  className="flex items-center h-full justify-end cursor-pointer"
                  onClick={() => {
                    handleDeleteNote({
                      pNoteId: note.id,
                      pTitle: note.title,
                      pDescription: note.description,
                    });
                  }}
                >
                  <MdDeleteForever className="text-2xl" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ShowTaskModal
        open={open}
        handleClose={handleClose}
        setNote={setNote}
        note={note}
      />
    </div>
  );
}

export default NotePage;

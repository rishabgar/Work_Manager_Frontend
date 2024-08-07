import { useDispatch, useSelector } from "react-redux";
import { deleteTrashNote } from "../redux/trashSlice";
import { addNote } from "../redux/noteSlice";
import { MdDeleteForever } from "react-icons/md";
import { RiDeviceRecoverLine } from "react-icons/ri";
import { Alert } from "../components";
import { useEffect, useState } from "react";
import { addAuth } from "../redux/authSlice";
import useLocalStorage from "../customHooks/getLocalStorageData";

function TrashPage() {
  const dispatch = useDispatch();
  const notes = useSelector((state: any) => state.trashedNotes.trashedNotes);
  const [alert, setAlert] = useState(false);
  const [note, setNote] = useState({
    id: "",
    title: "",
    description: "",
  });

  const handleDeleteNote = (note_id: string) => {
    dispatch(deleteTrashNote(note_id));
  };

  // const handleRecover = ({ pNoteId, pNoteTitle, pNoteDescription }: any) => {
  //   setAlert(true);
  //   // dispatch(deleteTrashNote(pNoteId));
  //   // dispatch(addNote({ title: pNoteTitle, description: pNoteDescription }));
  // };

  const handleAlertClose = () => {
    dispatch(deleteTrashNote(note.id));
    dispatch(addNote({ title: note.title, description: note.description }));
    setAlert(false);
  };

  useEffect(() => {
    const authKey = useLocalStorage("authData");
    dispatch(addAuth({ authKey: authKey }));
  }, []);

  return (
    <>
      <div className="overflow-auto">
        <div className="my-7 mx-10 flex flex-wrap ">
          {notes.map((note: any) => {
            return (
              <div className="group" key={note.id}>
                <div className="min-h-32 max-h-60 w-64 shadow-[2px_2px_2px_3px_rgba(0,0,0,0.2)] cursor-pointer overflow-hidden mr-4 p-2">
                  <p className="mb-2 font-bold">{note.title}</p>
                  <p>{note.description}</p>
                </div>
                <div className="hidden group-hover:block shadow-[2px_2px_2px_3px_rgba(0,0,0,0.2)] w-64 h-10">
                  <div className="flex h-full w-full items-center justify-end">
                    <div
                      className="cursor-pointer px-1"
                      onClick={() => {
                        handleDeleteNote(note.id);
                      }}
                    >
                      <MdDeleteForever className="text-2xl" />
                    </div>
                    <div
                      className="cursor-pointer px-1"
                      onClick={() => {
                        setAlert(true);
                        setNote({
                          id: note.id,
                          title: note.title,
                          description: note.description,
                        });
                        // handleRecover({
                        //   pNoteId: note.id,
                        //   pNoteTitle: note.title,
                        //   pNoteDescription: note.description,
                        // });
                      }}
                    >
                      <RiDeviceRecoverLine className="text-2xl" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {alert && <Alert alertClose={handleAlertClose} />}
    </>
  );
}

export default TrashPage;

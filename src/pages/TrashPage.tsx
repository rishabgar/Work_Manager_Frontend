import { useDispatch, useSelector } from "react-redux";
import { deleteTrashNote, addTrashNote } from "../redux/trashSlice";
import { addNote } from "../redux/noteSlice";
import { MdDeleteForever } from "react-icons/md";
import { RiDeviceRecoverLine } from "react-icons/ri";
import { Alert } from "../components";
import { useEffect, useState } from "react";
import { addAuth } from "../redux/authSlice";
import useLocalStorage from "../customHooks/getLocalStorageData";
import usePostApi, { useGetApi } from "../customHooks/callApi";
const URL = import.meta.env.VITE_URL;

interface ResponseState {
  message: string;
  success: boolean;
}

function TrashPage() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const notes = useSelector((state: any) => state.trashedNotes.trashedNotes);
  const [alert, setAlert] = useState(false);
  const [note, setNote] = useState({
    id: "",
  });
  const auth = useSelector((state: any) => state?.authValidator.auth);

  const handleAlertClose = () => {
    const note_id = note.id;
    dispatch(deleteTrashNote(note_id));
    usePostApi(`${URL}/notes/delete-note`, { note_id: note_id }, setResponse);
    setAlert(false);
  };

  const [response, setResponse] = useState<ResponseState>({
    success: false,
    message: "",
  });

  const handleRecoveryNote = ({ note_id, title, description }: any) => {
    usePostApi(
      `${URL}/notes/update-note`,
      { note_id: note_id, is_trashed: 0 },
      setResponse,
      auth
    );
    dispatch(deleteTrashNote(note_id));
    dispatch(
      addNote({
        type: "object",
        note_id: note_id,
        title: title,
        description: description,
      })
    );
  };

  useEffect(() => {
    const authKey = useLocalStorage("authData");
    dispatch(addAuth({ authKey: authKey }));
    useGetApi(`${URL}/notes/get-trashed-notes`, setResponse, authKey)
      .then((data: any) => {
        setIsLoading(false);
        dispatch(addTrashNote({ type: "array", notes: data?.data }));
      })
      .catch((data: any) => {
        console.log(data);
      });
  }, []);

  return (
    <>
      <div className="overflow-auto">
        <div className="my-7 mx-10 flex flex-wrap ">
          {isLoading ? (
            <div className="h-32 w-64 bg-gray-100 animate-pulse"></div>
          ) : (
            notes.map((note: any) => {
              return (
                <div className="group" key={note.note_id}>
                  <div className="min-h-32 max-h-60 w-64 shadow-[2px_2px_2px_3px_rgba(0,0,0,0.2)] cursor-pointer overflow-hidden mr-4 p-2">
                    <p className="mb-2 font-bold">{note.title}</p>
                    <p>{note.description}</p>
                  </div>
                  <div className="hidden group-hover:block shadow-[2px_2px_2px_3px_rgba(0,0,0,0.2)] w-64 h-10">
                    <div className="flex h-full w-full items-center justify-end">
                      <div
                        className="cursor-pointer px-1"
                        onClick={() => {
                          setAlert(true);
                          setResponse({
                            success: true,
                            message:
                              "Are You Sure You want to delete,Please Close For Confirmation",
                          });
                          setNote({
                            id: note.note_id,
                          });
                        }}
                      >
                        <MdDeleteForever className="text-2xl" />
                      </div>
                      <div
                        className="cursor-pointer px-1"
                        onClick={() => {
                          handleRecoveryNote({
                            note_id: note.note_id,
                            title: note.title,
                            description: note.description,
                          });
                        }}
                      >
                        <RiDeviceRecoverLine className="text-2xl" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      {alert && (
        <Alert
          alertClose={handleAlertClose}
          message={response.message}
          action={response.success}
        />
      )}
    </>
  );
}

export default TrashPage;

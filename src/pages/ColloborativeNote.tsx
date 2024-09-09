import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import ShowTaskModal from "../modal/ShowTaskModal";
import { useDispatch, useSelector } from "react-redux";
import { cAddNote, cUpdateNote } from "../redux/colloborativeSlice";
import { addAuth } from "../redux/authSlice";
import useLocalStorage from "../customHooks/getLocalStorageData";
import usePostApi, { useGetApi } from "../customHooks/callApi";

interface ResponseState {
  message: string;
  error?: string;
  success: boolean;
  status?: number;
  token?: string;
  data?: any;
}

function colloborativeNotePage() {
  const [socket, setSocket] = useState<any>(null);
  const dispatch = useDispatch();
  const notes = useSelector((state: any) => state?.colloborativeNotes?.notes);
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState({
    title: "",
    description: "",
  });
  const [noteId, setNoteId] = useState<any>("");
  const [response, setResponse] = useState<ResponseState>({
    success: false,
    message: "",
    status: 0,
    error: "",
    token: "",
    data: "",
  });

  const handleOpen = (tit: string, des: string) => {
    setNote({
      title: tit,
      description: des,
    });

    setOpen(true);
  };

  const handleModalClose = () => {
    usePostApi(
      // "https://work-manager-backend.vercel.app/notes/update-colloborative-note",
      "https://work-manager-backend.vercel.app/notes/update-colloborative-note",
      { note_id: noteId, ...note },
      setResponse
      // authKey
    );
    setOpen(false);
  };

  const handleNoteChange = () => {
    if (socket) {
      socket.emit("changedNote", { noteId, ...note });
    }
  };

  useEffect(() => {
    // console.log("response", response);

    const authKey = useLocalStorage("authData");
    dispatch(addAuth({ authKey: authKey }));
    useGetApi(
      "https://work-manager-backend.vercel.app/notes/get-user-colloborative-note",
      // "http://localhost:3000/notes/get-user-colloborative-note",
      setResponse,
      authKey
    )
      .then((data: any) => {
        // console.log(data);

        data.success &&
          dispatch(cAddNote({ type: "array", notes: data?.data }));
      })
      .catch((data: any) => {
        console.log(data);
      });
  }, []);

  useEffect(() => {
    const newSocket = io("https://work-manager-backend.vercel.app/");
    // const newSocket = io("http://localhost:3000");
    setSocket(newSocket);

    newSocket.on("sharedNoteEmit", (data: any) => {
      dispatch(
        cUpdateNote({
          note_id: data.noteId,
          newTitle: data.title,
          newDescription: data.description,
        })
      );
    });

    return () => {
      newSocket.disconnect();
    };
  }, [dispatch]);

  return (
    <div className="overflow-auto">
      <div className="w-full flex justify-center items-start"></div>
      <div className="my-7 mx-10 flex flex-wrap ">
        {notes &&
          notes?.map((note: any) => {
            return (
              <div className="group" key={note.note_id}>
                <div
                  className="min-h-32 max-h-60 w-64 shadow-[2px_2px_2px_3px_rgba(0,0,0,0.2)] cursor-pointer overflow-hidden mr-4 p-2"
                  onClick={() => {
                    handleOpen(note.title, note.description);
                    setNoteId(note.note_id);
                  }}
                >
                  <p className="mb-2 font-bold">{note.title}</p>
                  <p>{note.description}</p>
                </div>
              </div>
            );
          })}
      </div>
      <ShowTaskModal
        open={open}
        handleClose={handleModalClose}
        setNote={setNote}
        note={note}
        OnChange={handleNoteChange}
      />
    </div>
  );
}

export default colloborativeNotePage;

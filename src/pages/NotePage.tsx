import { useEffect, useState } from "react";
import { Input, Alert } from "../components";
import NoteModal from "../modal/NoteMoodal";
import ShowTaskModal from "../modal/ShowTaskModal";
import { useDispatch, useSelector } from "react-redux";
import { addNote, updateNote, deleteNote } from "../redux/noteSlice";
import { addTrashNote } from "../redux/trashSlice";
import { MdDeleteForever } from "react-icons/md";
import { FcCollaboration } from "react-icons/fc";
import { addAuth } from "../redux/authSlice";
import useLocalStorage from "../customHooks/getLocalStorageData";
import { useGetApi } from "../customHooks/callApi";
import usePostApi from "../customHooks/callApi";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import FormDialog from "../modal/EmailModal";
import emailjs from "@emailjs/browser";
import { cAddNote } from "../redux/colloborativeSlice";
const URL = import.meta.env.VITE_URL;

interface Note {
  note_id: number;
  title: string;
  description: string;
}

interface NotesState {
  notes: Note[];
}

interface RootState {
  notes: NotesState;
}
interface ResponseState {
  message: string;
  error?: string;
  success: boolean;
  status?: number;
  token?: string;
  data?: any;
}

function NotePage() {
  const notes = useSelector((state: RootState) => state?.notes.notes);
  const authKey = useSelector((state: any) => state?.authValidator?.auth);
  const [collaborateEmail, setCollaborateEmail] = useState("");
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [inputClicked, setInputClicked] = useState(false);
  const [noteId, setNoteId] = useState<any>("");
  const [alert, setAlert] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const uniqueId = uuidv4();
  const [response, setResponse] = useState<ResponseState>({
    success: false,
    message: "",
    status: 0,
    error: "",
    token: "",
    data: "",
  });
  const [note, setNote] = useState({
    title: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  function handleNoteSave() {
    const authKey = useLocalStorage("authData");
    usePostApi(
      `${URL}/notes/add-note`,
      { note_id: uniqueId, trashed: 0, ...note },
      setResponse,
      authKey
    );
    setInputClicked(false);
    dispatch(addNote({ type: "object", note_id: uniqueId, ...note }));
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
        note_id: noteId,
        newTitle: note.title,
        newDescription: note.description,
      })
    );
    setOpen(false);
  };

  const handleDeleteNote = ({ pNoteId, pTitle, pDescription }: any) => {
    usePostApi(
      `${URL}/notes/update-note`,
      { note_id: pNoteId, is_trashed: 1 },
      setResponse,
      authKey
    )
      .then((data: any) => {
        if (data.success) {
          dispatch(deleteNote(pNoteId));

          dispatch(
            addTrashNote({
              notes: {
                note_id: pNoteId,
                title: pTitle,
                description: pDescription,
              },
              type: "object",
            })
          );
        }
      })
      .catch((data) => {
        console.log(data);
      });
  };
  const templateParams = {
    message: "Your friend send you note to collaborate",
    link: `${URL}`,
    to_email: collaborateEmail,
    reply_to: collaborateEmail,
    cc_email: collaborateEmail,
    bcc_email: collaborateEmail,
  };

  const emailSend = () => {
    usePostApi(
      `${URL}/notes/add-user-colloborative-note`,
      { note_id: noteId, ...note, email_id: collaborateEmail },
      setResponse,
      authKey
    )
      .then((data: any) => {
        if (data.success) {
          // console.log("emailSend", data);
          dispatch(deleteNote(data?.data?.note_id));
          dispatch(cAddNote({ type: "object", notes: data?.data }));
        }
      })
      .catch((data) => {
        console.log(data);
      });

    const serviceId = import.meta.env.VITE_SERVICE_ID;
    const templateId = import.meta.env.VITE_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_PUBLIC_API_KEY;

    emailjs
      .send(serviceId, templateId, templateParams, {
        publicKey: publicKey,
      })
      .then(
        () => {
          setAlert(true);
          setResponse({
            success: true,
            message: "Email Send Successfully",
          });
        },
        (err: any) => {
          setAlert(true);
          console.log("FAILED...", err);
          setResponse({
            success: false,
            message: "There is an error while sending email",
          });
        }
      );
  };

  useEffect(() => {
    const query: any = queryParams.get("token");
    query !== null && localStorage.setItem("authData", query);
    const authKey = useLocalStorage("authData");
    dispatch(addAuth({ authKey: authKey }));
    useGetApi(`${URL}/notes/get-user-notes`, setResponse, authKey)
      .then((data: any) => {
        setIsLoading(false);
        dispatch(addNote({ type: "array", notes: data?.data }));
      })
      .catch((data: any) => {
        console.log(data);
      });
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
        {isLoading ? (
          <div className="h-32 w-64 bg-gray-100 animate-pulse"></div>
        ) : (
          notes.map((note) => {
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
                <div className=" hidden group-hover:block shadow-[2px_2px_2px_3px_rgba(0,0,0,0.2)] w-64 h-10">
                  <div className="flex items-center h-full justify-end cursor-pointer">
                    <MdDeleteForever
                      className="text-2xl"
                      onClick={() => {
                        handleDeleteNote({
                          pNoteId: note.note_id,
                          pTitle: note.title,
                          pDescription: note.description,
                        });
                      }}
                    />
                    <FcCollaboration
                      className="text-2xl"
                      onClick={() => {
                        setEmailModalOpen(true), setNoteId(note.note_id);
                        setNote({
                          title: note.title,
                          description: note.description,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      <ShowTaskModal
        open={open}
        handleClose={handleClose}
        setNote={setNote}
        note={note}
      />
      <FormDialog
        handleCollaboration={() => {
          emailSend();
          setEmailModalOpen(false);
        }}
        handleClose={() => setEmailModalOpen(false)}
        open={emailModalOpen}
        setCollaborateEmail={setCollaborateEmail}
      />
      {alert && (
        <Alert
          alertClose={() => setAlert(false)}
          message={response.message}
          action={response.success}
        />
      )}
    </div>
  );
}

export default NotePage;

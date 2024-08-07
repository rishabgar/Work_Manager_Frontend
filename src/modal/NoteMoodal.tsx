import { Input } from "../components";

function NoteModal({ handleNote, handleSave }: any) {
  return (
    <div className="mt-9 shadow-[2px_2px_2px_3px_rgba(0,0,0,0.2)]">
      <div className="h-12 w-[35rem] px-2">
        <Input
          type="text"
          placeholder="Title"
          OnChange={(e) => {
            return handleNote((prevNote: any) => ({
              ...prevNote,
              title: e.target.value,
            }));
          }}
        />
      </div>
      <div className="h-96 shadow-[2px_2px_2px_3px_rgba(0,0,0,0.2)] px-2">
        <Input
          type="textarea"
          placeholder="Take a note..."
          OnChange={(e) => {
            return handleNote((prevNote: any) => ({
              ...prevNote,
              description: e.target.value,
            }));
          }}
        />
      </div>
      <div className="shadow-[2px_2px_2px_3px_rgba(0,0,0,0.2)] h-12 flex items-center ">
        <div
          className="w-14 h-full flex items-center justify-center cursor-pointer"
          onClick={handleSave}
        >
          Save
        </div>
      </div>
    </div>
  );
}

export default NoteModal;

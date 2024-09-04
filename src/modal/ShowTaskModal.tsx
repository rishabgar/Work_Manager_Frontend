// import Modal from "@mui/material/Modal";

// export default function ShowTaskModal({
//   open,
//   handleClose,
//   setNote,
//   note,
// }: any) {
//   return (
//     <div>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <div className="absolute top-1/3 left-1/2 w-96 border-2 border-solid border-black bg-white min-h-32 max-h-96 ">
//           <div
//             className="border-2 border-black black-solid h-12 overflow-hidden p-1"
//             contentEditable="true"
//             onInput={(e: any) =>
//               setNote((prevNote: any) => ({
//                 ...prevNote,
//                 title: e.target.innerText,
//               }))
//             }
//             suppressContentEditableWarning={true}
//           >
//             {" "}
//             {note.title}
//           </div>

//           <div
//             className="border-2 border-black black-solid min-h-32 max-h-72 overflow-y-auto p-1"
//             contentEditable="true"
//             onInput={(e: any) =>
//               setNote((prevNote: any) => ({
//                 ...prevNote,
//                 description: e.target.innerText,
//               }))
//             }
//             suppressContentEditableWarning={true}
//           >
//             {" "}
//             {note.description}
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// }

import Modal from "@mui/material/Modal";

export default function ShowTaskModal({
  open,
  handleClose,
  setNote,
  note,
  OnChange,
}: any) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute top-1/3 left-1/2 w-96 border-2 border-solid border-black bg-white min-h-32 max-h-96 ">
          <div
            className="border-2 border-black black-solid h-12 overflow-hidden p-1"
            contentEditable="true"
            onInput={(e: any) => {
              setNote((prevNote: any) => ({
                ...prevNote,
                title: e.target.innerText,
              }));

              OnChange && OnChange();
            }}
            suppressContentEditableWarning={true}
          >
            {" "}
            {note.title}
          </div>

          <div
            className="border-2 border-black black-solid min-h-32 max-h-72 overflow-y-auto p-1"
            contentEditable="true"
            onInput={(e: any) => {
              setNote((prevNote: any) => ({
                ...prevNote,
                description: e.target.innerText,
              }));

              OnChange && OnChange();
            }}
            suppressContentEditableWarning={true}
          >
            {" "}
            {note.description}
          </div>
        </div>
      </Modal>
    </div>
  );
}

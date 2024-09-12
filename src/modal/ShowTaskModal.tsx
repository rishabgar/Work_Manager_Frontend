import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function ShowTaskModal({
  open,
  handleClose,
  setNote,
  note,
  OnChange,
}: any) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { width: 400 },
          bgcolor: "background.paper",
        }}
        noValidate
        autoComplete="off"
      >
        <div className="flex flex-col">
          <TextField
            id="outlined-multiline-flexible"
            multiline
            maxRows={4}
            minRows={2}
            value={note.title}
            onChange={(e: any) => {
              setNote((prevNote: any) => ({
                ...prevNote,
                title: e.target.value,
              }));
              OnChange && OnChange();
            }}
            sx={{
              "& .MuiInputBase-input": { fontWeight: 700 }, // Target the input element directly
            }}
          />
          <TextField
            id="outlined-multiline-flexible"
            multiline
            maxRows={10}
            minRows={7}
            value={note.description}
            onChange={(e: any) => {
              setNote((prevNote: any) => ({
                ...prevNote,
                description: e.target.value,
              }));
              OnChange && OnChange();
            }}
          />
        </div>
      </Box>
    </Modal>
  );
}

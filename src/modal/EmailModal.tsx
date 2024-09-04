import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function FormDialog({
  handleClose,
  open,
  handleCollaboration,
  setCollaborateEmail,
}: any) {
  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Collaborate</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To collaborate note, please enter user registered email address.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            inputProps={{ autoComplete: "on" }}
            onChange={(e) => setCollaborateEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCollaboration}>Share</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

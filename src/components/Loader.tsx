import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function Loader({ open, handleClose }) {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      onClick={() => handleClose(false)}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default Loader;

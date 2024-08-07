import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import AlertTitle from "@mui/material/AlertTitle";

export default function ActionAlerts({ alertClose, action, message }) {
  return (
    <Stack className="fixed top-0 w-full h-16">
      <Alert severity={action ? "success" : "error"} onClose={alertClose}>
        <AlertTitle>{action ? "success" : "error"}</AlertTitle>
        {message}
      </Alert>
    </Stack>
  );
}

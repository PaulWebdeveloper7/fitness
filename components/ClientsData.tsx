"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useRouter } from "next/navigation";

const ClientsData = ({ Headingtext, icon, text , buttontext , buttonaction }: any) => {
  const [open, setOpen] = React.useState(false);
  const Router = useRouter()
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="flex flex-col justify-center items-center">
       <h1 className=" text-3xl font-extrabold">{Headingtext}</h1>
      <span className=" size-3">{icon}</span>
      <p className="py-5">{text}</p>
      <button onClick={()=>{buttonaction}} className="bg-black text-white rounded-md p-2">
       {buttontext}
      </button>

      {open && (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle className="font-extrabold text-2xl">
            {"Create a plan"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <input
                type="text"
                className="p-2 w-full bg-slate-200 my-4 "
              />
            </DialogContentText>
            <DialogContentText id="alert-dialog-description">
              <form className="px-6 flex gap-5">
                <label htmlFor="reps1">
                  <input type="checkbox" name="reps1" id="reps1" /> Reps
                </label>
                <label htmlFor="sets2">
                  <input type="checkbox" name="sets2" id="sets2" /> Sets
                </label>
                <label htmlFor="rest3">
                  <input type="checkbox" name="rest3" id="rest3" /> Rest
                </label>
                <label htmlFor="others4">
                  <input type="checkbox" name="others4" id="others4" /> Others
                </label>
              </form>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default ClientsData;

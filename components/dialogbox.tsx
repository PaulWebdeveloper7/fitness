
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';



export interface SimpleDialogProps {
  open: boolean;
  error :any
  handleClose: (value: string) => void;
}

 export   function SimpleDialog(props: SimpleDialogProps) {
  const { error, open , handleClose } = props;


  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle className=' font-bold text-2xl'>Invalid input 
       </DialogTitle>
       <h2 className=' text-red-700 font-bold p-5'>{error}</h2> 
    </Dialog>
  );
}

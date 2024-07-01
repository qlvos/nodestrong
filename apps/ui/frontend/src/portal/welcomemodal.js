import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';

const style = {
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  height: '100%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  opacity: 0.9,
  boxShadow: 24,
  p: 4,
};

export default function WelcomeModal({isConnected, account, userName} ) {
  const [open, setOpen] = useState(true);
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState(null);
  const [user, setUser] = useState(null);
  const handleClose = () => setOpen(false);

  useEffect(() => { setConnected(isConnected); }, [isConnected]);
  useEffect(() => { setAddress(account); }, [account]);
  useEffect(() => { setUser(userName); }, [userName]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        onClick={()=>{setOpen(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ width: { xs: 9 / 10, md: 3 / 4 }}}>
            <Grid alignItems="center" direction="row" justifyContent="center" container>

              <Grid item xs={12} sx={{ width: { xs: 9 / 10, md: 3 / 4 }}} style={{ textAlign: "center" }}>
                <Typography id="modal-modal-title" variant="h2" component="h2"><b>Trading Strategy</b></Typography>
              </Grid>

              <Grid item xs={12} sx={{paddingTop:7, paddingBottom:7}} style={{ textAlign: "center" }}>
                <Typography id="modal-modal-title" variant="h2" component="h2">
                You are { (address == null && user != null) || (address != null && user == null) ? "one step" : "two steps"} away from accessing <b>Nodestrong</b>
                </Typography>
              </Grid>

              <Grid item xs={12} sx={{ width: { xs: 9 / 10, md: 3 / 4 }}} style={{ textAlign: "center" }}>
                <Typography id="modal-modal-title" variant="h2" component="h2"><b>Technology Platform</b></Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
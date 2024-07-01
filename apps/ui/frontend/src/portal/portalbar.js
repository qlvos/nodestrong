import React, { useState, MouseEvent, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import CreateWalletButton from './createwalletbutton.js'
import ConnectTgButton from './connecttgbutton.js'

export default function PortalBar({userConnected, account, walletConnectError, walletConnectSuccess, provider, userName}) {

  const [alignment, setAlignment] = useState(null);
  const [stratName, setStratName] = useState("");
  const [connectedAccount, setConnectedAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(null);

  const handleChange = (
    event,
    newAlignment,
  ) => {
    setAlignment(newAlignment);
  };

  useEffect(() => { setIsConnected(userConnected); }, [userConnected])

  useEffect(() => {
    setConnectedAccount(account);
  }, [account])
  return (
    <Box sx={{ borderBottom: '1px solid #eee', flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Grid container padding={1} spacing={0} direction="row" alignItems="center" justifyContent="center">
          <Grid item xs={6} md={3}>
          { isConnected && <CreateWalletButton fontSize = {12} height = {31} width = {180} connectedAccount={connectedAccount} handleError={walletConnectError} handleSuccess={walletConnectSuccess} provider={provider}/>}
          </Grid>
          <Grid alignItems="center" justifyContent="center" item xs={0} md={6}>
            <Typography variant="h4" sx={{textAlign:'center', display: { xs: 'none', md: 'block'}}} component="div"><b>Nodestrong</b> - Build an edge, trade with your friends</Typography>
          </Grid>
          <Grid alignItems="right" justifyContent="right" sx={{textAlign:'right'}} item xs={6} md={3}>
          { isConnected && <ConnectTgButton fontSize = {12} height = {31} width = {180} userConnected={userConnected} walletAccount={account} tgUserName={userName}/> }
          </Grid>
        </Grid>
       </AppBar>
    </Box>
  );
}
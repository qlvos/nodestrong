
import React from 'react';
import { useEffect, useState, useRef, useMemo, createContext, useContext } from 'react';
import { CoinbaseWalletSDK } from '@coinbase/wallet-sdk'
import PortalBar from './portalbar.js'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Typography } from '@mui/material';
import CreateWalletButton from './createwalletbutton.js'
import WelcomeModal from './welcomemodal.js'
import Communities from './communities.js'
import SoloTrader from './solotrader.js'
import CreateCommunity from './createcommunity.js'
import ConnectTgButton from './connecttgbutton.js'
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const MODE_COMMUNITY = "community";
const MODE_SOLO = "solo";
const MODE_CREATE = "create";

const Portal = ({ tgUser, tgUserName }) => {

  let [account, setAccount] = useState(null);
  let [strategies, setStrategies] = useState([]);
  let [mode, setMode] = useState(MODE_COMMUNITY);
  let tgUserId = useRef(null);
  let userName = useRef(null);
  let [userConnected, setUserConnected] = useState(null);

  const fetchWalletData = (address) => {
    let url = window.location.href.split(/[?#]/)[0];
    let callUrl = url+"api/alphabot/wallet?addr=" + address;

    if(tgUserId.current) {
      callUrl += "&userid=" + tgUserId.current;
    }

    if(userName.current) {
      callUrl += "&username=" + userName.current;
    }
     
    fetch(callUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      res.json().then((msg) => {
        if (msg.status == "ok") {
          if (!msg.userconnected) {
            setUserConnected(false);
          } else {
            setUserConnected(true);
            tgUserId.current = msg.userid;
            userName.current = msg.username;
            if(msg.strategies != undefined) {
              setStrategies(current => { return [...msg.strategies]});
            }
          }
        }
      });
    });
  };

  useEffect(() => { tgUserId.current = tgUser; }, [tgUser]);
  useEffect(() => { userName.current = tgUserName; }, [tgUserName]);

  const walletConnected = function (address) {
    fetchWalletData(address)
  }

  const error = function (msg) {
  }

  const sdk = new CoinbaseWalletSDK({
    appName: 'Nodestrong',
    appLogoUrl: 'https://i.ibb.co/wwcXdzZ/logo.png',
    appChainIds: [8452],
  });

  const provider = sdk.makeWeb3Provider();

  provider.on('connect', (info) => {
    if (provider.accounts && provider.accounts.length > 0) {
      setAccount(provider.accounts[0]);
    }
  });

  provider.on('disconnect', (error) => {
    setAccount(null);
    userName.current = null;
    setUserConnected(false);
  });

  useEffect(() => {
    if (provider.accounts && provider.accounts.length > 0) {
      setAccount(provider.accounts[0]);
      fetchWalletData(provider.accounts[0])
    }
  }, []);

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const headerText = (account == null && userName.current == null) ? "Create wallet to gain access" :
    (account == null && userName.current != null) ? "One step left - Create a wallet" :
      (account != null && userName.current == null) ? "Almost there - Connect Telegram" :
      <Grid container>
        <Grid style={{cursor:'pointer'}} onClick={() => {setMode(MODE_COMMUNITY)}} sx={{ color: (mode == MODE_COMMUNITY) ? "white" : "grey"}} item xs={6}>Be part of a community</Grid>
        <Grid style={{cursor:'pointer'}} onClick={() => {setMode(MODE_SOLO)}} sx={{ color: (mode == MODE_SOLO) ? "white" : "grey"}} item xs={6}>Build your own strategy</Grid>
      </Grid>
        

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {!userConnected && <WelcomeModal isConnected={userConnected} account={account} userName={userName.current} /> }
      <PortalBar userName={userName.current} userConnected={userConnected} account={account} walletConnectError={error} walletConnectSuccess={walletConnected} provider={provider} />
      <center>
        <Box style={{ marginTop: 30, display: 'flex', justifyContent: 'center', alignItems: 'center' }} sx={{ width: { xs: 9 / 10, md: 3 / 4 }, border: '1px dashed grey' }}>
          <Stack spacing={userConnected ? 0 : 5}>
            <Grid alignItems="center" direction="row" justifyContent="center" container>
              <Grid item xs={2} style={{ textAlign: "center" }}>
              </Grid>
              <Grid item xs={8} style={{ textAlign: "center" }}>
                <Typography variant="h4" component="h1"><span style={{ fontWeight: 'bold' }}>{headerText}</span></Typography>
                <br />

                {userConnected &&
                  <Grid item xs={12} style={{ textAlign: "center" }}>

                  </Grid>
                }

              </Grid>
              <Grid item xs={2} style={{ textAlign: "center" }}>
                <Chip style={{cursor: "pointer"}} onClick={(evt) => {window.open('https://vimeo.com/manage/videos/973392512', '_blank', 'noopener')}}label="Tutorial" variant="outlined" />
              </Grid>
              
              <Grid item xs={12} sm={6} sx={{paddingBottom: {xs:3, sm:0 }}} style={{ border: '1px grey', textAlign: "center" }}>
                {(account == null && !userConnected) ?
                  <Typography variant="h3" component="h2">1</Typography> : (!userConnected) ?
                  <Typography variant="h3" component="h2">&nbsp;</Typography> : ""
                }
                {!userConnected && <CreateWalletButton connectedAccount={account} handleError={error} handleSuccess={walletConnected} provider={provider} />}
              </Grid>
              <Grid item xs={12} sm={6} style={{ textAlign: "center" }}>
                {(userName.current == null && !userConnected) ?
                  <Typography sx={{ color: account == null ? 'grey' : 'white' }} variant="h3" component="h2">2</Typography> : (!userConnected) ?
                  <Typography variant="h3" component="h2">&nbsp;</Typography> : ""
                }
                {!userConnected && <ConnectTgButton userConnected={userConnected} walletAccount={account} connectedAccount={tgUserId.current} tgUserName={userName.current} />}
              </Grid>
            </Grid>
            { (mode == MODE_COMMUNITY) && <Communities userConnected={userConnected} /> }
            { (mode == MODE_SOLO) && <SoloTrader userConnected={userConnected} strategies={strategies}/> }
            { (mode == MODE_CREATE) && <CreateCommunity userConnected={userConnected} strategies={strategies}/> }
          </Stack>
        </Box>
      </center>
      <br/><br/>

    </ThemeProvider>

  );
};

export default Portal;

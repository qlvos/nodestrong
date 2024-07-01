import * as React from 'react';
import { useEffect, useState, useRef, useMemo, createContext, useContext } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import backtestresults from './../images/backtestresults.png';
import strategy from './../images/strategy.png'
import telegramsignal from './../images/telegramsignal.png'
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';

const SoloTrader = ({ userConnected, strategies }) => {

  const miniImageGlow = { boxShadow: '0px 0px 5px #39FF14' };
  const styleHidden = { backgroundColor: '#000', color: '#fff', opacity: .2 };
  const [connected, setConnected] = useState(null);
  const [strats, setStrats] = useState(null);
  const [communitiesStyle, setCommunitiesStyle] = useState(styleHidden);

  const [strategyOneId, setStrategyOneId] = useState(null);
  const [strategyTwoId, setStrategyTwoId] = useState(null);
  const [strategyThreeId, setStrategyThreeId] = useState(null);

  useEffect(() => {
    setStrats(strategies);
    let s1 = getStrategy(strategies, 1);
    if(s1 != null ) {
      setStrategyOneId("u"+s1.id);
    }
    let s2 = getStrategy(strategies, 2);
    if(s2 != null ) {
      setStrategyTwoId("u"+s2.id);
    }
    let s3 = getStrategy(strategies, 3);
    if(s3 != null ) {
      setStrategyThreeId("u"+s3.id);
    }
  }, [strategies]);


  useEffect(() => {
    setConnected(userConnected);
    if (userConnected) {
      setCommunitiesStyle({});
    } else {
      setCommunitiesStyle(styleHidden);
    }
  }, [userConnected]);

  const getStrategy = (strategies, num) => {
    if(strategies != null) {
      for(const s of strategies) {
        if(s.num == num) {
          return s;
        }
      }
    }
  }

  const addStrategy = (num, chain) => {
    return new Promise((resolve, reject) => {
      let url = window.location.href.split(/[?#]/)[0];
      let callUrl = url+"api/alphabot/addstrat";
      // check that this user should actually have access to the app, regardless whether he approved it or not. 
      let body = {num: num, type: "u", chain: chain};
      fetch(callUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }).then((res) => {
        res.json().then((json) => {
          if(json && json.res == "ok") {
            if(num == 1) {
              setStrategyOneId(json.strategyId);
            } else if(num == 2) {
              setStrategyTwoId(json.strategyId);
            } else if(num == 3) {
              setStrategyThreeId(json.strategyId);
            }
          }         
        });
      });
    });
  
  }

  return (
    <Box display="flex" flexDirection='column' alignItems="center" justifyContent="center" sx={{ width: 1 }} style={communitiesStyle}>
      <Grid xs={12}>
        <Paper sx={{ p: 1, textAlign: 'left' }}>
          <Card>
            <Grid container xs={12} spacing={1} sx={{ mt: 1 }}>
              <Grid item xs={12} md={4}>
                <Card sx={{ height: '100%' }} variant="outlined">
                  <CardContent sx={{ textAlign: 'left' }}>
                    <Typography gutterBottom variant="h5" component="div">Design</Typography>
                    <br />
                    <CardMedia sx={{ ...miniImageGlow }}
                      component="img"
                      alt="strategy builder"
                      image={strategy} />

                    <br />
                    <Typography variant="bodyText">
                      Build an on-chain trading strategy with a no-code editor, having access to over 30 unique on-chain indicators. Put your on-chain knowledge to the test!
                    </Typography>

                    <Box display={userConnected ? "flex" : "none"} alignItems="right" justifyContent="right">
                      <Link target="_blank" href="https://www.nodestrong.com/docs">learn more</Link>
                    </Box>

                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ height: '100%' }} variant="outlined">
                  <CardContent sx={{ textAlign: 'left' }}>
                    <Typography gutterBottom variant="h5" component="div">Backtest</Typography>
                    <br />
                    <CardMedia sx={{ ...miniImageGlow }}
                      component="img"
                      alt="backtest results"
                      image={backtestresults} />

                    <br />
                    <Typography variant="bodyText">
                      Run the trading strategy on historical data and see how well it would have performed.
                    </Typography>

                    <Box display={userConnected ? "flex" : "none"} alignItems="right" justifyContent="right">
                      <Link target="_blank" href="https://www.nodestrong.com/docs">learn more</Link>
                    </Box>

                  </CardContent>

                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card sx={{ height: '100%' }} variant="outlined">
                  <CardContent sx={{ textAlign: 'left' }}>
                    <Typography gutterBottom variant="h5" component="div">Get signals</Typography>
                    <br />
                    <CardMedia sx={{ ...miniImageGlow }}
                      component="img"
                      alt="telegram signal"
                      image={telegramsignal} />
                    <br />
                    <Typography variant="bodyText">
                      Receive real time Token signals from the trading strategy in your favourite messaging app.
                    </Typography>

                    <Box display={userConnected ? "flex" : "none"} alignItems="right" justifyContent="right">
                      <Link target="_blank" href="https://www.nodestrong.com/docs">learn more</Link>
                    </Box>

                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card sx={{ height: '100%' }} variant="outlined">
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography gutterBottom variant="h5" component="div">Strategy #1</Typography>
                    <br />
                    { strategyOneId == null &&
                    <Grid container alignItems="center" direction="row" justifyContent="center" spacing={2}>
                      <Grid item>
                        <Button onClick={()=>{addStrategy(1, 'eth')}}variant="contained">New ETH strategy</Button> 
                      </Grid>
                      <Grid item>
                        <Button onClick={()=>{addStrategy(1, 'base')}}variant="contained">New Base strategy</Button>
                      </Grid>
                    </Grid>
                      }
                    { strategyOneId != null && <Typography><a target="_blank" href={process.env.REACT_APP_STRATEGY_BUILDER_URL+'?strategy='+strategyOneId}>Open strategy builder</a></Typography> }
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card sx={{ height: '100%' }} variant="outlined">
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography gutterBottom variant="h5" component="div">Strategy #2</Typography>
                    <br />
                    { strategyTwoId == null && 
                      <Grid container alignItems="center" direction="row" justifyContent="center" spacing={2}>
                        <Grid item>
                          <Button onClick={()=>{addStrategy(2, 'eth')}}variant="contained">New ETH strategy</Button> 
                        </Grid>
                        <Grid item>
                          <Button onClick={()=>{addStrategy(2, 'base')}}variant="contained">New Base strategy</Button>
                        </Grid>
                    </Grid>
                    }
                    { strategyTwoId != null && <Typography><a target="_blank" href={process.env.REACT_APP_STRATEGY_BUILDER_URL+'?strategy='+strategyTwoId}>Open strategy builder</a></Typography> }
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card sx={{ height: '100%' }} variant="outlined">
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography gutterBottom variant="h5" component="div">Strategy #3</Typography>
                    <br />
                    { strategyThreeId == null &&
                      <Grid container alignItems="center" direction="row" justifyContent="center" spacing={2}>
                        <Grid item>
                          <Button onClick={()=>{addStrategy(3, 'eth')}}variant="contained">New ETH strategy</Button> 
                        </Grid>
                        <Grid item>
                          <Button onClick={()=>{addStrategy(3, 'base')}}variant="contained">New Base strategy</Button>
                        </Grid>
                      </Grid>
                      }
                    { strategyThreeId != null && <Typography><a target="_blank" href={process.env.REACT_APP_STRATEGY_BUILDER_URL+'?strategy='+strategyThreeId}>Open strategy builder</a></Typography> }
                  </CardContent>
                </Card>
              </Grid>

            </Grid>
          </Card>
        </Paper>
      </Grid>
    </Box>

  );
};

export default SoloTrader;

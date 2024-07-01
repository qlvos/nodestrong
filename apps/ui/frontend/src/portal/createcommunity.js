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
import TextField from '@mui/material/TextField';

const CreateCommunity = ({ userConnected, strategies }) => {

  const miniImageGlow = { boxShadow: '0px 0px 5px #39FF14' };
  const styleHidden = { backgroundColor: '#000', color: '#fff', opacity: .2 };
  const [connected, setConnected] = useState(null);
  const [strats, setStrats] = useState(null);
  const [communitiesStyle, setCommunitiesStyle] = useState(styleHidden);

  const [strategyOneId, setStrategyOneId] = useState(null);
  const [strategyTwoId, setStrategyTwoId] = useState(null);
  const [strategyThreeId, setStrategyThreeId] = useState(null);

  const [communityData, setCommunityData] = useState(new Map());

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
      let callUrl = url+"api/alphabot/add";
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

  const onMemberWalletChange = (evt, communityId, memberIndex) => {
    let value = evt.target.value;
    let data = communityData.get(communityId);
    if(data.members.length <= memberIndex) {
      data.members.push(value);
    } else {
      data.members[memberIndex] = value;
    }
    console.log(data)
  }

  const updateMap = (k,v) => {
    setCommunityData(new Map(communityData.set(k,v)));
  }

  const addMember = (id) => {
    let data = communityData.get(id);
    data.members.push("");
    updateMap(id, data);
  }

  const member = (id, memberIndex) => {
    return (
      <>
        <Grid item xs={8}><TextField id={"community-member"+id} onChange={ (evt) => onMemberWalletChange(evt, id, memberIndex)} label={"member #" + (memberIndex+1) + " wallet" } size="small" variant="outlined" /></Grid>
        <Grid item xs={4}>
          { (memberIndex == communityData.get(id).members.length-1) && <Button size="small" onClick={()=>{addMember(id)}} variant="contained">Add new</Button> }
        </Grid>
      </>
    )
  }

  const community = (id) => {
    console.log("ffs")
    console.log(id)
    let data = communityData.get(id);
    if(!data) {
      data = {};
      data.members = [];
      data.members.push("first");
      communityData.set(id, data);
    }
    return (
      <Grid container>
        <Grid item xs={8}><TextField id="community-name" label="Community Name" size="small" variant="outlined" /></Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={8}><TextField id="community-tgid" label="Telegram group id" size="small" variant="outlined" /></Grid>
        <Grid item xs={4}></Grid>
        { communityData.get(id).members.map((item, index) => { return member(id, index) }) }
        <Grid item xs={12}><Button size="small" onClick={()=>{}}variant="contained">Save</Button></Grid>
      </Grid>
    );
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
                    <Typography gutterBottom variant="h5" component="div">Create community</Typography>
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
                    <Typography gutterBottom variant="h5" component="div">Community #1</Typography>
                    <br />
                    {community(1)}
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card sx={{ height: '100%' }} variant="outlined">
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography gutterBottom variant="h5" component="div">Community #2</Typography>
                    <br />
                    {community(2)}
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card sx={{ height: '100%' }} variant="outlined">
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography gutterBottom variant="h5" component="div">Strategy #3</Typography>
                    <br />
                    {community(3)}
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

export default CreateCommunity;

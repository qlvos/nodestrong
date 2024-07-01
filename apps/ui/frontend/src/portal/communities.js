import * as React from 'react';
import { useEffect, useState, useRef, useMemo, createContext, useContext } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import reversalimage from './../images/reversal2.png';
import erc404image from './../images/erc404.png';
import pepeverse from './../images/pepeverse.png';
import base from './../images/base.png';
import copycat from './../images/copycat.webp';
import showgoeson from './../images/showgoeson.png';
import uselection from './../images/us_election.png'
import Link from '@mui/material/Link';

const Communities = ({ userConnected }) => {

  const miniImageGlow = { boxShadow: '0px 0px 5px #39FF14' };
  const styleHidden = { backgroundColor: '#000', color: '#fff', opacity: .2 };
  const [connected, setConnected] = useState(null);
  const [communitiesStyle, setCommunitiesStyle] = useState(styleHidden);

  useEffect(() => {
    setConnected(userConnected);
    if (userConnected) {
      setCommunitiesStyle({})
    } else {
      setCommunitiesStyle(styleHidden)
    }
  }, [userConnected]);

  return (
    <Box display="flex" flexDirection='column' alignItems="center" justifyContent="center" sx={{ width: 1 }} style={communitiesStyle}>
      <Grid xs={12}>
        <Paper sx={{ p: 1, textAlign: 'left' }}>
          <Card>
            <Grid container xs={12} spacing={1} sx={{ mt: 1 }}>
              <Grid item xs={12} md={4}>
                <Card sx={{ height: '100%' }} variant="outlined">
                  <CardContent sx={{ textAlign: 'left' }}>
                    <Typography gutterBottom variant="h5" component="div">Buildathon special</Typography>
                    <br />
                    <CardMedia sx={{ ...miniImageGlow }}
                      component="img"
                      alt="base"
                      image={base} />

                    <br />
                    <Typography variant="bodyText">
                      This community was created with the participation of Nodestrong in the Base Onchain Summer Buildathon <a href='https://onchain-summer.devfolio.co/' target="_blank">competition</a>. Here we run on-chain strategies entirely dedicated to the Base chain.
                      Access restricted to members who have connected a Coinbase Smart Wallet with Nodestrong. 
                    </Typography>

                    <Box display={userConnected ? "flex" : "none"} alignItems="right" justifyContent="right">
                      <Link target="_blank" href="https://t.me/nsbuildathon">t.me/nsbuildathon</Link>
                    </Box>

                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ height: '100%' }} variant="outlined">
                  <CardContent sx={{ textAlign: 'left' }}>
                    <Typography gutterBottom variant="h5" component="div">Copy Cat</Typography>
                    <br />
                    <CardMedia sx={{ ...miniImageGlow }}
                      component="img"
                      alt="trading started"
                      image={copycat} />


                    <br />
                    <Typography variant="bodyText">
                      Why come up with your own alpha when you can copy others? In this community we run various strategies that identifies other successful traders and sends signals when they make moves!
                    </Typography>

                    <Box display={userConnected ? "flex" : "none"} alignItems="right" justifyContent="right">
                      <Link target="_blank" href="https://t.me/nscopycat">t.me/nscopycat</Link>
                    </Box>

                  </CardContent>

                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card sx={{ height: '100%' }} variant="outlined">
                  <CardContent sx={{ textAlign: 'left' }}>
                    <Typography gutterBottom variant="h5" component="div">Pepe verse</Typography>
                    <br />
                    <CardMedia sx={{ ...miniImageGlow }}
                      component="img"
                      alt="trading started"
                      image={pepeverse} />
                    <br />
                    <Typography variant="bodyText">
                      Here we share alpha on Matt Furie crypto projects. Pepe, Andy, Brett, Landwolf... bring them all on!
                    </Typography>

                    <Box display={userConnected ? "flex" : "none"} alignItems="right" justifyContent="right">
                      <Link target="_blank" href="https://t.me/nspepeverse">t.me/nspepeverse</Link>
                    </Box>

                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card sx={{ height: '100%' }} variant="outlined">
                  <CardContent sx={{ textAlign: 'left' }}>
                    <Typography gutterBottom variant="h5" component="div">US Election</Typography>
                    <br />
                    <CardMedia sx={{ ...miniImageGlow }}
                      component="img"
                      alt="US election"
                      image={uselection} />
                    <br />
                    <Typography variant="bodyText">
                      Left or right, who has the best tokens? With the upcoming elections this narrative will surely only grow stronger and stronger.
                      Here we track all the new Trump and Biden tokens!
                    </Typography>

                    <Box display={userConnected ? "flex" : "none"} alignItems="right" justifyContent="right">
                      <Link target="_blank" href="https://t.me/nsuselection">t.me/nsuselection</Link>
                    </Box>

                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card sx={{ height: '100%' }} variant="outlined">
                  <CardContent sx={{ textAlign: 'left' }}>
                    <Typography gutterBottom variant="h5" component="div">Reversals</Typography>
                    <br />
                    <CardMedia sx={{ ...miniImageGlow }}
                      component="img"
                      alt="show goes on"
                      image={showgoeson} />

                    <br />
                    <Typography variant="bodyText">
                      Niche community picking up newly beaten down tokens. Strategies ranges from simple knife-catchers to more sophisticated ones looking for signs of reversal.
                    </Typography>

                    <Box display={userConnected ? "flex" : "none"} alignItems="right" justifyContent="right">
                      <Link target="_blank" href="https://t.me/nsreversals">t.me/nsreversals</Link>
                    </Box>

                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card sx={{ height: '100%' }} variant="outlined">
                  <CardContent sx={{ textAlign: 'left' }}>
                    <Typography gutterBottom variant="h5" component="div">404 Degen</Typography>
                    <br />
                    <CardMedia sx={{ ...miniImageGlow }}
                      component="img"
                      alt="trading started"
                      image={erc404image} />
                    <br />
                    <Typography variant="bodyText">
                      This community was created as Pandora created the Erc404 standard, that combines Erc20 tokens with NFT mechanics. All the new Erc404 launches gets signalled here.
                    </Typography>
                    <Box display={userConnected ? "flex" : "none"} alignItems="right" justifyContent="right">
                      <Link target="_blank" href="https://t.me/nserc404alpha">t.me/nserc404alpha</Link>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card sx={{ height: '100%' }} variant="outlined">
                  <CardContent sx={{ textAlign: 'left' }}>
                    <Typography gutterBottom variant="h5" component="div">Trending</Typography>
                    <br />
                    <CardMedia sx={{ ...miniImageGlow }}
                      component="img"
                      alt="trading started"
                      image={reversalimage} />
                    <br />
                    <Typography variant="bodyText">
                      Follow the latest trends on the most popular live pairs sites and telegram channels. The strategies in this community uses offline data to detect which are the hottest tokens.
                    </Typography>
                    <Box display={userConnected ? "flex" : "none"} alignItems="right" justifyContent="right">
                      <Link target="_blank" href="https://t.me/nstrend">t.me/nstrend</Link>
                    </Box>
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

export default Communities;

import { CoinbaseWalletLogo } from './coinbasewalletlogo';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import LogoutIcon from '@mui/icons-material/Logout';
import { styled } from '@mui/material/styles';
import { tooltipClasses } from '@mui/material/Tooltip';
import Clipboard from 'react-clipboard-animation'
import Box from '@mui/material/Box';
 
const GRADIENT_BORDER_WIDTH = 2;
const buttonStyles = {
  background: 'transparent',
  border: '1px solid transparent',
  boxSizing: 'border-box',
};
 
const contentWrapperStyle = {
  position: 'relative',
};
  
const CreateWalletButton = ({connectedAccount, handleSuccess, handleError, provider, fontSize = 18, height = 56, width = 230 }) => {

  const minButtonHeight = 28;
  const minButtonWidth = 180;
  const buttonHeight = Math.max(minButtonHeight, height);
  const buttonWidth = Math.max(minButtonWidth, width);
  const gradientDiameter = Math.max(buttonHeight, buttonWidth);
  const [account, setAccount] = useState(null);
  const [buttonBorder, setButtonBorder] = useState(disconnectedBorder);
  const [copied, setCopied] = useState(false);

  let disconnectedBorder = 'conic-gradient(from 180deg, #45E1E5 0deg, #0052FF 86.4deg, #B82EA4 165.6deg, #FF9533 255.6deg, #7FD057 320.4deg, #45E1E5 360deg)';
  let connectedBorder = '#0FFF50';

  function Gradient({ children, style, isAnimationDisabled = false }) {
    const [isAnimating, setIsAnimating] = useState(false);
    
    const gradientStyle = useMemo(() => {
      const rotate = isAnimating ? '720deg' : '0deg';
      return {
        transform: `rotate(${rotate})`,
        transition: isAnimating
          ? 'transform 2s cubic-bezier(0.27, 0, 0.24, 0.99)'
          : 'none',
        ...style,
      };
    }, [isAnimating, style]);
   
    const handleMouseEnter = useCallback(() => {
      if (isAnimationDisabled || isAnimating) return;
      setIsAnimating(!connectedAccount);
    }, [isAnimationDisabled, isAnimating, setIsAnimating]);
   
    useEffect(() => {
      if (!isAnimating) return;
      const animationTimeout = setTimeout(() => {
        setIsAnimating(false);
      }, 2000);
      return () => {
        clearTimeout(animationTimeout);
      };
    }, [isAnimating]);
   
    return (
      <div style={contentWrapperStyle} onMouseEnter={handleMouseEnter}>
        <div className="gradient-background" style={gradientStyle} />
        {children}
      </div>
    );
  }


  useEffect(() => {
    setAccount(connectedAccount);
    setButtonBorder((connectedAccount != null) ? connectedBorder : disconnectedBorder);
  }, [connectedAccount]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (copied) setCopied(false)
    }, 1000)

    return () => clearTimeout(timeout)
  }, [copied]);

  const styles = useMemo(
    () => ({
      gradientContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        borderRadius: buttonHeight / 2,
        height: buttonHeight,
        width: buttonWidth,
        boxSizing: 'border-box',
        overflow: 'hidden',
      },
      gradient: {
        background: buttonBorder,
        position: 'absolute',
        top: -buttonHeight - GRADIENT_BORDER_WIDTH,
        left: -GRADIENT_BORDER_WIDTH,
        width: gradientDiameter,
        height: gradientDiameter,
      },
      buttonBody: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxSizing: 'border-box',
        color:'white',
        backgroundColor: '#000000',
        height: buttonHeight - GRADIENT_BORDER_WIDTH * 2,
        width: buttonWidth - GRADIENT_BORDER_WIDTH * 2,
        fontFamily: 'Arial, sans-serif',
        fontWeight: 'bold',
        fontSize: fontSize,
        borderRadius: buttonHeight / 2,
        position: 'relative',
        paddingRight: 10,
      },
    }),
    [buttonHeight, buttonWidth, gradientDiameter, buttonBorder]
  );


  const createWallet = useCallback(async () => {
    try {
      const [address] = await provider.request({
        method: 'eth_requestAccounts',
      });
      handleSuccess(address);
      
    } catch (error) {
      handleError(error);
    }
  }, [handleSuccess, handleError]);

  const formatAddress = (address) => {
    return address.substr(0,5)+"..."+address.substr(address.length-3);
  }
 
  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
  }));

  return (
    <>
    <button style={buttonStyles} onClick={createWallet}>
      <div style={styles.gradientContainer}>
        <Gradient style={styles.gradient}>
          <div style={styles.buttonBody}>
            {account == null ? 
              <><CoinbaseWalletLogo containerStyles={{ paddingRight: 10 }} />Create Wallet</>
            : 
            <Grid alignItems="center" justifyContent="center" container>
              <Grid align="center" item xs={2}>
              <LightTooltip title={copied ? "copied" : "copy"}>
                <Box sx={{pl:'10px'}}>
                  <Clipboard
                    copied={copied}
                    setCopied={setCopied}
                    text='copied'
                    color='white'
                  />
                </Box>                
                </LightTooltip>
              </Grid>
              <LightTooltip title={account}>
                <Grid align="center" item xs={8} onClick={() => {navigator.clipboard.writeText(account)}}>{formatAddress(account)}</Grid>
              </LightTooltip>
              <Grid align="center" item xs={2}>
                <LightTooltip title="Disconnect">
                  <LogoutIcon sx={{paddingBottom:"3px"}} onClick={(e)=>{provider.disconnect(); e.stopPropagation()}}/>
                </LightTooltip>
              </Grid>
            </Grid>
            }

          </div>
        </Gradient>
      </div>
    </button>
    </>
  );
}

export default CreateWalletButton
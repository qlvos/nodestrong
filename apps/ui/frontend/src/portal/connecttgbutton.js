import React, { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import Box from '@mui/material/Box';
import { FaTelegramPlane } from "react-icons/fa";
 
const GRADIENT_BORDER_WIDTH = 2;
const buttonStyles = {
  background: 'transparent',
  border: '1px solid transparent',
  boxSizing: 'border-box',
};
 
const contentWrapperStyle = {
  position: 'relative',
};
  
const ConnectTgButton = ({userConnected, walletAccount, connectedAccount, tgUserName, fontSize = 18, height = 56, width = 230 }) => {

  const minButtonHeight = 28;
  const minButtonWidth = 180;
  const buttonHeight = Math.max(minButtonHeight, height);
  const buttonWidth = Math.max(minButtonWidth, width);
  const gradientDiameter = Math.max(buttonHeight, buttonWidth);
  const [tgAccount, setTgAccount] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [isUserConnected, setIsUserConnected] = useState(null);
  const userName = useRef(null);
  const [buttonBorder, setButtonBorder] = useState(disconnectedBorder);
  const [copied, setCopied] = useState(false);

  let disconnectedBorder = 'conic-gradient(from 180deg, #45E1E5 0deg, #0052FF 86.4deg, #B82EA4 165.6deg, #FF9533 255.6deg, #7FD057 320.4deg, #45E1E5 360deg)';
  let connectedBorder = '#0FFF50';
  let disabledBorder = 'grey';
  let disabledText = 'grey';

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
      setIsAnimating(!connectedAccount && (walletAccount != null));
    }, [isAnimationDisabled, isAnimating, setIsAnimating]);

    useEffect(() => { setIsUserConnected(userConnected);}, [userConnected]);
    useEffect(() => { 
      setWallet(walletAccount);
      setButtonBorder(walletAccount == null ? disabledBorder : (userName.current != null) ? connectedBorder : disconnectedBorder);
    }, [walletAccount]);

    useEffect(() => { 
      userName.current = tgUserName;
       }, [tgUserName]);
   
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
    setTgAccount(connectedAccount);
    setButtonBorder(wallet == null ? disabledBorder : (userName.current != null) ? connectedBorder : disconnectedBorder);
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
        color: walletAccount == null ? disabledText : "white",
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

  return (
    <>
    <button onClick={()=>{if(userName.current == null && walletAccount != null ) { window.open(process.env.REACT_APP_TG_PORTAL_URL, '_blank') }}} style={buttonStyles}>
      <div style={styles.gradientContainer}>
        <Gradient style={styles.gradient}>
          <div style={styles.buttonBody}>
            <Box sx={{paddingRight:'10px'}}><FaTelegramPlane/></Box>
            {(isUserConnected && userName.current != null) ? userName.current : 'Telegram' }
          </div>
        </Gradient>
      </div>
    </button>
    </>
  );
}

export default ConnectTgButton


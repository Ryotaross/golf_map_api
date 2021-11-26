import React from 'react';
import styled from "styled-components";

function Modal() {

  const Overlay = styled.div `
    position:fixed;
    top:0;
    left:0;
    width:390px;
    height:100%;
    background-color:rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const Content = styled.div `
    z-index:2;
    width:340px;
    padding: 1em;
    background:#fff;
  `;

  
  return (
    <Overlay>
      <Content>
        <p>これがモーダルウィンドウです。</p>
        <p><button>close</button></p>
      </Content>
    </Overlay>
  );
}

export default Modal;
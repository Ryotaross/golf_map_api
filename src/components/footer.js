import React from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";

function Footer(props) {

  const Foot = styled.div `
    height:80px;
    width:100%;
    padding:10px;
    background-color:rgba(222,222,222,0.9);
  `

  const List = styled.ul `
    width:90%;
    margin:0 auto;
  `
  
  const Inquiry = styled.li `
    display:block;
    font-size:20px;
    font-weight:bold;
    font-family: "Hiragino Kaku Gothic Pro", "ヒラギノ角ゴ Pro", "Yu Gothic Medium", "游ゴシック Medium", YuGothic, "游ゴシック体", "メイリオ", sans-serif;
    text-decoration: none;
    `

  return(
    <>
      <Foot>
        <List>
          <Inquiry><a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSfkZAJmwyBUD0PvWzhaW-oXuZTqJTAox-rBzBjR8UHCXaZ5pA/viewform?usp=sf_link">お問い合わせ</a></Inquiry>
        </List>
      </Foot>
    </>
  );
}

export default Footer;
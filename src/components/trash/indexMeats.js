import React from 'react';
import styled from "styled-components";
import { useState,useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Show from '../show';

function IndexMeats(props) {
  const meats = props.meats;
  const ArtMeat = styled.span`
    width: 131px;
    height: 50px;
    font-family:  'Roboto', sans-serif;;
    font-size: 36px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #cfb5b5;
  `;

  const Line = styled.div `
    width: 348px;
    height: 1px;
    border: solid 1px #979797;
  `;

  const FlexBox = styled.div `
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    margin:36px auto;
  `

  const Bitmap = styled.div `
    width: 91px;
    height: 85px;
    margin: 12px 6px 12px 10px;
  `

  const ItemName = styled.p`
    width: 208px;
    margin: 0 33px 5px 6px;
    font-family: 'Noto Serif JP', serif;
    font-size: 15px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.44;
    letter-spacing: normal;
    color: #333;
  `

  const ItemMaker = styled.p`
    width: 216px;
    margin: 0 20px 5px 11px;
    font-family: 'Noto Serif JP', serif;
    font-size: 11px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.65;
    letter-spacing: normal;
    color: #040404;
  `;

  const ItemStartDay = styled.p`
    width: 216px;
    margin: 0 20px 5px 11px;
    font-family: 'Noto Serif JP', serif;
    font-size: 11px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.65;
    letter-spacing: normal;
    color: #040404;
  `;

  const Hash = styled.p `
    width: 38px;
    margin: 0 8px;
    font-family: 'Noto Serif JP', serif;
    font-size: 11px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #ff561b;
  `;

  const EndLine = styled.div `
    width: 348px;
    height: 1px;
    border: solid 1px #979797;
  `;

  const IndexMeat = (
    meats.map((meat) => 
    <React.Fragment key={meat.id}>
      <FlexBox onClick={props.toggleDrawer(true,meat.id)}>
        <Bitmap></Bitmap>
        <div>
          <ItemName>
            {meat.name}
          </ItemName>
          <ItemMaker>
            {meat.maker}
          </ItemMaker>
          <ItemStartDay>
            {meat.startDay}
          </ItemStartDay>
          {/*<Hash>
            #大豆
          </Hash>*/}
        </div>
      </FlexBox>
      <EndLine></EndLine>
    </React.Fragment>
    )
  ) 

  const handleClick = () =>{
    console.log(props.meats);
    console.log(props);
  }


  return(
    {IndexMeat}
  );
}

export default IndexMeats;
import React from 'react';
import styled,{ keyframes } from "styled-components";
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import '../style/common.css'

function TopGolf() {

  const Content = styled.div`
    width:90%;
    margin:30px auto;
  `;

  const OsakaGolf = styled.span`
    width: 131px;
    height: 50px;
    font-family: "Hiragino Kaku Gothic Pro", "ヒラギノ角ゴ Pro", "Yu Gothic Medium", "游ゴシック Medium", YuGothic, "游ゴシック体", "メイリオ", sans-serif;
    font-size: 36px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #cfb5b5;
  `;

  const Subtitle = styled.span `
    display:block;
    font-family: "Hiragino Kaku Gothic Pro", "ヒラギノ角ゴ Pro", "Yu Gothic Medium", "游ゴシック Medium", YuGothic, "游ゴシック体", "メイリオ", sans-serif;
    font-size: 15px;
  `;

  return(
    <>
      <Content>
        <OsakaGolf>
          Osaka-Short-Course
        </OsakaGolf>
        <Subtitle>
          ショートコース情報サイトです。<br />
          現在は大阪限定です。
        </Subtitle>
      </Content>
    </>
    
  );
}

export default TopGolf;


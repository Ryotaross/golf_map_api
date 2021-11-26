import React from 'react';
import { useState,useEffect } from 'react';
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import golfIcon from './image/golf_212.gif';

function Show(props) {
  const[golf,setGolf] = useState([{id: "",name: "",address: "",price: "",courseInfo: "",phone: "",hp:"",moreInfo:"",image:"",lat:0,lng:0}]);
  const history = useHistory();
  const[load,setLoad] = useState(true);

  const DetailShow = styled.div `
    width:500px;
    height:550px;
    margin:10px auto;
    font-family: "Hiragino Kaku Gothic Pro", "ヒラギノ角ゴ Pro", "Yu Gothic Medium", "游ゴシック Medium", YuGothic, "游ゴシック体", "メイリオ", sans-serif;
  `
  const Gif = styled.div `
    position: relative;
    text-align: center;
    align-items: center;
    display: flex;
    justify-content: center;
  `;

  const LoadingImage = styled.img `
    margin:163.5px auto;
  `;

  const InfoTop = styled.div `
    display:flex;
    width:95%;
    margin:10px auto;
  `;
  
  const BackArrow = styled.div`
    width: 16px;
    height: 19px;
  `;

  const Image = styled.img `
    width: 95%;
    height: 50%;
    margin: 12px auto;
    object-fit:cover;
  `;

  const Rectangle6 = styled.div `
    width: 100%;
    height: 257px;
    padding: 18px 0 22px 0;
    background-color: #fff;
  `;

  const Text = styled.div `
    margin-top:18px;
    margin-left:30px;
  `;
  
  const Name = styled.h1`
    margin: 0 96px 12px 9px;
    font-size: 18px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.08;
    letter-spacing: normal;
    color: #333;
  `;

  const Maker = styled.p`
    margin: 5px 0 5px 18px;
    font-size: 15px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.14;
    letter-spacing: normal;
    color: #040404;
  `;

  const StartDay = styled.p`
    margin: 5px 78px 5px 18px;
    font-size: 15px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.14;
    letter-spacing: normal;
    color: #040404;
  `;

  const Content = styled.p `
    margin: 5px 108px 5px 18px;
    font-size: 15px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.3;
    letter-spacing: normal;
    color: #040404;
  `;

  useEffect(()=>{
    const file = new FormData()
    file.append("id", props.id);
    axios.post('http://localhost/api/golf/search',file)
    .then(res => {
      setGolf(res.data);
      console.log(res.data);
      setLoad(false);
    })
  },[])

  function handleClick(event) {
    history.push({
      pathname: '/edit/' + event.target.value
    });
  }

  const image = (img) => {
    const image_path = "storage/image/" + img;
    return(
      <Image src={image_path}/>
    );
  }

  return(
    <>
      <DetailShow>
        {load?
          <Gif>
            <LoadingImage src={golfIcon} />
          </Gif>
        :
        <>
          <InfoTop>
            <BackArrow>＜</BackArrow>
            <Button variant="outlined" size="small" onClick={handleClick} value={golf.id} sx={{mx:5}}>修正</Button>
          </InfoTop>
          {image(golf.image)}
          <Rectangle6>
            <Text>
            <Name>
              {golf.name}
            </Name>
            <Maker>
              {golf.address}
            </Maker>
            <StartDay>
              料金:{golf.price}
            </StartDay>
            <Content>
              コース情報:{golf.courseInfo}
            </Content>
            <Content>
              電話番号：{golf.phone}
            </Content>
            </Text>
            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" sx={{my:5,mx:'auto'}}>
              <a href={golf.hp} target="_blank">
                <Button variant="contained" color="primary">
                  公式
                </Button>
              </a>
              <a href={golf.moreInfo} target="_blank">
                <Button variant="contained" color="warning">
                  詳細情報
                </Button>
              </a>
            </Stack>
          </Rectangle6>
        </>
        }
      </DetailShow>
    </>
  );
}

export default Show;
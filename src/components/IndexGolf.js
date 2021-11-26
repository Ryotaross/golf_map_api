import React from 'react';
import styled from "styled-components";
import '../style/common.css'

function IndexGolf(props) {
  const golfs = props.golfs;

  const FlexBox = styled.div `
    display:flex;
    flex-direction: row;
    justify-content: start;
    margin:36px auto;
  `

  const Bitmap = styled.img `
    width: 120px;
    height: 100%;
    margin: 5px 15px 12px 33px;
    object-fit:cover;
  `

  const ItemName = styled.p`
    margin: 0 33px 5px 6px;
    font-size: 16px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.44;
    letter-spacing: normal;
    color: #333;
  `

  const ItemMaker = styled.p`
    margin: 0 20px 5px 11px;
    font-size: 12px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.65;
    letter-spacing: normal;
    color: #040404;
  `;

  const ItemStartDay = styled.p`
    margin: 0 20px 5px 11px;
    font-size: 12px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.65;
    letter-spacing: normal;
    color: #040404;
  `;

  const EndLine = styled.div `
    width: 95%;
    height: 1px;
    margin:0 auto;
    border: solid 1px #979797;
  `;


  const image = (img) => {
    const image_path = "storage/image/" + img;
    return(
      <Bitmap src={image_path}/>
    );
  }

  const Index = (
    golfs.map((golf) => 
    <React.Fragment key={golf.id}>
      <FlexBox onClick={props.toggleDrawer(true,golf.id)}>
        {image(golf.image)}
        <golfText>
          <ItemName>
            {golf.name}
          </ItemName>
          <ItemMaker>
            {golf.address}
          </ItemMaker>
          <ItemStartDay>
            {golf.price}
          </ItemStartDay>
        </golfText>
      </FlexBox>
      <EndLine></EndLine>
    </React.Fragment>
    )
  ) 

  return(
    <>
      {Index}  
    </> 
    
  );
}

export default IndexGolf;


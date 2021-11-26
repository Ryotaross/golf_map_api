import React from 'react';
import { useState } from 'react';
import { Redirect,useHistory } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import { Alert } from '@mui/material';
import Button from '@mui/material/Button';
import { CardMedia } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import { blueGrey } from '@mui/material/colors';
import { grey } from '@mui/material/colors';

function Create() {
  const googleGeocoder = null;
  const [golf,setGolf] = useState([{name: "",address: "",price: "",courseInfo: "",phone: "",hp:"",moreInfo:"",image:""}]);
  const [image,setImage] = useState();
  const [lat,setLat] = useState("");
  const [lng,setLng] = useState("");
  const history = useHistory();

  const handleSubmit = () => {

    console.log(golf);
    console.log(image);
    console.log(lat);
    console.log(lng);
    
    const file = new FormData()
    file.append("name", golf.name);
    file.append("address", golf.address);
    file.append("price", golf.price);
    file.append("phone", golf.phone);
    file.append("hp", golf.hp);
    file.append("moreInfo", golf.moreInfo);
    file.append("image", image[0]);
    file.append("courseInfo", golf.courseInfo);
    file.append("lat", lat);
    file.append("lng", lng);

    axios
      .post('http://localhost/api/golf/create',file,
        {
          headers: {
          'content-type': 'multipart/form-data',
          },
        }
      )
      .then(response => {
        console.log(response);
        history.push('/');
      })
      .catch(error => {
        console.log(file);
        console.log(error);
    });
  }

  const changeLocationName = (event) => {
    if (event.key === 'Enter') {
      geocode();
      return;
    }
    setGolf({ ...golf, address: event.target.value })
  }

  function geocode() {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: golf.address }, (results, status) => {
      if (status === 'OK') {
        setLat(results[0].geometry.location.lat()),
        setLng(results[0].geometry.location.lng());
      }
    });
  }
  
  const card = (
    <React.Fragment >
      <CardMedia sx={{ width:{ xs: 400, md: 800 },height:60,m:'auto',pt:2,fontSize: 20,bgcolor:blueGrey[800],color:grey[50]}}>
          新規作成
      </CardMedia>
      <CardContent sx={{m:'auto',width:{ xs: 400, md: 800 },border:1,borderColor: 'grey.500',boxShadow: 1,bgcolor:grey[50]}}>
        <TextField
          fullWidth
          id="standard-required"
          label="コース名"
          variant="standard"
          sx={{my:2}}
          onChange={event => {setGolf({ ...golf, name: event.target.value });geocode();}}
        />
        <TextField
          fullWidth
          id="standard-required"
          label="住所"
          variant="standard"
          sx={{my:2}}
          onChange={(event) => changeLocationName(event)} 
          value={golf.address} 
          onKeyPress={(event) => changeLocationName(event)}
        />
        <TextField
          fullWidth
          id="standard-required"
          label="料金"
          variant="standard"
          sx={{my:2}}
          onChange={event => {setGolf({ ...golf, price: event.target.value });geocode();}}
        />
        <TextField
          fullWidth
          id="standard-required"
          label="コース情報"
          variant="standard"
          sx={{my:2}}
          onChange={event => {setGolf({ ...golf, courseInfo: event.target.value });geocode();}}
        />
        <TextField
          fullWidth
          id="standard-required"
          label="電話番号"
          variant="standard"
          sx={{my:2}}
          onChange={event => {setGolf({ ...golf, phone: event.target.value });geocode();}}
        />
        <TextField
          fullWidth
          id="standard-required"
          label="公式ホームページ"
          variant="standard"
          sx={{my:2}}
          onChange={event => {setGolf({ ...golf, hp: event.target.value });geocode();}}
        />
        <TextField
          fullWidth
          id="standard-required"
          label="提携ホームページ"
          variant="standard"
          sx={{my:2}}
          onChange={event => {setGolf({ ...golf, moreInfo: event.target.value });geocode();}}
        />
        <input accept="image/*" multiple type="file" className="input" id="upload-img" 
        onChange={event => {setImage(event.target.files);geocode();}} />
        <Button variant="contained" sx={{m:1}} onClick={handleSubmit}>投稿</Button>
        <LoadScript googleMapsApiKey={"AIzaSyC5wGBoyJ4BGGZETLXsqmdmbadXcSPaPCM"}>
        </LoadScript>

      </CardContent>
    </React.Fragment>
  );

  return (
    <>
        <div>
          <Box sx={{ minWidth: 275}} >
            <Card sx={{px:{ xs: 3, md: 10 },py:5}}>{card}</Card>
          </Box>
        </div>
    </>
  );
}

export default Create;
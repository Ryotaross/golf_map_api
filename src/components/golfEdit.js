import React from 'react';
import { useState,useEffect  } from 'react';
import { useParams,useHistory } from 'react-router-dom';
import { LoadScript } from '@react-google-maps/api';
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { CardMedia } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import { blueGrey } from '@mui/material/colors';
import { grey } from '@mui/material/colors';

function GolfEdit() {
  const [golf,setGolf] = useState({id: "",name: "",address: "",price: "",courseInfo: "",phone: "",hp:"",moreInfo:"",image:"",lat:"",lng:""});
  const [lat,setLat] = useState();
  const [lng,setLng] = useState();
  const { id } = useParams()
  const history = useHistory();

  useEffect(() => {
    const url = new FormData()
    url.append("id", id);
    axios.post('http://localhost/api/golf/search',url)
    .then(res => {
      setGolf(res.data);
      setLat(res.data.lat);
      setLng(res.data.lng);
      console.log(res);
    })
  },[])

  const handleEdit = () => {
    
    const file = new FormData()
    file.append("id", golf.id);
    file.append("name", golf.name);
    file.append("address", golf.address);
    file.append("price", golf.price);
    file.append("courseInfo", golf.courseInfo);
    file.append("phone", golf.phone);
    file.append("hp", golf.hp);
    file.append("moreInfo", golf.moreInfo);
    file.append("lat", lat);
    file.append("lng", lng);

    axios
      .post('http://localhost/api/golf/update',file)
      .then(response => {
        console.log(response);
        history.push('/');
      })
      .catch(error => {
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
        let center = Object.assign({}, center);
        setLat(results[0].geometry.location.lat()),
        setLng(results[0].geometry.location.lng());
        setCenter(center);
        setIsShowMarker(true);

      }
    });
  }

  const handleDelete = () => {
    
    const file = new FormData()
    file.append("id", golf.id);
    axios
      .post('http://localhost/api/golf/delete',file)
      .then(response => {
        console.log(response);
        history.push('/');
      })
      .catch(error => {
        console.log(error);
    });
  }

  const card = (
    <React.Fragment >
      <CardMedia sx={{ width:{ xs: 400, md: 800 },height:60,m:'auto',pt:2,fontSize: 20,bgcolor:blueGrey[800],color:grey[50]}}>
          {golf.name}を修正
      </CardMedia>
      <CardContent sx={{m:'auto',width:{ xs: 400, md: 800 },border:1,borderColor: 'grey.500',boxShadow: 1,bgcolor:grey[50]}}>
        <TextField
          fullWidth
          id="standard-required"
          label="コース名"
          variant="standard"
          sx={{my:2}}
          value={golf.name}
          onChange={event => setGolf({ ...golf, name: event.target.value })}
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
          value={golf.price}
          onChange={event => setGolf({ ...golf, price: event.target.value })}
        />
        <TextField
          fullWidth
          id="standard-required"
          label="コース情報"
          variant="standard"
          sx={{my:2}}
          value={golf.courseInfo}
          onChange={event => setGolf({ ...golf, courseInfo: event.target.value })}
        />
        <TextField
          fullWidth
          id="standard-required"
          label="電話番号"
          variant="standard"
          sx={{my:2}}
          value={golf.phone}
          onChange={event => setGolf({ ...golf, phone: event.target.value })}
        />
        <TextField
          fullWidth
          id="standard-required"
          label="公式ホームページ"
          variant="standard"
          sx={{my:2}}
          value={golf.hp}
          onChange={event => setGolf({ ...golf, hp: event.target.value })}
        />
        <TextField
          fullWidth
          id="standard-required"
          label="提携ホームページ"
          variant="standard"
          sx={{my:2}}
          value={golf.moreInfo}
          onChange={event => setGolf({ ...golf, moreInfo: event.target.value })}
        />
        <Button variant="contained" sx={{m:1}} onClick={handleEdit}>修正</Button>
        <Button variant="contained" sx={{m:1}} onClick={handleDelete} color="error">削除</Button>
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

export default GolfEdit;
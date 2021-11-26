import React from 'react';
import { useState } from 'react';
import { Redirect,useHistory } from 'react-router-dom';
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
  const[meat,setMeat] = useState({id: "",name: "",maker: "",materials: "",officialUrl: "",amazonUrl: "",rakutenUrl:"",image:"",startDay:""})
  const[errorCodes,setErrorCodes] = useState([])
  const[ErrorMessageJP,setErrorMessageJP] = useState([])
  const[ErrorMessageEN,setErrorMessageEN] = useState([])
  const[Error,setError] = useState(false)
  const[open, setOpen] = useState(false);
  const token = localStorage.getItem('token');
  const history = useHistory();

  const handleSubmit = () => {
    console.log(1);

    const file = new FormData();
    file.append("image", meat.image.files[0]);

    axios
      .post('http://localhost/api/meat/create',{
        name:meat.name,maker:meat.maker,materials:meat.materials,officialUrl:meat.officialUrl,amazonUrl:meat.amazonUrl,
        rakutenUrl:meat.rakutenUrl,image:meat.image,startDay:meat.startDay
        },
        {
          headers: {
          'content-type': 'multipart/form-data',
          },
        }
      )
      .then(response => {
        console.log(response);
        console.log(2);
      })
      .catch(error => {
        console.log(error);
        console.log(3);
    });
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const uploadFile = (e) => {
    setMeat({ ...meat, file: e.target.files[0] }
    , () => {
      this.sendFile();
    });
  };

  const card = (
    <React.Fragment >
      <CardMedia sx={{ width:{ xs: 400, md: 800 },height:60,m:'auto',pt:2,fontSize: 20,bgcolor:blueGrey[800],color:grey[50]}}>
          新規作成
      </CardMedia>
      <CardContent sx={{m:'auto',width:{ xs: 400, md: 800 },border:1,borderColor: 'grey.500',boxShadow: 1,bgcolor:grey[50]}}>
        <TextField
          fullWidth
          id="standard-required"
          label="商品名"
          variant="standard"
          sx={{my:2}}
          onChange={event => setMeat({ ...meat, name: JSON.stringify(event.target.value) })}
        />
        <TextField
          fullWidth
          id="standard-required"
          label="販売メーカー"
          variant="standard"
          sx={{my:2}}
          onChange={event => setMeat({ ...meat, maker: JSON.stringify(event.target.value) })}
        />
        <TextField
          fullWidth
          id="standard-required"
          label="原材料"
          variant="standard"
          sx={{my:2}}
          onChange={event => setMeat({ ...meat, materials: JSON.stringify(event.target.value) })}
        />
        <TextField
          fullWidth
          id="standard-required"
          label="公式ページURL"
          variant="standard"
          sx={{my:2}}
          onChange={event => setMeat({ ...meat, officialUrl: JSON.stringify(event.target.value) })}
        />
        <TextField
          fullWidth
          id="standard-required"
          label="AmazonURL"
          variant="standard"
          sx={{my:2}}
          onChange={event => setMeat({ ...meat, amazonUrl: JSON.stringify(event.target.value) })}
        />
        <TextField
          fullWidth
          id="standard-required"
          label="楽天URL"
          variant="standard"
          sx={{my:2}}
          onChange={event => setMeat({ ...meat, rakutenUrl: JSON.stringify(event.target.value) })}
        />
        <input type="date" label="販売開始日"
        onChange={event => setMeat({ ...meat, startDay: JSON.stringify(event.target.value) })}/>
        <input accept="image/*" multiple type="file" className="input" id="upload-img" 
        onChange={event => setMeat({ ...meat, image: event.target.value })} />
        <Button variant="contained" sx={{m:1}} onClick={handleSubmit}>投稿</Button>
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
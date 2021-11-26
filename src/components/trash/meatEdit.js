import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams,useHistory } from 'react-router-dom';
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

function MeatEdit() {
  const[meat,setMeat] = useState({id: "",name: "",maker: "",materials: "",officialUrl: "",amazonUrl: "",rakutenUrl:"",startDay:"",image:""});
  const[image,setImage] = useState();
  const { id } = useParams()
  const history = useHistory();
  
  useEffect(() => {
    const url = new FormData()
    url.append("id", id);
    axios.post('http://localhost/api/meat/search',url)
    .then(res => {
      setMeat(res.data);
      setImage(res.data.image);
      console.log(res);
    })
  },[])
  
  const handleEdit = () => {
    
    const file = new FormData()
    file.append("id", id);
    file.append("name", meat.name);
    file.append("maker", meat.maker);
    file.append("materials", meat.materials);
    file.append("officialUrl", meat.officialUrl);
    file.append("amazonUrl", meat.amazonUrl);
    file.append("rakutenUrl",meat.rakutenUrl);
    file.append("startDay", meat.startDay);

    axios
      .post('http://localhost/api/meat/update',file)
      .then(response => {
        console.log(response);
        history.push('/');
      })
      .catch(error => {
        console.log(error);
    });
  }

  const handleDelete = () => {
    
    const file = new FormData()
    file.append("id", id);
    axios
      .post('http://localhost/api/meat/delete',file)
      .then(response => {
        console.log(response);
        history.push('/');
      })
      .catch(error => {
        console.log(error);
    });
  }

  const handleClick = () => {
    console.log(meat);
    console.log(image);
  }
  
  const card = (
    <React.Fragment >
      <CardMedia sx={{ width:{ xs: 400, md: 800 },height:60,m:'auto',pt:2,fontSize: 20,bgcolor:blueGrey[800],color:grey[50]}}>
        編集
      </CardMedia>
      <CardContent sx={{m:'auto',width:{ xs: 400, md: 800 },border:1,borderColor: 'grey.500',boxShadow: 1,bgcolor:grey[50]}}>
        <TextField
          fullWidth
          id="standard-required"
          label="商品名"
          variant="standard"
          sx={{my:2}}
          value={meat.name}
          onChange={event => setMeat({ ...meat, name: event.target.value })}
        />
        <TextField
          fullWidth
          id="standard-required"
          label="販売メーカー"
          variant="standard"
          sx={{my:2}}
          value={meat.maker}
          onChange={event => setMeat({ ...meat, maker: event.target.value })}
        />
        <TextField
          fullWidth
          id="standard-required"
          label="原材料"
          variant="standard"
          sx={{my:2}}
          value={meat.materials}
          onChange={event => setMeat({ ...meat, materials: event.target.value })}
        />
        <TextField
          fullWidth
          id="standard-required"
          label="公式ページURL"
          variant="standard"
          sx={{my:2}}
          value={meat.officialUrl}
          onChange={event => setMeat({ ...meat, officialUrl: event.target.value })}
        />
        <TextField
          fullWidth
          id="standard-required"
          label="AmazonURL"
          variant="standard"
          sx={{my:2}}
          value={meat.amazonUrl}
          onChange={event => setMeat({ ...meat, amazonUrl: event.target.value })}
        />
        <TextField
          fullWidth
          id="standard-required"
          label="楽天URL"
          variant="standard"
          sx={{my:2}}
          value={meat.rakutenUrl}
          onChange={event => setMeat({ ...meat, rakutenUrl: event.target.value })}
        />
        <input type="date" 
        onChange={event => setMeat({ ...meat, startDay: event.target.value })}
        value={meat.startDay}/>
        <Button variant="contained" sx={{m:1}} onClick={handleEdit}>修正</Button>
        <Button variant="contained" sx={{m:1}} onClick={handleDelete} color="error">削除</Button>
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

export default MeatEdit;
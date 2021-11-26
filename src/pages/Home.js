import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import '../style/common.css'
import Index from '../components/Index';
import Footer from '../components/footer';
import golfIcon from './image/golf1_animated_300.gif'

function Home() {
  const[load,setLoad] = useState(true);
  const[loadGolf,setLoadGolf] = useState(true);
  const[golfs,setGolfs] = useState([{id: "",name: "",address: "",price: "",courseInfo: "",phone: "",hp:"",moreInfo:"",image:"",lat:0,lng:0}]);

  useEffect(() => {
    setTimeout(function(){
      setLoad(false)
    }.bind(this),3000);

    axios.get('http://localhost/api/golfs')
    .then(res => {
      setGolfs(res.data);
      console.log(res.data);
      setLoadGolf(false);
    });
  },[])

    return (
      <>
        <main>
          {load && loadGolf?
          <div className="loading">
            <img src={golfIcon} className="loadImage"></img>
          </div>:
            <div className='sk-ab sk-index'>
              <div className='main'>
                <Index golfs={golfs}/>
              </div>
            </div>
          }
	      </main>
        {load && loadGolf?'':
        <Footer />
        }
      </>
    );
}

export default Home;
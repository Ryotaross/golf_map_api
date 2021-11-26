import React from 'react';
import styled,{ keyframes } from "styled-components";
import { useState,useRef, useCallback } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Show from './show';
import MapGL, {
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl
} from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder'
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import '../style/common.css'

import Pins from './pins';
import GolfInfo from './golf-info';
import IndexGolf from './IndexGolf';
import TopGolf from './topGolf';

const TOKEN = 'pk.eyJ1IjoicnlvdGFybzIwIiwiYSI6ImNrdml2cmhtZ2Jld2kyd3Q5ZHFudzhrcGQifQ.2zjaqGum-QE9BzQYuE4zCg'

const geolocateStyle = {
  top: 0,
  left: 0,
  padding: '10px'
};

const fullscreenControlStyle = {
  top: 36,
  left: 0,
  padding: '10px'
};

const navStyle = {
  top: 72,
  left: 0,
  padding: '10px'
};

const scaleControlStyle = {
  bottom: 36,
  left: 0,
  padding: '10px'
};

function Index(props) {
  const [show,setShow] = useState(false); 
  const golfs = props.golfs;
  const [selectId,setSelectId] = useState();
  const [viewport, setViewport] = useState({
    latitude: 34.69821725408306,
    longitude: 135.5030768798753,
    zoom: 8,
    bearing: 0,
    pitch: 0
  });
  const [popupInfo, setPopupInfo] = useState(null);
  const mapRef = useRef();

  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides
      });
    },
    []
  );

  /*
  const ZoomIn = keyframes`
    0% {
      transform: scale(0.8);
      opacity: 0;
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  `;
  */

  const List = styled.div `
    overflow: scroll;
    width:450px;
    height: 400px;
    margin:30px auto;
    background: white;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 30px 70px;
    &:hover {
      cursor: pointer;
      border-radius: 20px;
      color: white;
    }
  `;

  const toggleDrawer = (open,id) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setShow(open);
    setSelectId(id);
  };

  const list = (id) => (
    <Box
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Show id={id}/>
    </Box>
  );

  return(
    <>
      <TopGolf />
      <div className="MapStyle">
        <MapGL
          ref={mapRef}
          {...viewport}
          width= "100%"
          height= "450px"
          mapStyle="mapbox://styles/ryotaro20/ckvpzsb5s8j5p15qlikojnxoo"
          onViewportChange={setViewport}
          mapboxApiAccessToken={TOKEN}
        >
          <Geocoder
          mapRef={mapRef}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={TOKEN}
          position="top-right"
          />
          <Pins golf={golfs} onClick={setPopupInfo}/>
          {popupInfo && (
            <Popup
              tipSize={5}
              anchor="top"
              longitude={popupInfo.lng}
              latitude={popupInfo.lat}
              closeOnClick={false}
              onClose={setPopupInfo}
            >
              <GolfInfo info={popupInfo} toggleDrawer={toggleDrawer} />
            </Popup>
          )}
          <GeolocateControl style={geolocateStyle} />
          <FullscreenControl style={fullscreenControlStyle} />
          <NavigationControl style={navStyle} />
          <ScaleControl style={scaleControlStyle} />
        </MapGL>
      </div>
      <List>
        <IndexGolf toggleDrawer={toggleDrawer} golfs={golfs} />
        <Drawer
            anchor="bottom"
            open={show}
            onClose={toggleDrawer(false)}
          >
            {list(selectId)}
        </Drawer>
      </List>
    </>
    
  );
}

export default Index;
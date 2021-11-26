import React from 'react';
import ReactDOM from 'react-dom';
import '../style/common.css'
import Detail from '../components/Detail';

function Sub() {
    return (
      <>
        <body>
		      <div class='sk-ab sk-index'>
            <div className='main'>
              <Detail />
            </div>
		      </div>
	      </body>
      </>
    );
}

export default Sub;
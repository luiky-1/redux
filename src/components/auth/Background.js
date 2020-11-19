import React from 'react';

import {
  BrowserRouter as ReactRouter,
  Route
} from 'react-router-dom';

const Background = (props)=>{
  return(
    <ReactRouter >
      <div >
        <Route path="/login" exact render={()=>
            <div className="Login-background" style={{'backgroundImage': "url("+process.env.PUBLIC_URL + '/images/login-background.jpg)'}}></div>
          }></Route>
        <Route path="/signup" exact render={()=>
            <div className="Login-background" style={{'backgroundImage': "url("+process.env.PUBLIC_URL + '/images/friends.jpeg)'}}></div>
          }></Route>

      </div>
    </ReactRouter>
  );
}

export default Background;

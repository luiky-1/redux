import React from 'react';
import Visit from './Visit';

import TransitionGroup from 'react-transition-group/TransitionGroup';

export default class VisitsCollection extends React.Component{
  visits(){
    console.log(this.props.visits);
    if(this.props.visits.length < 1) return "";
    return this.props.visits.map(visit => <Visit key={visit._id} visit={visit} /> )
  }

  render(){
    return(
      <div>
        <TransitionGroup>
          {this.visits()}
        </TransitionGroup>
      </div>
    );
  }
}

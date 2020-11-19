import React from 'react';
import { Card } from 'material-ui/Card';
import { withRouter } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Star from 'material-ui/svg-icons/toggle/star';
import { yellow700 } from 'material-ui/styles/colors';

import { getPlace } from '../requests/places';

import * as visitsActions from '../actions/visitsActions';
import * as favoritesActions from '../actions/favoritesActions';

import Container from '../components/Container';
import VisitForm from '../components/visits/VisitForm';
import VisitsCollection from '../components/visits/VisitsCollection';


class Place extends React.Component{
  constructor(props){
    super(props);

    const slug = props.match.params.slug;
    this.loadPlace(slug);

    this.fav = this.fav.bind(this);

    this.state = {
      place: {}
    }
  }

  loadPlace(slug){
    this.props.dispatch(visitsActions.loadAllForPlace(slug));

    getPlace(slug).then(json=>{

      this.setState({
        place: json
      })
    })
  }

  fav(){
    this.props.dispatch(favoritesActions.add(this.state.place._id));
  }

  favBtn(){
    return(
      <FloatingActionButton onClick={this.fav} backgroundColor={yellow700} className="Fav-btn">
        <Star />
      </FloatingActionButton>
    );
  }

  render(){
    const {place} = this.state;
    return(
      <div className="Place-container">
        <header
              className="Place-cover"
              style={{'backgroundImage': 'url('+place.coverImage+')'}}>

        </header>
        <Container>
          <div className="row">
            <div className="col-xs-12 col-md-8">
              <Card className="Place-card">
                {this.favBtn()}
                <div className="row">
                  <div className='col-xs-12 col-sm-3 col-lg-2'>
                    <img src={place.avatarImage} style={{'maxWidth': '100%'}} />
                  </div>
                  <div className="col-xs">
                    <h1>{place.title}</h1>
                    <address>{place.address}</address>
                    <p>{place.description}</p>
                  </div>
                </div>
                <div style={{'marginTop':'1em'}}>
                  <VisitForm place={place}/>
                </div>
              </Card>
            </div>
            <div className="col-xs">
              <VisitsCollection visits={this.props.visits} />
            </div>
          </div>
        </Container>
      </div>
    );
  }
}


function mapStateToProps(state,ownProps){
  return {
    visits: state.visits
  }
}

export default connect(mapStateToProps)(withRouter(Place));

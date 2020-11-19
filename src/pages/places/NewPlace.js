import React from 'react';
import { connect } from 'react-redux';

import TextField from 'material-ui/TextField';
import Title from '../../components/Title';
import RaisedButton from 'material-ui/RaisedButton';
import { Card } from 'material-ui/Card';
import Container from '../../components/Container';

import * as requests from '../../requests/places';
import { push } from 'react-router-redux';

import Uploader from '../../components/uploader/Uploader';


const textStyles = {
  'width': '100%'
}

class NewPlace extends React.Component{

  constructor(props){
    super(props);

    this.state = {uploading: false};

    this.createPlace = this.createPlace.bind(this);
    this.getFile = this.getFile.bind(this);
  }

  createPlace(){
    const data = {
      title: this.refs.titleField.getValue(),
      address: this.refs.addressField.getValue(),
      description: this.refs.descriptionField.getValue(),
    }

    if(data['title'] == "" || data["address"] == "" || data['description'] == ""){
      alert('Toda la información debe ser llenada'); //Handle error
      return "";
    }

    if(this.state.avatar) data.avatar = this.state.avatar;
    if(this.state.cover) data.cover = this.state.cover;

    this.setState({uploading: true})

    requests.createPlace(data,this.props.user.jwt).then(data => {
      console.log(data);
      this.setState({uploading: false})
      this.props.dispatch(push("/lugares/"+data.slug));
    }).catch(console.log);
  }

  getFile(type,file){
    let state = {};
    state[type] = file;

    this.setState(state);
  }

  render(){
    return(
      <div>
        <Container>
          <Card style={{'textAlign': 'left', 'padding': '20px'}}>
            <header style={{'borderBottom': 'solid 2px #eee'}}>
              <Title />
            </header>

            <div>
              <TextField
                floatingLabelText= "Nombre del negocio"
                ref="titleField"
                style={textStyles}
                />
              <TextField
                floatingLabelText= "Dirección"
                ref="addressField"
                style={textStyles}
                />
              <div style={{'marginTop': '1em'}}>
                <Uploader label="Subir avatar" type='avatar' getFile={this.getFile} />
              </div>
              <div style={{'marginTop': '1em'}}>
                <Uploader label="Subir cover" type='cover' getFile={this.getFile} />
              </div>


              <TextField
                floatingLabelText= "Descripción el negocio"
                ref="descriptionField"
                multiLine={true}
                style={textStyles}
                />
              <div style={{'textAlign': 'right', 'marginTop': '1em'}}>
                <RaisedButton
                  label='Guardar'
                  onClick={this.createPlace}
                  disabled={this.state.uploading}
                  secondary={true}/>
              </div>
            </div>
          </Card>
        </Container>
      </div>
    );
  }
}

export default connect(function(state,ownPlace){
  return {
    user: state.user
  }
})(NewPlace);

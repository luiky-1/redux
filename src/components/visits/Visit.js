import React from 'react';
import {Card,CardText,CardHeader,CardTitle,CardActions} from 'material-ui/Card';
import FadeAndScale from '../animations/FadeAndScale';
import Emoji from './emoji_picker/Emoji';

import {relationInverse} from './emoji_picker/emojis';


export default class Visit extends React.Component{
  getShortCode(){
    if(!this.props.visit.reaction) return relationInverse["love"];

    return relationInverse[this.props.visit.reaction];
  }


  render(){
    return(
      <FadeAndScale in={this.props.in} key={this.props.key}>
        <div>
          <Card style={{'textAlign': 'left','marginTop':'1em'}}>
            <div className="row middle-xs">
              <div className="col-xs">
                <CardHeader title="Uriel"
                          avatar={'https://cdn.dribbble.com/users/373338/screenshots/2558656/batman_avatar_dribbbb_1x.png'}
                          subtitle={this.props.visit.observation}
                          >
                        </CardHeader>
              </div>
              <div className="col-xs-2 col-sm-1">
                <Emoji code={this.getShortCode()} />
              </div>
            </div>
          </Card>
        </div>
      </FadeAndScale>
    );
  }
}

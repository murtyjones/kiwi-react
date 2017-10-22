import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';

class LessonCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  handleExpandChange = (expanded) => {
    this.setState({expanded: expanded});
  };

  handleToggle = (event, toggle) => {
    this.setState({expanded: toggle});
    console.log('the event toggled')
  };

  handleExpand = () => {
    this.setState({expanded: true});
  };

  handleReduce = () => {
    this.setState({expanded: false});
  };


  //This is the card list item

  handleLessonClick(){
    this.props.handleLessonClick()
  }

  render() {
    return (
      <div>
        <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
          <CardHeader
            title="Author"
            subtitle="Lesson 1"
            avatar="https://avatars0.githubusercontent.com/u/8691910?s=460&v=4"
            actAsExpander={true}
            showExpandableButton={true}
          />

          <CardText expandable={true}>
            hello there sailor - this is where meta information about the project
            <br/><br/>
            <FlatButton primary={true} onClick={()=>{this.handleLessonClick()}}>Edit Lesson</FlatButton>
          </CardText>
        </Card>
      </div>
    );
  }
}

export default LessonCard

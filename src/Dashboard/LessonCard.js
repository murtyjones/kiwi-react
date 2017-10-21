import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';

export default class LessonCard extends React.Component {

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

  render() {
    return (
      <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
        <CardHeader
          title="Author"
          subtitle="Lesson 1"
          avatar="https://avatars0.githubusercontent.com/u/8691910?s=460&v=4"
          actAsExpander={true}
          showExpandableButton={true}
        />
        
        <CardMedia
          expandable={true}
          overlay={<CardTitle title="Variables" subtitle="Creating web apps, games, and search engines all involve storing and working with different types of data. They do so using variables. A variable stores a piece of data, and gives it a specific name" />}
        >
          <img src="https://www.rd.com/wp-content/uploads/sites/2/2016/09/12-comparing-most-inspirational-quotes-on-teaching-NF-narloch-liberra.jpg" alt="" />
        </CardMedia>
        <CardTitle title="Python Syntax" subtitle="Learn FUNdamentals of Python" expandable={true} />
        <CardText expandable={true}>
          This lesson will introduce you to Python, a general-purpose, object-oriented interpreted language you can use for countless standalone projects or scripting applications.

        </CardText>
        <CardActions>
          <FlatButton label="Expand" onClick={this.handleExpand} />
          <FlatButton label="Reduce" onClick={this.handleReduce} />
        </CardActions>
      </Card>
    );
  }
}

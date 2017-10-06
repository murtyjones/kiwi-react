import React from 'react';
import { Row, Col } from 'react-grid-system';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardHeader, CardText } from 'material-ui/Card';

import { resources } from './resourcesText';

const styles = {
  base: {
    width: '95%',
    maxWidth: 'none',
  },
  cards: {
    marginTop: '10px',
  },
  aTag: {
    color: 'white',
  },
};

function Resources(props) {
  const { show, hide } = props;
  const actions = [
    <RaisedButton
      label="Close"
      primary={ true }
      onTouchTap={ hide }
    />,
  ];
  const len = resources.length;
  const mid = resources.length / 2;
  const leftCol = resources.slice(0, mid);
  const rightCol = resources.slice(mid, len);

  const getResourceCodeOrURL = (resource) => {
    if(resource.code){
      return resource.code
    } else if(resource.url) {
      return <a href={ resource.url } target="_blank" style={ styles.aTag }>{ resource.title }</a>
    }
  }

  return (
    <Dialog
      title="Python Resources!"
      actions={ actions }
      modal={ false }
      open={ show }
      onRequestClose={ hide }
      contentStyle={ styles.base }
      autoScrollBodyContent={ true }
    >
      <Row>
        <Col md={ 6 }>
          { leftCol.map((resource, index) => {
            return (
              <Card key={ resource.title } style={ styles.cards }>
                <CardHeader
                  title={ resource.title }
                  subtitle={ resource.description }
                />
                <CardText>
                  <pre>
                    { resource.code }
                  </pre>
                </CardText>
              </Card>
            )} )
          }
        </Col>
        <Col md={ 6 }>
          { rightCol.map((resource, index) => {
            return (
              <Card key={resource.title} style={styles.cards}>
                <CardHeader
                  title={resource.title}
                  subtitle={resource.description}
                />
                <CardText>
                  <pre>
                    {getResourceCodeOrURL(resource)}
                  </pre>
                </CardText>
              </Card>
            )} )
          }
        </Col>
      </Row>
    </Dialog>
  )
}
export default Resources;

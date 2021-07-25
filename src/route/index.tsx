import React from 'react';
import Switch from 'react-bootstrap/esm/Switch';
import { Route } from 'react-router-dom';
import NaverMapView from '../componet/map/naver/naverMapView';
import Contact from '../page/contact/contact';
import Messages from '../page/messages/messages';
import Pictures from '../page/pictures/pictures';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path={['/', '/map']} component={NaverMapView} />
      <Route path="/pictures" component={Pictures} />
      <Route path="/messages" component={Messages} />
      <Route path="/contact" component={Contact} />
    </Switch>
  );
};

export default Routes;

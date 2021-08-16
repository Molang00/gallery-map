import React from 'react';
import Switch from 'react-bootstrap/esm/Switch';
import { Route } from 'react-router-dom';
import NaverMapView from '../componet/map/naver/naverMapView';
import Contact from '../page/contact/contact';
import Board from '../page/board/board';
import Upload from '../page/upload/upload';
import BoardDetail from '../page/board/boardDetail/boardDetail';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path={['/', '/map']} component={NaverMapView} />
      <Route path="/upload" component={Upload} />
      <Route exact path="/board" component={Board} />
      <Route path="/board/:id" component={BoardDetail} />
      <Route path="/contact" component={Contact} />
    </Switch>
  );
};

export default Routes;

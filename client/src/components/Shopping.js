import React from 'react';
import PropTypes from 'prop-types';
import ShoppingList from './ShoppingList';
import ItemModal from './ItemModal';
import { Container } from 'reactstrap';

const Shopping = props => {
  return (
    <Container>
      <ItemModal />
      <ShoppingList />
    </Container>
  );
};

Shopping.propTypes = {

};

export default Shopping;
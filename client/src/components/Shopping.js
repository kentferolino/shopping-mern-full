import React from 'react';
import PropTypes from 'prop-types';
import ShoppingList from './ShoppingList';
import ItemModal from './ItemModal';

const Shopping = props => {
  return (
    <div>
      <ItemModal />
      <ShoppingList />
    </div>
  );
};

Shopping.propTypes = {

};

export default Shopping;
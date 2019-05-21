import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class ShoppingList extends Component {
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };

  componentDidMount() {
    this.props.getItems();
  }

  render() {
    const { items } = this.props.item;
    const { isAuthenticated } = this.props.auth;
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="shopping-list">
            {items.map(item => (
              <CSSTransition key={item._id} timeout={500} classNames="fade">
                <ListGroupItem>
                  {isAuthenticated && <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={() => this.onDeleteClick(item._id)}
                  >
                    &times;
                  </Button>}
                  {item.name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }

  onDeleteClick = id => {
    this.props.deleteItem(id);
  };
}

const mapStateToProps = state => ({
  item: state.item,
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { getItems, deleteItem }
)(ShoppingList);

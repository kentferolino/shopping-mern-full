import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

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
      <div>
        <List component="nav">
          <TransitionGroup className="shopping-list">
            {items.map(item => (
              <CSSTransition key={item._id} timeout={500} classNames="fade">
                <ListItem button>
                  <ListItemIcon>
                    {isAuthenticated && <DeleteIcon
                      color="secondary"
                      onClick={() => this.onDeleteClick(item._id)}
                    />}
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </List>
      </div>
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
)(withStyles(styles)(ShoppingList));

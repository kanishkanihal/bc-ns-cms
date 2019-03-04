import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { withStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const styles = theme => ({
  delete: {
    margin: theme.spacing.unit,
    color: "red"
  }
});

class DeleteCMSBlock extends Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleDelete = id => {
    this.props.deleteBlock(id);
    this.handleClose();
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <IconButton
          className={classes.delete}
          aria-label="Edit"
          onClick={this.handleClickOpen}
        >
          <DeleteIcon />
        </IconButton>
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Delete the CMS Block?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Do you realy want to delete the cms block?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={this.handleDelete.bind(this, this.props.blockCode)}
              color="primary"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

DeleteCMSBlock.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DeleteCMSBlock);

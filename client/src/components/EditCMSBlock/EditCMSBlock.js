import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Switch from "@material-ui/core/Switch";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CKEditor from "ckeditor4-react";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  }
});

class EditCMSBlock extends React.Component {
  state = {
    open: false,
    id: this.props.cmsBlock.id,
    code: this.props.cmsBlock.code,
    title: this.props.cmsBlock.title,
    content: this.props.cmsBlock.content,
    status: this.props.cmsBlock.status
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handelChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handelContentChange = e => {
    this.setState({
      content: e.editor.getData()
    });
  };

  handelStatusChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  editForm = e => {
    const { id, code, title, content, status } = this.state;
    const editedCMSBlock = {
      id,
      code,
      title,
      content,
      status
    };
    this.props.editCMSBlock(id, editedCMSBlock);
    this.handleClose();
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <IconButton
          className={classes.button}
          aria-label="Delete"
          onClick={this.handleClickOpen}
        >
          <EditIcon color="primary" />
        </IconButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add CMS Block</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To Add CMS Block, please enter relavent fields.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="code"
              name="code"
              value={this.state.code}
              label="code"
              type="text"
              onChange={this.handelChange}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="title"
              name="title"
              value={this.state.title}
              label="title"
              type="text"
              onChange={this.handelChange}
              fullWidth
            />
            <FormControlLabel
              label="status"
              control={
                <Switch
                  checked={this.state.status}
                  onChange={this.handelStatusChange("status")}
                  value="status"
                  color="primary"
                />
              }
            />

            <CKEditor
              data={this.state.content}
              onChange={this.handelContentChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.editForm} color="primary">
              Edit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

EditCMSBlock.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EditCMSBlock);

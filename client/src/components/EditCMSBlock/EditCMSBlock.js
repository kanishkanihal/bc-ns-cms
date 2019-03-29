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
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

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
    section_id: this.props.cmsBlock.section_id,
    page_id: this.props.cmsBlock.page_id,
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
    const {
      id,
      code,
      title,
      content,
      status,
      section_id,
      page_id
    } = this.state;
    const editedCMSBlock = {
      id,
      code,
      title,
      content,
      section_id,
      page_id,
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
            <InputLabel htmlFor="age-simple">Section</InputLabel>
            <Select
              native
              value={this.state.section_id}
              onChange={this.handelChange}
              inputProps={{
                name: "section_id",
                id: "section_id"
              }}
            >
              <option value={1}>Section 1</option>
              <option value={2}>Section 2</option>
              <option value={3}>Section 3</option>
              <option value={4}>Section 4</option>
              <option value={5}>Section 5</option>
            </Select>

            <InputLabel htmlFor="age-simple">Page</InputLabel>
            <Select
              native
              value={this.state.page_id}
              onChange={this.handelChange}
              inputProps={{
                name: "page_id",
                id: "page_id"
              }}
            >
              <option value={1}>All</option>
              <option value={2}>Checkout</option>
              <option value={3}>Store Pages</option>
              <option value={4}>Order confirmation</option>
            </Select>
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
              config={{
                allowedContent: true
              }}
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

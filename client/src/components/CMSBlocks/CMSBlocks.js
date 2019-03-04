import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import ActionButtons from "./ActionButtons";

const rows = [
  { id: "code", disablePadding: true, label: "Code" },
  { id: "title", disablePadding: false, label: "Title" },
  { id: "status", disablePadding: false, label: "Status" },
  { id: "actions", disablePadding: false, label: "Actions" }
];

class EnhancedTableHead extends React.Component {
  render() {
    return (
      <TableHead>
        <TableRow>
          {rows.map(
            row => (
              <TableCell
                key={row.id}
                align={row.numeric ? "right" : "center"}
                padding={row.disablePadding ? "none" : "default"}
              >
                {row.label}
              </TableCell>
            ),
            this
          )}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  rowCount: PropTypes.number.isRequired
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  spacer: {
    flex: "1 1 100%"
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: "0 0 auto"
  }
});

let EnhancedTableToolbar = props => {
  const { classes } = props;

  return (
    <Toolbar className={classNames(classes.root)}>
      <div className={classes.title}>
        <Typography variant="h6" id="tableTitle">
          CMS Blocks
        </Typography>
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 800
  },
  tableWrapper: {
    overflowX: "auto"
  },
  actionArea: {
    display: "flex",
    justifyContent: "center"
  }
});

class CMSBlocks extends React.Component {
  state = {
    page: 0,
    rowsPerPage: 5
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes, cmsBlocks } = this.props;
    const { rowsPerPage, page } = this.state;

    const emptyRows =
      rowsPerPage -
      Math.min(rowsPerPage, cmsBlocks.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead rowCount={cmsBlocks.length} />
            <TableBody>
              {cmsBlocks
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(cmsBlock => {
                  return (
                    <TableRow key={cmsBlock.code}>
                      <TableCell
                        align="center"
                        component="th"
                        scope="row"
                        padding="none"
                      >
                        {cmsBlock.code}
                      </TableCell>
                      <TableCell align="center">{cmsBlock.title}</TableCell>
                      <TableCell align="center">
                        {cmsBlock.status ? "Active" : "Inactive"}
                      </TableCell>
                      <TableCell align="center" className={classes.actionArea}>
                        <ActionButtons
                          cmsBlock={cmsBlock}
                          blockCode={cmsBlock.id}
                          deleteBlock={this.props.deleteBlock}
                          editCMSBlock={this.props.editCMSBlock}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={cmsBlocks.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page"
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page"
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

CMSBlocks.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CMSBlocks);

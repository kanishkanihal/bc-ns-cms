import React, { Fragment } from "react";
import DeleteCMSBlock from "../DeleteCMSBlock";
import EditCMSBlock from "../EditCMSBlock";

function ActionButtons(props) {
  return (
    <Fragment>
      <EditCMSBlock
        cmsBlock={props.cmsBlock}
        editCMSBlock={props.editCMSBlock}
      />
      <DeleteCMSBlock
        blockCode={props.blockCode}
        deleteBlock={props.deleteBlock}
      />
    </Fragment>
  );
}

export default ActionButtons;

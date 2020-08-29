import React, { useState } from "react";

import EditIcon from "@material-ui/icons/Edit";
import IconCancel from "@material-ui/icons/Cancel";
import DeleteIcon from "@material-ui/icons/Delete";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  IconButton,
  Tooltip,
} from "@material-ui/core";

import { Partner } from "./partnerTable";

import PartnerEditDialog, { PartnerEditFormValues } from "./partnerEditDialog";

interface CustomToolbarSelectProps {
  shouldEditButtonRender: boolean;
  editablePartner: Partner;
  setSelectedRows: (selectedRows: number[]) => void;
  handleUpdate: (values: PartnerEditFormValues) => void;
  handleDelete: (selectedRows: number[]) => void;
  selectedIds: number[];
}

export default function CustomToolbarSelect(props: CustomToolbarSelectProps) {
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  const [delDialogOpen, setDelDialogOpen] = useState<boolean>(false);

  const handleDelDialogOpen = () => {
    setDelDialogOpen(true);
  };

  const handleDelDialogClose = () => {
    setDelDialogOpen(false);
  };

  const handleEditDialogOpen = () => {
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
    props.setSelectedRows([]);
  };

  return (
    <div className="customToolbarButons">
      {props.shouldEditButtonRender && (
        <>
          <Tooltip title={"Edit"}>
            <IconButton
              className="editIcon"
              disableRipple
              onClick={handleEditDialogOpen}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>

          <PartnerEditDialog
            editDialogOpen={editDialogOpen}
            handleDialogClose={handleEditDialogClose}
            editablePartner={props.editablePartner}
            handleUpdate={props.handleUpdate}
          />
        </>
      )}

      <Tooltip title={"Delete"}>
        <IconButton
          className="deleteIcon"
          disableRipple
          onClick={handleDelDialogOpen}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>

      <Dialog open={delDialogOpen} onClose={handleDelDialogClose}>
        <DialogTitle>Are you sure you want to delete?</DialogTitle>
        <DialogActions className="delDialogActions">
          <Button
            startIcon={<IconCancel />}
            variant="outlined"
            onClick={handleDelDialogClose}
            className="delDialogButton cancelButton"
            disableTouchRipple
          >
            Cancel
          </Button>
          <Button
            startIcon={<DeleteIcon />}
            variant="outlined"
            className="delDialogButton confirmButton"
            disableTouchRipple
            onClick={() => {
              props.handleDelete(props.selectedIds);
              handleDelDialogClose();
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

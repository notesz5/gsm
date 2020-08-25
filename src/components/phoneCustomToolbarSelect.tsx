import React, { useState } from "react";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import IconCancel from "@material-ui/icons/Cancel";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";

import PhoneSellDialog from "./phoneSellDialog";
import PhoneEditDialog from "./phoneEditDialog";

import "../styles/table.scss";
import { PhoneData, Device } from "./phoneTable";
import { Partner } from "./partnerTable";
import { SellListFormValues } from "./phoneSellDialog";
import { PhoneEditFormValues } from "./phoneEditDialog";

interface CustomToolbarSelectProps {
  shouldSellButtonRender: boolean;
  shouldEditButtonRender: boolean;
  selectedPhoneData: PhoneData[];
  partners: Partner[];
  devices: Device[];
  handleDelete: (selectedRows: number[]) => void;
  handleSellPhones: (soldPhones: SellListFormValues[]) => void;
  setSelectedRows: (selectedRows: number[]) => void;
  selectedIds: number[];
  editablePhone: PhoneData;
  handleUpdate: (values: PhoneEditFormValues) => void;
}

export default function CustomToolbarSelect(props: CustomToolbarSelectProps) {
  const [delDialogOpen, setDelDialogOpen] = useState<boolean>(false);
  const [sellDialogOpen, setSellDialogOpen] = useState<boolean>(false);
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);

  const handleDelDialogOpen = () => {
    setDelDialogOpen(true);
  };

  const handleDelDialogClose = () => {
    setDelDialogOpen(false);
  };

  const handleSellDialogOpen = () => {
    setSellDialogOpen(true);
  };

  const handleSellDialogClose = () => {
    setSellDialogOpen(false);
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
          <PhoneEditDialog
            editDialogOpen={editDialogOpen}
            partners={props.partners}
            devices={props.devices}
            handleDialogClose={handleEditDialogClose}
            editablePhone={props.editablePhone}
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

      {props.shouldSellButtonRender && (
        <>
          <Button
            startIcon={<AttachMoneyIcon />}
            variant="contained"
            className="buyButton"
            onClick={handleSellDialogOpen}
          >
            Sell
          </Button>
          <PhoneSellDialog
            partners={props.partners}
            sellAblePhones={props.selectedPhoneData}
            sellDialogOpen={sellDialogOpen}
            handleDialogClose={handleSellDialogClose}
            setSelectedRows={props.setSelectedRows}
            handleSellPhones={props.handleSellPhones}
          />
        </>
      )}
    </div>
  );
}

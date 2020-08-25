import React, { useState } from "react";
import { Button } from "@material-ui/core";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import PhoneBuyDialog from "./phoneBuyDialog";
import "../styles/phoneBuyDialog.scss";
import { Device, PhoneData } from "./phoneTable";
import { Partner } from "./partnerTable";

interface CustomToolbarPorps {
  devices: Device[];
  partners: Partner[];
  handleAddNewPhones: (phone: PhoneData[]) => void;
}

export default function CustomToolbar(props: CustomToolbarPorps) {
  const [buyDialogOpen, setBuyDialogOpen] = useState<boolean>(false);

  const handleDialogOpen = () => {
    setBuyDialogOpen(true);
  };

  const handleDialogClose = () => {
    setBuyDialogOpen(false);
  };

  return (
    <>
      <Button
        startIcon={<AttachMoneyIcon />}
        variant="contained"
        className="buyButton"
        onClick={handleDialogOpen}
      >
        Buy
      </Button>

      <PhoneBuyDialog
        handleAddNewPhones={props.handleAddNewPhones}
        partners={props.partners}
        devices={props.devices}
        buyDialogOpen={buyDialogOpen}
        handleDialogClose={handleDialogClose}
      />
    </>
  );
}

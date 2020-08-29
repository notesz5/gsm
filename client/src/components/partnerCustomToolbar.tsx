import React, { useState } from "react";
import { Button } from "@material-ui/core";

import PartnerAddDialog from "./partnerAddDialog";

import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { Partner } from "./partnerTable";

interface CustomToolbarProps {
  handleAddNewPartners: (partners: Partner[])  => void;
}

export default function CustomToolbar(props: CustomToolbarProps) {
  const [addDialogOpen, setAddDialogOpen] = useState<boolean>(false);

  const handleDialogOpen = () => {
    setAddDialogOpen(true);
  };

  const handleDialogClose = () => {
    setAddDialogOpen(false);
  };

  return (
    <>
      <Button
        startIcon={<PersonAddIcon />}
        variant="contained"
        className="buyButton"
        onClick={handleDialogOpen}
      >
        add
      </Button>

      <PartnerAddDialog
        addDialogOpen={addDialogOpen}
        handleDialogClose={handleDialogClose}
        handleAddNewPartners={props.handleAddNewPartners}
      />
    </>
  );
}

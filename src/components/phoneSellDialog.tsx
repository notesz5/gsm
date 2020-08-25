import React, { useState, useEffect } from "react";
import {
  Dialog,
  Grid,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  IconButton,
  TextField as MUITextField,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import IconCancel from "@material-ui/icons/Cancel";
import DeleteIcon from "@material-ui/icons/Delete";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { Formik, Form, Field, FieldArray } from "formik";
import { TextField } from "formik-material-ui";
import NumberFormat from "react-number-format";
import * as yup from "yup";
import { PhoneData } from "./phoneTable";
import { Partner } from "./partnerTable";

import "../styles/phoneSellDialog.scss";

interface PhoneSellListProps {
  handleDialogClose: () => void;
  sellablePhones: PhoneData[];
  partners: Partner[];
  setSelectedRows: (selectedRows: number[]) => void;
  handleSellPhones: (soldPhones: SellListFormValues[]) => void;
}

export interface SellListFormValues {
  id: number;
  salePrice: number;
  soldTo: string;
  gsmPartner2Id: number;
}

interface postDataValues {
  id: number;
  salePrice: number;
  gsmPartner2Id: {
    id: number;
  };
  sold: boolean;
}

function PhoneSellList(props: PhoneSellListProps) {
  const [formValues, setFormValues] = useState<SellListFormValues[]>([]);
  const [partnerNames, setPartnerNames] = useState<string[]>([]);

  const [sellablePhones, setSellablePhones] = useState<PhoneData[]>(
    props.sellablePhones
  );

  const [invalidPartnerFields, setInvalidPartnerFields] = useState<number[]>(
    []
  );
  const [invalidSellPriceFields, setInvalidSellPriceFields] = useState<
    number[]
  >([]);

  const validationSchema = yup.object().shape({
    phones: yup.array().of(
      yup.object().shape({
        salePrice: yup.number().required().moreThan(0),
        soldTo: yup.string().required(),
      })
    ),
  });

  const postData = () => {
    const result: postDataValues[] = [];

    formValues.forEach((formValue) => {
      let pushable: postDataValues = {
        id: formValue.id,
        sold: true,
        salePrice: formValue.salePrice,
        gsmPartner2Id: { id: formValue.gsmPartner2Id },
      };
      result.push(pushable);
    });

    const sellUrl = process.env.REACT_APP_STORAGE_SELL_URL || "";

    fetch(sellUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result),
    }).catch((err) => {
      console.log(err);
    });
  };

  const populateBaseValues = () => {
    const baseValues: SellListFormValues[] = [];

    props.sellablePhones.forEach((phone) => {
      baseValues.push({
        id: phone.id,
        salePrice: 0,
        soldTo: "",
        gsmPartner2Id: 0,
      });
    });

    setFormValues(baseValues);
  };

  const validatePartnerField = (value: string, index: number) => {
    if (!value) {
      setInvalidPartnerFields([...invalidPartnerFields, index]);
    } else if (value && invalidPartnerFields.includes(index)) {
      setInvalidPartnerFields(
        invalidPartnerFields.filter(
          (invalidPartnerField) => invalidPartnerField !== index
        )
      );
    }
  };

  const validateSellPriceField = (value: number, index: number) => {
    if (!value || value === 0) {
      setInvalidSellPriceFields([...invalidSellPriceFields, index]);
    } else if (value && invalidSellPriceFields.includes(index)) {
      setInvalidSellPriceFields(
        invalidSellPriceFields.filter(
          (invalidSellPriceField) => invalidSellPriceField !== index
        )
      );
    }
  };

  const findPartnerIdByName = (name: string): number => {
    let partnerId = 0;

    props.partners.forEach((partner) => {
      partner.name === name && (partnerId = partner.id);
    });

    return partnerId;
  };

  const setPartnerAtIndex = (index: number, value: string) => {
    const updated = [...formValues];

    updated[index].soldTo = value;
    updated[index].gsmPartner2Id = findPartnerIdByName(value);

    setFormValues(updated);
  };
  const setSellPriceAtIndex = (index: number, value: number) => {
    const updated = [...formValues];

    updated[index].salePrice = value;

    setFormValues(updated);
  };

  const handleRemove = (id: number) => {
    setSellablePhones(sellablePhones.filter((phone) => phone.id !== id));
    setFormValues(formValues.filter((formValue) => formValue.id !== id));
  };

  useEffect(() => {
    populateBaseValues();
    setPartnerNames(
      props.partners.map((partner) => {
        return partner.name;
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (sellablePhones.length === 0) {
      props.handleDialogClose();
      props.setSelectedRows([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sellablePhones]);

  const nf = new Intl.NumberFormat("HU", {
    style: "currency",
    currency: "HUF",
    minimumFractionDigits: 0,
  });

  return (
    <Formik
      initialValues={{ phones: formValues }}
      onSubmit={(values) => {
        props.handleSellPhones(formValues);
        postData();
      }}
      validationSchema={validationSchema}
      validateOnBlur={true}
    >
      {({
        setFieldValue,
        isValid,
        isSubmitting,
        dirty,
        initialValues,
        values,
      }) => (
        <>
          <Form autoComplete="off" className="sellDialogList">
            <Grid container className="phoneSellListContainer">
              <Grid item xs={12}>
                <Paper variant="outlined" className="phoneSellListPaper">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Brand</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Buy Price</TableCell>
                        <TableCell>Partner</TableCell>
                        <TableCell>Sell Price</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <FieldArray
                        name="phones"
                        render={(ArrayHelpers) => (
                          <>
                            {sellablePhones.map((phone, index) => (
                              <TableRow
                                className="phoneSellListRow"
                                key={index}
                              >
                                <TableCell>{phone.brand}</TableCell>
                                <TableCell>{phone.type}</TableCell>
                                <TableCell>
                                  {nf.format(phone.buyPrice)}
                                </TableCell>
                                <TableCell>
                                  <Autocomplete
                                    options={partnerNames}
                                    autoComplete
                                    autoHighlight
                                    className={
                                      invalidPartnerFields.includes(index)
                                        ? "error"
                                        : ""
                                    }
                                    disableClearable
                                    onInputChange={(event, value) => {
                                      setFieldValue(
                                        `phones.${index}.soldTo`,
                                        value
                                      );
                                      validatePartnerField(value, index);
                                      setPartnerAtIndex(index, value);
                                    }}
                                    renderInput={(params) => (
                                      <Field
                                        component={TextField}
                                        {...params}
                                        name={`phones.${index}.soldTo`}
                                        variant="outlined"
                                      />
                                    )}
                                  ></Autocomplete>
                                </TableCell>
                                <TableCell>
                                  <Field name={`phones.${index}.salePrice`}>
                                    {(props) => (
                                      <>
                                        <NumberFormat
                                          thousandSeparator={" "}
                                          suffix=" Ft"
                                          decimalScale={0}
                                          customInput={MUITextField}
                                          fullWidth
                                          className={
                                            invalidSellPriceFields.includes(
                                              index
                                            )
                                              ? "error"
                                              : ""
                                          }
                                          variant="outlined"
                                          onValueChange={(val) => {
                                            setFieldValue(
                                              `phones.${index}.salePrice`,
                                              val.value
                                            );

                                            validateSellPriceField(
                                              parseInt(val.value),
                                              index
                                            );

                                            setSellPriceAtIndex(
                                              index,
                                              parseInt(val.value)
                                            );
                                          }}
                                        />
                                      </>
                                    )}
                                  </Field>
                                </TableCell>
                                <TableCell>
                                  <IconButton
                                    style={{ padding: "0px" }}
                                    className="deleteIcon"
                                    disableRipple
                                    onClick={() => {
                                      handleRemove(phone.id);
                                      ArrayHelpers.remove(index);
                                    }}
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            ))}
                          </>
                        )}
                      />
                    </TableBody>
                  </Table>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Button
                  startIcon={<IconCancel />}
                  variant="outlined"
                  onClick={() => props.handleDialogClose()}
                  className="phoneSellDialogCancelButton cancelButton"
                  disableRipple
                  fullWidth
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  startIcon={<AttachMoneyIcon />}
                  variant="contained"
                  type="submit"
                  onClick={() => props.handleDialogClose()}
                  className="phoneSellDialogSellButton buyButton"
                  disableRipple
                  fullWidth
                  disabled={
                    !dirty ||
                    !isValid ||
                    isSubmitting ||
                    values.phones.length < formValues.length
                  }
                >
                  Sell
                </Button>
              </Grid>
            </Grid>
          </Form>
        </>
      )}
    </Formik>
  );
}

interface PhoneSellDialogProps {
  sellDialogOpen: boolean;
  sellAblePhones: PhoneData[];
  partners: Partner[];
  handleDialogClose: () => void;
  setSelectedRows: (selectedRows: number[]) => void;
  handleSellPhones: (soldPhones: SellListFormValues[]) => void;
}

export default function PhoneSellDialog(props: PhoneSellDialogProps) {
  return (
    <Dialog
      open={props.sellDialogOpen}
      disableBackdropClick
      disableEscapeKeyDown={true}
      onClose={props.handleDialogClose}
      className="phoneSellDialog"
    >
      <PhoneSellList
        partners={props.partners}
        sellablePhones={props.sellAblePhones}
        handleDialogClose={props.handleDialogClose}
        setSelectedRows={props.setSelectedRows}
        handleSellPhones={props.handleSellPhones}
      />
    </Dialog>
  );
}

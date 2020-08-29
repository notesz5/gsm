import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  Grid,
  Typography,
  Paper,
  TextField as MUITextField,
} from "@material-ui/core";

import Autocomplete from "@material-ui/lab/Autocomplete";

import EditIcon from "@material-ui/icons/Edit";
import IconCancel from "@material-ui/icons/Cancel";

import { Formik, Field, Form } from "formik";
import { TextField, CheckboxWithLabel } from "formik-material-ui";
import * as yup from "yup";
import NumberFormat from "react-number-format";

import { Device, PhoneData } from "./phoneTable";
import { Partner } from "./partnerTable";

import "../styles/phoneEditDialog.scss";

interface PhoneEditFormProps {
  editablePhone: PhoneData;
  partners: string[];
  brands: string[];
  selectedBrand: string;
  typesByBrand: string[];
  handleSetSelectedBrand: (brand: string) => void;
  handleDialogClose: () => void;
  postData: (values: PhoneEditFormValues) => void;
}

export interface PhoneEditFormValues {
  id: number;
  buyPrice: number;
  sold: boolean;
  salePrice: number;
  gsmItemId: {
    id: number;
    imei: string;
    used: boolean;
    gsmDeviceId: {
      id: number;
      brand: string;
      type: string;
    };
  };
  gsmPartnerId: {
    id: number;
    name: string;
  };
  gsmPartner2Id: {
    id: number;
    name: string;
  };
}

function PhoneEditForm(props: PhoneEditFormProps) {
  const baseValues: PhoneEditFormValues = {
    id: props.editablePhone.id,
    buyPrice: props.editablePhone.buyPrice,
    sold: props.editablePhone.sold,
    salePrice: props.editablePhone.salePrice,
    gsmItemId: {
      id: props.editablePhone.gsmItemId,
      imei: props.editablePhone.imei,
      used: props.editablePhone.used,
      gsmDeviceId: {
        id: props.editablePhone.gsmDeviceId,
        brand: props.editablePhone.brand,
        type: props.editablePhone.type,
      },
    },
    gsmPartnerId: {
      id: props.editablePhone.gsmPartnerId,
      name: props.editablePhone.boughtFrom,
    },
    gsmPartner2Id: {
      id: props.editablePhone.gsmPartner2Id,
      name: props.editablePhone.soldTo,
    },
  };

  // eslint-disable-next-line
  const [initialValues, setInitialValues] = useState<PhoneEditFormValues>(
    baseValues
  );

  const validationSchema = yup.object().shape({
    buyPrice: yup
      .number()
      .required("Required field!")
      .moreThan(0, "Buy price must be bigger than 0!"),

    gsmItemId: yup.object().shape({
      imei: yup
        .string()
        .length(15, "Must be 15 characters long!")
        .required("Required field!"),
      gsmDeviceId: yup.object().shape({
        brand: yup.string().required("Required field!"),
        type: yup.string().required("Required field!"),
      }),
    }),

    gsmPartnerId: yup.object().shape({
      name: yup.string().required("Required field!"),
    }),
  });

  const validationSchemaSold = yup.object().shape({
    buyPrice: yup
      .number()
      .required("Required field!")
      .moreThan(0, "Buy price must be bigger than 0!"),

    salePrice: yup
      .number()
      .required("Required field!")
      .moreThan(0, "Buy price must be bigger than 0!"),

    gsmItemId: yup.object().shape({
      imei: yup
        .string()
        .length(15, "Must be 15 characters long!")
        .required("Required field!"),
      gsmDeviceId: yup.object().shape({
        brand: yup.string().required("Required field!"),
        type: yup.string().required("Required field!"),
      }),
    }),

    gsmPartnerId: yup.object().shape({
      name: yup.string().required("Required field!"),
    }),
    gsmPartner2Id: yup.object().shape({
      name: yup.string().required("Required field!"),
    }),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={
        props.editablePhone.sold ? validationSchemaSold : validationSchema
      }
      onSubmit={(values) => props.postData(values)}
    >
      {({
        setFieldValue,
        isValid,
        isSubmitting,
        setFieldTouched,
        touched,
        errors,
        dirty,
        values,
      }) => (
        <Form autoComplete="off" className="editDialogForm">
          <Grid container spacing={3}>
            <Paper className="titlePaper">
              <Typography className="title" variant="h4">
                Edit Phone
              </Typography>
            </Paper>
            <Grid item xs={6}>
              <Autocomplete
                id="gsmItemId.gsmDeviceId.brand"
                options={props.brands}
                disabled={isSubmitting}
                autoComplete
                autoHighlight
                autoSelect
                freeSolo
                className="inputField"
                clearOnEscape
                value={initialValues.gsmItemId.gsmDeviceId.brand}
                onInputChange={(event, value) => {
                  props.handleSetSelectedBrand(value);

                  setFieldValue(
                    "gsmItemId.gsmDeviceId.brand",
                    value ? value : ""
                  );

                  setFieldValue("gsmItemId.gsmDeviceId.type", "");

                  if (!value) {
                    props.handleSetSelectedBrand("");
                  }
                }}
                renderInput={(params) => (
                  <Field
                    component={TextField}
                    {...params}
                    name="gsmItemId.gsmDeviceId.brand"
                    label="Brand"
                    variant="outlined"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                id="gsmItemId.gsmDeviceId.type"
                options={props.typesByBrand}
                disabled={isSubmitting}
                autoComplete
                autoHighlight
                clearOnEscape
                freeSolo
                className="inputField"
                autoSelect
                value={
                  !props.selectedBrand ? "" : values.gsmItemId.gsmDeviceId.type
                }
                onInputChange={(event, value) => {
                  setFieldValue(
                    "gsmItemId.gsmDeviceId.type",
                    value ? value : ""
                  );
                }}
                renderInput={(params) => (
                  <Field
                    component={TextField}
                    {...params}
                    name="gsmItemId.gsmDeviceId.type"
                    label="Type"
                    variant="outlined"
                    fullWidth
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Field name="gsmItemId.imei">
                {(props) => (
                  <>
                    <NumberFormat
                      format="###############"
                      customInput={MUITextField}
                      disabled={isSubmitting}
                      fullWidth
                      value={props.field.value > 0 ? props.field.value : ""}
                      variant="outlined"
                      className={
                        touched.gsmItemId?.imei && errors.gsmItemId?.imei
                        ? "inputFieldError"
                        : "inputField"
                      }
                      label="IMEI"
                      onBlur={() => setFieldTouched("gsmItemId.imei", true)}
                      onValueChange={(val) =>
                        setFieldValue("gsmItemId.imei", val.value)
                      }
                    />
                    {touched.gsmItemId?.imei && errors.gsmItemId?.imei && (
                      <p className="errorText">{errors.gsmItemId.imei}</p>
                    )}
                  </>
                )}
              </Field>
            </Grid>

            <Grid item xs={12}>
              <Field
                name="gsmItemId.used"
                Label={{ label: "Used Device" }}
                component={CheckboxWithLabel}
                color="primary"
                className="buyDialogUsedCheckBox"
                type="checkbox"
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                id="gsmPartnerId.name"
                options={props.partners}
                autoComplete
                disabled={isSubmitting}
                autoHighlight
                autoSelect
                clearOnEscape
                className="inputField"
                defaultValue={initialValues.gsmPartnerId.name}
                onInputChange={(event, value) => {
                  setFieldValue("gsmPartnerId.name", value);
                }}
                renderInput={(params) => (
                  <Field
                    component={TextField}
                    {...params}
                    name="gsmPartnerId.name"
                    label={"Bought From"}
                    variant="outlined"
                    fullWidth
                  />
                )}
              />
            </Grid>
            {props.editablePhone.sold && (
              <Grid item xs={6}>
                <Autocomplete
                  id="gsmPartner2Id.name"
                  options={props.partners}
                  autoComplete
                  disabled={isSubmitting}
                  autoHighlight
                  autoSelect
                  clearOnEscape
                  className="inputField"
                  defaultValue={initialValues.gsmPartner2Id.name}
                  onInputChange={(event, value) => {
                    setFieldValue("gsmPartner2Id.name", value);
                  }}
                  renderInput={(params) => (
                    <Field
                      component={TextField}
                      {...params}
                      name="gsmPartner2Id.name"
                      label={"Sold To"}
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
              </Grid>
            )}

            <Grid item xs={6}>
              <Field name="buyPrice">
                {(props) => (
                  <>
                    <NumberFormat
                      thousandSeparator={" "}
                      suffix=" Ft"
                      decimalScale={0}
                      disabled={isSubmitting}
                      customInput={MUITextField}
                      fullWidth
                      value={props.field.value > 0 ? props.field.value : ""}
                      variant="outlined"
                      className={
                        touched.buyPrice && errors.buyPrice
                          ? "inputFieldError"
                          : "inputField"
                      }
                      label="Buy Price"
                      onBlur={() => setFieldTouched("buyPrice", true)}
                      onValueChange={(val) =>
                        setFieldValue("buyPrice", val.floatValue)
                      }
                    />
                    {touched.buyPrice && errors.buyPrice && (
                      <p className="errorText">{errors.buyPrice}</p>
                    )}
                  </>
                )}
              </Field>
            </Grid>
            {props.editablePhone.sold && (
              <Grid item xs={6}>
                <Field name="salePrice">
                  {(props) => (
                    <>
                      <NumberFormat
                        thousandSeparator={" "}
                        suffix=" Ft"
                        decimalScale={0}
                        disabled={isSubmitting}
                        customInput={MUITextField}
                        fullWidth
                        value={props.field.value > 0 ? props.field.value : ""}
                        variant="outlined"
                        className={
                          touched.salePrice && errors.salePrice
                          ? "inputFieldError"
                          : "inputField"
                        }
                        label="Sale Price"
                        onBlur={() => setFieldTouched("salePrice", true)}
                        onValueChange={(val) =>
                          setFieldValue("salePrice", val.floatValue)
                        }
                      />
                      {touched.salePrice && errors.salePrice && (
                        <p className="errorText">{errors.salePrice}</p>
                      )}
                    </>
                  )}
                </Field>
              </Grid>
            )}

            <Grid item xs={6} className="cancelButtonGridItem">
              <Button
                startIcon={<IconCancel />}
                className="phoneBuyDialogCancelButton"
                fullWidth
                disableRipple
                variant="outlined"
                onClick={() => {
                  props.handleDialogClose();
                }}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs={6} sm={6} className="submitButtonGridItem">
              <Button
                startIcon={<EditIcon />}
                className="buyDialogFormSubmit"
                fullWidth
                disableRipple
                variant="contained"
                type="submit"
                disabled={!isValid || isSubmitting || !dirty}
              >
                Edit
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

interface PhoneEditDialogProps {
  editDialogOpen: boolean;
  handleDialogClose: () => void;
  devices: Device[];
  partners: Partner[];
  editablePhone: PhoneData;
  handleUpdate: (values: PhoneEditFormValues) => void;
}

export default function PhoneEditDialog(props: PhoneEditDialogProps) {
  const [partners, setPartners] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [typesByBrand, setTypesByBrand] = useState<string[]>([]);

  const handleSetSelectedBrand = (brand: string) => {
    setSelectedBrand(brand);
  };

  const getPartners = () => {
    const result: string[] = [];

    props.partners.forEach((partner) => {
      if (!result.includes(partner.name)) {
        result.push(partner.name);
      }
    });
    setPartners(result);
  };

  const getBrands = () => {
    const result: string[] = [];

    props.devices.forEach((device) => {
      if (!result.includes(device.brand)) {
        result.push(device.brand);
      }
    });
    setBrands(result);
  };

  const getTypesByBrand = (brand: string) => {
    if (brand) {
      const result: string[] = [];
      props.devices.forEach((device) => {
        if (
          !result.includes(device.type.toLowerCase()) &&
          device.brand.toLowerCase() === brand.toLowerCase()
        ) {
          result.push(device.type);
        }
      });
      setTypesByBrand(result);
    } else {
      setTypesByBrand([]);
    }
  };

  const findDeviceIdByBrandAndType = (brand: string, type: string): number => {
    let deviceId = 0;

    props.devices.forEach((device) => {
      if (device.brand === brand && device.type === type) {
        deviceId = device.id;
      }
    });

    return deviceId;
  };

  const findPartnerIdByName = (name: string): number => {
    let partnerId = 0;

    props.partners.forEach((partner) => {
      if (partner.name === name) {
        partnerId = partner.id;
      }
    });

    return partnerId;
  };

  const postData = (values: PhoneEditFormValues) => {
    let postable: PhoneEditFormValues = { ...values };

    postable.gsmItemId.gsmDeviceId.id = findDeviceIdByBrandAndType(
      values.gsmItemId.gsmDeviceId.brand,
      values.gsmItemId.gsmDeviceId.type
    );
    postable.gsmPartnerId.id = findPartnerIdByName(values.gsmPartnerId.name);

    if (postable.sold) {
      postable.gsmPartner2Id.id = findPartnerIdByName(
        values.gsmPartner2Id.name
      );
    }

    props.handleUpdate(postable);

    const updateUrl = process.env.REACT_APP_STORAGE_UPDATE_URL || "";

    fetch(updateUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(postable),
    }).catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => {
    if (props.editDialogOpen) {
      getBrands();
      getPartners();
      handleSetSelectedBrand(props.editablePhone.brand);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.editDialogOpen]);

  useEffect(() => {
    getTypesByBrand(selectedBrand);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBrand]);

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      open={props.editDialogOpen}
      className="phoneEditDialog"
    >
      <PhoneEditForm
        partners={partners}
        editablePhone={props.editablePhone}
        brands={brands}
        selectedBrand={selectedBrand}
        handleSetSelectedBrand={handleSetSelectedBrand}
        typesByBrand={typesByBrand}
        handleDialogClose={props.handleDialogClose}
        postData={postData}
      />
    </Dialog>
  );
}

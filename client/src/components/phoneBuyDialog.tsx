import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  Grid,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  Tooltip,
  TextField as MUITextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Fab,
} from "@material-ui/core";

import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import IconCancel from "@material-ui/icons/Cancel";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import EditIcon from "@material-ui/icons/Edit";

import Autocomplete from "@material-ui/lab/Autocomplete";

import { TextField, CheckboxWithLabel } from "formik-material-ui";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import NumberFormat from "react-number-format";

import { Device, PhoneData, createPhoneData } from "./phoneTable";
import { Partner } from "./partnerTable";
import "../styles/phoneBuyDialog.scss";

interface FormValues {
  index: number;
  buyPrice: number;
  sold: boolean;
  gsmItemId: {
    imei: string;
    used: boolean;
    gsmDeviceId: {
      id?: number;
      brand: string;
      type: string;
    };
  };
  gsmPartnerId: {
    id?: number;
    name: string;
    email: string;
    phone: string;
    postalCode: string;
    city: string;
    street: string;
    streetNumber: string;
  };
}

interface PhoneBuyListProps {
  handleDialogClose: () => void;
  addablePhones: FormValues[];
  setFormVisible: () => void;
  removeAddablePhone: (removable: FormValues) => void;
  resetAddablePhones: () => void;
  setEditFormVisible: (editable: FormValues) => void;
  postData: (addedPhones: FormValues[]) => void;
}

function PhoneBuyList(props: PhoneBuyListProps) {
  const nf = new Intl.NumberFormat("HU", {
    style: "currency",
    currency: "HUF",
    minimumFractionDigits: 0,
  });

  return (
    <Grid container className="phoneBuyListContainer">
      <Grid item xs={12}>
        <Paper variant="outlined" className="phoneBuyListPaper">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Partner</TableCell>
                <TableCell>Price</TableCell>
                <TableCell />
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {props.addablePhones.map((phone, index) => (
                <TableRow className="phoneBuyListRow" key={index}>
                  <TableCell>{phone.gsmItemId.gsmDeviceId.brand}</TableCell>
                  <TableCell>{phone.gsmItemId.gsmDeviceId.type}</TableCell>
                  <TableCell>{phone.gsmPartnerId.name}</TableCell>
                  <TableCell>{nf.format(phone.buyPrice)}</TableCell>
                  <TableCell>
                    <IconButton
                      style={{ padding: "0px" }}
                      disableRipple
                      onClick={() => props.setEditFormVisible(phone)}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      style={{ padding: "0px" }}
                      className="deleteIcon"
                      disableRipple
                      onClick={() => props.removeAddablePhone(phone)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="addFabContainer">
            <Tooltip arrow title="Add" placement="left">
              <Fab className="addFab" onClick={props.setFormVisible}>
                <AddIcon />
              </Fab>
            </Tooltip>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Button
          startIcon={<IconCancel />}
          variant="outlined"
          onClick={() => {
            props.handleDialogClose();
            props.resetAddablePhones();
          }}
          className="phoneBuyDialogCancelButton cancelButton"
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
          onClick={() => {
            props.handleDialogClose();
            props.postData(props.addablePhones);
          }}
          className="phoneBuyDialogBuyButton buyButton"
          disableRipple
          fullWidth
          disabled={props.addablePhones.length > 0 ? false : true}
        >
          Buy
        </Button>
      </Grid>
    </Grid>
  );
}

interface PhoneBuyFormProps {
  onSubmit: (values: FormValues) => void;
  selectedBrand: string;
  handleSetSelectedBrand: (brand: string) => void;
  toggleRenderPartnerFields: () => void;
  renderPartnerFields: boolean;
  partners: string[];
  brands: string[];
  typesByBrand: string[];
  setFormInvisible: () => void;
  editableFormValues: FormValues;
  setEditFormInvisible: () => void;
  editAddablePhone: (edited: FormValues) => void;
}

function PhoneBuyForm(props: PhoneBuyFormProps) {
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);

  const baseValues: FormValues = {
    index: 0,
    buyPrice: 0,
    sold: false,
    gsmItemId: {
      imei: "",
      used: false,
      gsmDeviceId: {
        id: 0,
        brand: "",
        type: "",
      },
    },
    gsmPartnerId: {
      id: 0,
      name: "",
      email: "",
      phone: "",
      postalCode: "",
      city: "",
      street: "",
      streetNumber: "",
    },
  };

  const [initialValues, setInitialValues] = useState<FormValues>(baseValues);

  const handleTooltipClose = () => {
    setTooltipOpen(false);
  };

  const handleTooltipOpen = () => {
    setTooltipOpen(true);
  };

  const handleBrandChange = (brand: string) => {
    props.handleSetSelectedBrand(brand);
  };

  const phoneRegExp = /^(\+?\d{0,6})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
  const notContainsNumber = /^([^0-9]*)$/;

  const validationSchemaWithPartners = yup.object().shape({
    buyPrice: yup
      .number()
      .required("Required field!")
      .moreThan(0, "Buy price must be bigger than 0!"),

    gsmItemId: yup.object().shape({
      imei: yup
        .string()
        .required("Required field!")
        .length(15, "Must be 15 characters long!"),
      gsmDeviceId: yup.object().shape({
        brand: yup.string().required("Required field!"),
        type: yup.string().required("Required field!"),
      }),
    }),

    gsmPartnerId: yup.object().shape({
      name: yup.string().required("Required field!"),
      email: yup.string().email("Not valid email!").required("Required field!"),
      phone: yup
        .string()
        .matches(phoneRegExp, "Not valid phone number!")
        .required("Required field!"),
      postalCode: yup
        .string()
        .length(4, "Must be 4 characters long!")
        .required("Required field"),
      city: yup
        .string()
        .matches(notContainsNumber, "Numbers not allowed!")
        .required("Required field!"),
      street: yup.string().required("Required field!"),
      streetNumber: yup.string().required("Required field!"),
    }),
  });

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

  useEffect(() => {
    setInitialValues(props.editableFormValues);
  }, [props.editableFormValues]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={
        props.renderPartnerFields
          ? validationSchemaWithPartners
          : validationSchema
      }
      onSubmit={
        props.editableFormValues.buyPrice
          ? props.editAddablePhone
          : props.onSubmit
      }
      enableReinitialize
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
        <Form autoComplete="off" className="buyDialogForm">
          <Grid container spacing={3}>
            <Paper className="titlePaper">
              <Typography className="title" variant="h4">
                Phone
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
                clearOnEscape
                freeSolo
                className="inputField"
                value={initialValues.gsmItemId.gsmDeviceId.brand}
                onInputChange={(event, value) => {
                  handleBrandChange(value);

                  setFieldValue(
                    "gsmItemId.gsmDeviceId.brand",
                    value ? value : ""
                  );

                  setFieldValue("gsmItemId.gsmDeviceId.type", "");

                  if (!value) {
                    handleBrandChange("");
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
                className="inputField"
                autoComplete
                autoHighlight
                clearOnEscape
                autoSelect
                freeSolo
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
            <Grid item xs={12} sm={6}>
              <Field name="gsmItemId.imei">
                {(props) => (
                  <>
                    <NumberFormat
                      format="###############"
                      customInput={MUITextField}
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

            <Grid item xs={12} sm={6}>
              <Field name="buyPrice">
                {(props) => (
                  <>
                    <NumberFormat
                      thousandSeparator={" "}
                      suffix=" Ft"
                      decimalScale={0}
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
            <Grid item xs={12} sm={12}>
              <Field
                name="gsmItemId.used"
                Label={{ label: "Used Device" }}
                component={CheckboxWithLabel}
                color="primary"
                className="buyDialogUsedCheckBox"
                type="checkbox"
              />
            </Grid>
            <Paper className="titlePaper">
              <Typography className="title" variant="h4">
                {props.renderPartnerFields ? "New Partner" : "Current Partner"}
              </Typography>
            </Paper>
            <Grid item xs={12} sm={12}>
              {props.renderPartnerFields ? (
                <Field
                  name="gsmPartnerId.name"
                  label={
                    props.renderPartnerFields
                      ? "Partner Name"
                      : "Search Partner..."
                  }
                  component={TextField}
                  className="inputField"
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={() => {
                            props.toggleRenderPartnerFields();
                            handleTooltipClose();
                          }}
                          onMouseEnter={handleTooltipOpen}
                          onMouseLeave={handleTooltipClose}
                          className="partnerFieldSwitchIcon"
                        >
                          <Tooltip
                            open={tooltipOpen}
                            onClose={handleTooltipClose}
                            arrow
                            disableFocusListener
                            disableHoverListener
                            disableTouchListener
                            placement="left"
                            title="Current Partner"
                          >
                            <ArrowBackIcon />
                          </Tooltip>
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              ) : (
                <Autocomplete
                  id="gsmPartnerId.name"
                  options={props.partners}
                  autoComplete
                  autoHighlight
                  autoSelect
                  clearOnEscape
                  freeSolo
                  className="inputField"
                  value={initialValues.gsmPartnerId.name}
                  onInputChange={(event, value) => {
                    setFieldValue("gsmPartnerId.name", value);
                  }}
                  renderInput={(params) => (
                    <Field
                      component={TextField}
                      {...params}
                      name="gsmPartnerId.name"
                      label={
                        props.renderPartnerFields
                          ? "Partner Name"
                          : "Search Partner..."
                      }
                      variant="outlined"
                      fullWidth
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              edge="end"
                              disabled={isSubmitting}
                              onClick={() => {
                                props.toggleRenderPartnerFields();
                                handleTooltipClose();
                                setFieldValue("gsmPartnerId.name", "");
                              }}
                              onMouseEnter={handleTooltipOpen}
                              onMouseLeave={handleTooltipClose}
                              className="partnerFieldSwitchIcon"
                            >
                              <Tooltip
                                open={tooltipOpen}
                                onClose={handleTooltipClose}
                                arrow
                                disableFocusListener
                                disableHoverListener
                                disableTouchListener
                                placement="left"
                                title="New Partner"
                              >
                                <PersonAddIcon />
                              </Tooltip>
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              )}
            </Grid>

            {props.renderPartnerFields && (
              <>
                <Grid item xs={12} sm={6}>
                  <Field
                    name="gsmPartnerId.email"
                    label="Email Address"
                    component={TextField}
                    fullWidth
                    variant="outlined"
                    className="inputField"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field name="gsmPartnerId.phone">
                    {(props) => (
                      <>
                        <NumberFormat
                          format="+## ## ### ####"
                          customInput={MUITextField}
                          fullWidth
                          variant="outlined"
                          value={
                            props.field.value !== "" ? props.field.value : ""
                          }
                          className={
                            touched.gsmPartnerId?.phone &&
                            errors.gsmPartnerId?.phone
                            ? "inputFieldError"
                            : "inputField"
                          }
                          label="Phone Number"
                          onBlur={() =>
                            setFieldTouched("gsmPartnerId.phone", true)
                          }
                          onValueChange={(val) =>
                            setFieldValue("gsmPartnerId.phone", val.value)
                          }
                        />
                        {touched.gsmPartnerId?.phone &&
                          errors.gsmPartnerId?.phone && (
                            <p className="errorText">
                              {errors.gsmPartnerId.phone}
                            </p>
                          )}
                      </>
                    )}
                  </Field>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Field name="gsmPartnerId.postalCode">
                    {(props) => (
                      <>
                        <NumberFormat
                          format="####"
                          customInput={MUITextField}
                          fullWidth
                          variant="outlined"
                          value={
                            props.field.value !== "" ? props.field.value : ""
                          }
                          className={
                            touched.gsmPartnerId?.postalCode &&
                            errors.gsmPartnerId?.postalCode
                            ? "inputFieldError"
                            : "inputField"
                          }
                          label="Postal Code"
                          onBlur={() =>
                            setFieldTouched("gsmPartnerId.postalCode", true)
                          }
                          onValueChange={(val) =>
                            setFieldValue("gsmPartnerId.postalCode", val.value)
                          }
                        />
                        {touched.gsmPartnerId?.postalCode &&
                          errors.gsmPartnerId?.postalCode && (
                            <p className="errorText">
                              {errors.gsmPartnerId.postalCode}
                            </p>
                          )}
                      </>
                    )}
                  </Field>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Field
                    name="gsmPartnerId.city"
                    label="City"
                    component={TextField}
                    fullWidth
                    variant="outlined"
                    className="inputField"
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Field
                    name="gsmPartnerId.street"
                    label="Street"
                    component={TextField}
                    fullWidth
                    variant="outlined"
                    className="inputField"
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Field name="gsmPartnerId.streetNumber">
                    {(props) => (
                      <>
                        <NumberFormat
                          format="####"
                          customInput={MUITextField}
                          fullWidth
                          variant="outlined"
                          value={
                            props.field.value !== "" ? props.field.value : ""
                          }
                          className={
                            touched.gsmPartnerId?.streetNumber &&
                            errors.gsmPartnerId?.streetNumber
                            ? "inputFieldError"
                            : "inputField"
                          }
                          label="Street Number"
                          onBlur={() =>
                            setFieldTouched("gsmPartnerId.streetNumber", true)
                          }
                          onValueChange={(val) =>
                            setFieldValue(
                              "gsmPartnerId.streetNumber",
                              val.value
                            )
                          }
                        />
                        {touched.gsmPartnerId?.streetNumber &&
                          errors.gsmPartnerId?.streetNumber && (
                            <p className="errorText">
                              {errors.gsmPartnerId.streetNumber}
                            </p>
                          )}
                      </>
                    )}
                  </Field>
                </Grid>
              </>
            )}

            <Grid item xs={6} sm={6} className="cancelButtonGridItem">
              <Button
                startIcon={<IconCancel />}
                className="phoneBuyDialogCancelButton"
                fullWidth
                disableRipple
                variant="outlined"
                onClick={
                  props.editableFormValues.buyPrice > 0
                    ? props.setEditFormInvisible
                    : props.setFormInvisible
                }
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs={6} sm={6} className="submitButtonGridItem">
              <Button
                startIcon={
                  props.editableFormValues.buyPrice > 0 ? (
                    <EditIcon />
                  ) : (
                    <SaveAltIcon />
                  )
                }
                className="buyDialogFormSubmit"
                fullWidth
                disableRipple
                variant="contained"
                type="submit"
                disabled={!isValid || isSubmitting || !dirty}
              >
                {props.editableFormValues.buyPrice > 0 ? "Edit" : "Save"}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

interface PhoneBuyDialogProps {
  buyDialogOpen: boolean;
  handleDialogClose: () => void;
  devices: Device[];
  partners: Partner[];
  handleAddNewPhones: (phones: PhoneData[]) => void;
}

export default function PhoneBuyDialog(props: PhoneBuyDialogProps) {
  const [partners, setPartners] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [typesByBrand, setTypesByBrand] = useState<string[]>([]);
  const [addablePhones, setAddablePhones] = useState<FormValues[]>([]);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [renderPartnerFields, setRenderPartnerFields] = useState<boolean>(
    false
  );

  const initialFormValues: FormValues = {
    index: 0,
    buyPrice: 0,
    sold: false,
    gsmItemId: {
      imei: "",
      used: false,
      gsmDeviceId: {
        id: 0,
        brand: "",
        type: "",
      },
    },
    gsmPartnerId: {
      id: 0,
      name: "",
      email: "",
      phone: "",
      postalCode: "",
      city: "",
      street: "",
      streetNumber: "",
    },
  };

  const [editablePhone, setEditablePhone] = useState<FormValues>(
    initialFormValues
  );

  const toggleRenderPartnerFields = () => {
    setRenderPartnerFields(!renderPartnerFields);
  };

  const findPartnerNameById = (id: number): string => {
    let found;

    props.partners.forEach((partner) => {
      if (partner.id === id) {
        found = partner;
      }
    });
    return found.name;
  };

  const findDeviceBrandById = (id: number): string => {
    let found;

    props.devices.forEach((device) => {
      if (device.id === id) {
        found = device;
      }
    });
    return found.brand;
  };

  const findDeviceTypeById = (id: number): string => {
    let found;

    props.devices.forEach((device) => {
      if (device.id === id) {
        found = device;
      }
    });
    return found.type;
  };

  const postData = (addedPhones: FormValues[]) => {
    const buyUrl = process.env.REACT_APP_STORAGE_BUY_URL || "";
    const postData: FormValues[] = JSON.parse(JSON.stringify(addedPhones));

    addedPhones.forEach((addedPhone, index) => {
      let deviceId: number = 0;
      let partnerId: number = 0;

      props.devices.forEach((device) => {
        addedPhone.gsmItemId.gsmDeviceId.brand.valueOf() ===
          device.brand.valueOf() &&
          addedPhone.gsmItemId.gsmDeviceId.type.valueOf() ===
            device.type.valueOf() &&
          (deviceId = device.id);
      });

      props.partners.forEach((partner) => {
        addedPhone.gsmPartnerId.name.valueOf() === partner.name.valueOf() &&
          (partnerId = partner.id);
      });

      if (deviceId > 0) {
        postData[index].gsmItemId.gsmDeviceId.id = deviceId;
        delete postData[index].gsmItemId.gsmDeviceId.brand;
        delete postData[index].gsmItemId.gsmDeviceId.type;
      } else {
        delete postData[index].gsmItemId.gsmDeviceId.id;
      }

      if (partnerId > 0) {
        postData[index].gsmPartnerId.id = partnerId;
        delete postData[index].gsmPartnerId.name;
        delete postData[index].gsmPartnerId.email;
        delete postData[index].gsmPartnerId.phone;
        delete postData[index].gsmPartnerId.postalCode;
        delete postData[index].gsmPartnerId.city;
        delete postData[index].gsmPartnerId.street;
        delete postData[index].gsmPartnerId.streetNumber;
      } else {
        delete postData[index].gsmPartnerId.id;
      }
    });

    fetch(buyUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(postData),
    })
      .then((res) => res.json())
      .then((res) => {
        const newPhones: PhoneData[] = [];

        res.forEach((addedPhoneRes) => {
          const newPhoneData: PhoneData = createPhoneData(
            addedPhoneRes.id,
            addedPhoneRes.gsmItemId.id,
            addedPhoneRes.gsmItemId.imei,
            addedPhoneRes.gsmItemId.gsmDeviceId.id,
            findDeviceBrandById(addedPhoneRes.gsmItemId.gsmDeviceId.id),
            findDeviceTypeById(addedPhoneRes.gsmItemId.gsmDeviceId.id),
            addedPhoneRes.gsmPartnerId.id,
            findPartnerNameById(addedPhoneRes.gsmPartnerId.id),
            addedPhoneRes.buyPrice,
            0,
            "",
            0,
            addedPhoneRes.gsmItemId.used,
            false
          );

          newPhones.push(newPhoneData);
        });
        props.handleAddNewPhones(newPhones);
        resetAddablePhones();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const populateAddablePhones = (values: FormValues) => {
    setAddablePhones([
      ...addablePhones,
      { ...values, index: addablePhones.length },
    ]);
    setFormInvisible();
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

  const handleSetSelectedBrand = (brand: string) => {
    setSelectedBrand(brand);
  };

  const setFormVisible = () => {
    setIsFormVisible(true);
  };

  const setFormInvisible = () => {
    setIsFormVisible(false);
  };

  const removeAddablePhone = (removable: FormValues) => {
    setAddablePhones(
      addablePhones.filter((phone, index) => index !== removable.index)
    );
  };

  const resetAddablePhones = () => {
    setAddablePhones([]);
  };

  const editAddablePhone = (edited: FormValues) => {
    setAddablePhones(
      addablePhones.map((phone, index) =>
        index === edited.index
          ? {
              ...phone,
              buyPrice: edited.buyPrice,
              sold: false,
              gsmItemId: edited.gsmItemId,
              gsmPartnerId: edited.gsmPartnerId,
            }
          : phone
      )
    );
    setEditFormInVisible();
  };

  const setEditFormVisible = (editable: FormValues) => {
    setIsFormVisible(true);
    setEditablePhone(editable);
  };

  const setEditFormInVisible = () => {
    setIsFormVisible(false);
    setEditablePhone(initialFormValues);
  };

  useEffect(() => {
    if (isFormVisible) {
      getBrands();
      getPartners();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFormVisible]);

  useEffect(() => {
    getTypesByBrand(selectedBrand);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBrand]);

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      open={props.buyDialogOpen}
      className="phoneBuyDialog"
    >
      {!isFormVisible ? (
        <PhoneBuyList
          handleDialogClose={props.handleDialogClose}
          addablePhones={addablePhones}
          setFormVisible={setFormVisible}
          removeAddablePhone={removeAddablePhone}
          resetAddablePhones={resetAddablePhones}
          setEditFormVisible={setEditFormVisible}
          postData={postData}
        />
      ) : (
        <PhoneBuyForm
          partners={partners}
          brands={brands}
          selectedBrand={selectedBrand}
          handleSetSelectedBrand={handleSetSelectedBrand}
          typesByBrand={typesByBrand}
          onSubmit={populateAddablePhones}
          renderPartnerFields={renderPartnerFields}
          toggleRenderPartnerFields={toggleRenderPartnerFields}
          setFormInvisible={setFormInvisible}
          setEditFormInvisible={setEditFormInVisible}
          editableFormValues={editablePhone}
          editAddablePhone={editAddablePhone}
        />
      )}
    </Dialog>
  );
}

import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  Grid,
  Typography,
  Paper,
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

import * as yup from "yup";

import { Formik, Field, Form } from "formik";
import { TextField } from "formik-material-ui";

import NumberFormat from "react-number-format";

import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import IconCancel from "@material-ui/icons/Cancel";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import SaveAltIcon from "@material-ui/icons/SaveAlt";

import "../styles/partnerAddDialog.scss";
import { Partner } from "./partnerTable";

interface FormValues {
  index: number;
  name: string;
  email: string;
  phone: string;
  postalCode: string;
  city: string;
  street: string;
  streetNumber: string;
}

interface PartnerAddListProps {
  handleDialogClose: () => void;
  addablePartners: FormValues[];
  setFormVisible: () => void;
  removeAddablePartner: (removable: FormValues) => void;
  resetAddablePartners: () => void;
  setEditFormVisible: (editable: FormValues) => void;
  postData: (addedPartners: FormValues[]) => void;
}

function PartnerAddList(props: PartnerAddListProps) {
  return (
    <Grid container className="phoneBuyListContainer">
      <Grid item xs={12}>
        <Paper variant="outlined" className="phoneBuyListPaper">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>City</TableCell>
                <TableCell />
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {props.addablePartners.map((partner, index) => (
                <TableRow className="phoneBuyListRow" key={index}>
                  <TableCell>{partner.name}</TableCell>
                  <TableCell>{partner.email}</TableCell>
                  <TableCell>{partner.phone}</TableCell>
                  <TableCell>{partner.city}</TableCell>
                  <TableCell>
                    <IconButton
                      style={{ padding: "0px" }}
                      disableRipple
                      onClick={() => props.setEditFormVisible(partner)}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      style={{ padding: "0px" }}
                      className="deleteIcon"
                      disableRipple
                      onClick={() => props.removeAddablePartner(partner)}
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
            props.resetAddablePartners();
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
          startIcon={<PersonAddIcon />}
          variant="contained"
          onClick={() => {
            props.handleDialogClose();
            props.postData(props.addablePartners);
          }}
          className="phoneBuyDialogBuyButton buyButton"
          disableRipple
          fullWidth
          disabled={props.addablePartners.length > 0 ? false : true}
        >
          Add
        </Button>
      </Grid>
    </Grid>
  );
}

interface PartnerAddFormProps {
  setFormInvisible: () => void;
  setEditFormInvisible: () => void;
  editAddablePartner: (edited: FormValues) => void;
  onSubmit: (values: FormValues) => void;
  editableFormValues: FormValues;
}

function PartnerAddForm(props: PartnerAddFormProps) {
  const baseValues: FormValues = {
    index: 0,
    name: "",
    email: "",
    phone: "",
    postalCode: "",
    city: "",
    street: "",
    streetNumber: "",
  };

  const [initialValues, setInitialValues] = useState<FormValues>(baseValues);

  const phoneRegExp = /^(\+?\d{0,6})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
  const notContainsNumber = /^([^0-9]*)$/;

  const validationSchema = yup.object().shape({
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
  });

  useEffect(() => {
    setInitialValues(props.editableFormValues);
  }, [props.editableFormValues]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={
        props.editableFormValues.name
          ? props.editAddablePartner
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
      }) => (
        <Form autoComplete="off" className="addDialogForm">
          <Grid container spacing={3}>
            <Paper className="titlePaper">
              <Typography className="title" variant="h4">
                Add Partner
              </Typography>
            </Paper>

            <Grid item xs={12}>
              <Field
                name="name"
                label={"Partner Name"}
                component={TextField}
                fullWidth
                variant="outlined"
                className="partnerNameField"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Field
                name="email"
                label="Email Address"
                component={TextField}
                fullWidth
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Field name="phone">
                {(props) => (
                  <>
                    <NumberFormat
                      format="+## ## ### ####"
                      customInput={MUITextField}
                      fullWidth
                      variant="outlined"
                      value={props.field.value !== "" ? props.field.value : ""}
                      className={
                        touched.phone && errors.phone
                          ? "numberFormat error"
                          : ""
                      }
                      label="Phone Number"
                      onBlur={() => setFieldTouched("phone", true)}
                      onValueChange={(val) => setFieldValue("phone", val.value)}
                    />
                    {touched.phone && errors.phone && (
                      <p className="errorText">{errors.phone}</p>
                    )}
                  </>
                )}
              </Field>
            </Grid>

            <Grid item xs={6} sm={3}>
              <Field name="postalCode">
                {(props) => (
                  <>
                    <NumberFormat
                      format="####"
                      customInput={MUITextField}
                      fullWidth
                      variant="outlined"
                      value={props.field.value !== "" ? props.field.value : ""}
                      className={
                        touched.postalCode && errors.postalCode
                          ? "numberFormat error"
                          : ""
                      }
                      label="Zip Code"
                      onBlur={() => setFieldTouched("postalCode", true)}
                      onValueChange={(val) =>
                        setFieldValue("postalCode", val.value)
                      }
                    />
                    {touched.postalCode && errors.postalCode && (
                      <p className="errorText">{errors.postalCode}</p>
                    )}
                  </>
                )}
              </Field>
            </Grid>

            <Grid item xs={6} sm={3}>
              <Field
                name="city"
                label="City"
                component={TextField}
                fullWidth
                variant="outlined"
              />
            </Grid>

            <Grid item xs={6} sm={3}>
              <Field
                name="street"
                label="Street"
                component={TextField}
                fullWidth
                variant="outlined"
              />
            </Grid>

            <Grid item xs={6} sm={3}>
              <Field name="streetNumber">
                {(props) => (
                  <>
                    <NumberFormat
                      format="####"
                      customInput={MUITextField}
                      fullWidth
                      variant="outlined"
                      value={props.field.value !== "" ? props.field.value : ""}
                      className={
                        touched.streetNumber && errors.streetNumber
                          ? "numberFormat error"
                          : ""
                      }
                      label="Street Number"
                      onBlur={() => setFieldTouched("streetNumber", true)}
                      onValueChange={(val) =>
                        setFieldValue("streetNumber", val.value)
                      }
                    />
                    {touched.streetNumber && errors.streetNumber && (
                      <p className="errorText">{errors.streetNumber}</p>
                    )}
                  </>
                )}
              </Field>
            </Grid>

            <Grid item xs={6} sm={6} className="cancelButtonGridItem">
              <Button
                startIcon={<IconCancel />}
                className="phoneBuyDialogCancelButton"
                fullWidth
                disableRipple
                variant="outlined"
                onClick={
                  props.editableFormValues.name
                    ? props.setEditFormInvisible
                    : props.setFormInvisible
                }
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs={6} sm={6} className="submitButtonGridItem">
              <Button
                startIcon={<SaveAltIcon />}
                className="buyDialogFormSubmit"
                fullWidth
                disableRipple
                variant="contained"
                type="submit"
                disabled={!isValid || isSubmitting || !dirty}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

interface PartnerAddDialogProps {
  addDialogOpen: boolean;
  handleDialogClose: () => void;
  handleAddNewPartners: (partners: Partner[])  => void;
}

export default function PartnerAddDialog(props: PartnerAddDialogProps) {
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [addablePartners, setAddablePartners] = useState<FormValues[]>([]);

  const initialFormValues: FormValues = {
    index: 0,
    name: "",
    email: "",
    phone: "",
    postalCode: "",
    city: "",
    street: "",
    streetNumber: "",
  };

  const [editablePartner, setEditablePartner] = useState<FormValues>(
    initialFormValues
  );

  const setFormVisible = () => {
    setIsFormVisible(true);
  };

  const setFormInvisible = () => {
    setIsFormVisible(false);
  };

  const populateAddablePartners = (values: FormValues) => {
    setAddablePartners([
      ...addablePartners,
      { ...values, index: addablePartners.length },
    ]);
    setFormInvisible();
  };

  const setEditFormVisible = (editable: FormValues) => {
    setIsFormVisible(true);
    setEditablePartner(editable);
  };

  const setEditFormInVisible = () => {
    setIsFormVisible(false);
    setEditablePartner(initialFormValues);
  };

  const editAddablePartner = (edited: FormValues) => {
    setAddablePartners(
      addablePartners.map((partner, index) =>
        index === edited.index
          ? {
              ...partner,
              name: edited.name,
              email: edited.email,
              phone: edited.phone,
              city: edited.city,
              postalCode: edited.postalCode,
              street: edited.street,
              streetNumber: edited.streetNumber,
              index: edited.index,
            }
          : partner
      )
    );
    setEditFormInVisible();
  };

  const removeAddablePartner = (removable: FormValues) => {
    setAddablePartners(
      addablePartners.filter((partner, index) => index !== removable.index)
    );
  };

  const resetAddablePartners = () => {
    setAddablePartners([]);
  };

  const postData = (addedPartners: FormValues[]) => {
    const addUrl = process.env.REACT_APP_PARTNERS_ADD_URL || "";
    const postData: FormValues[] = JSON.parse(JSON.stringify(addedPartners));

    postData.forEach((formValue, index) => {
      delete postData[index].index;
    })

    fetch(addUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    })
      .then((res) => res.json())
      .then((res) => {
        const newPartners: Partner[] = [];

        res.forEach((addedPartnerRes) => {
          const newPartnerData: Partner = {
            id: addedPartnerRes.id,
            name: addedPartnerRes.name,
            email: addedPartnerRes.email,
            phone: addedPartnerRes.phone,
            postalCode: addedPartnerRes.postalCode,
            city: addedPartnerRes.city,
            street: addedPartnerRes.street,
            streetNumber: addedPartnerRes.streetNumber,
          };

          newPartners.push(newPartnerData);
        });

        props.handleAddNewPartners(newPartners)
        resetAddablePartners();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      open={props.addDialogOpen}
      className="partnerAddDialog"
    >
      {!isFormVisible ? (
        <PartnerAddList
          handleDialogClose={props.handleDialogClose}
          addablePartners={addablePartners}
          setFormVisible={setFormVisible}
          setEditFormVisible={setEditFormVisible}
          removeAddablePartner={removeAddablePartner}
          resetAddablePartners={resetAddablePartners}
          postData={postData}
        />
      ) : (
        <PartnerAddForm
          setFormInvisible={setFormInvisible}
          setEditFormInvisible={setEditFormInVisible}
          editAddablePartner={editAddablePartner}
          onSubmit={populateAddablePartners}
          editableFormValues={editablePartner}
        />
      )}
    </Dialog>
  );
}

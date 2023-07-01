import React, { useState } from 'react'
import axios from "axios";

export default function AddProduct() {

  const initialValues = {
    title: "",
    description: "",
    image: null,
    category: [],
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});


  function onChange(e) {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      const newCategory = checked
        ? [...formValues.category, value] // Add the value if checked
        : formValues.category.filter((category) => category !== value); // Remove the value if unchecked
      setFormValues({ ...formValues, category: newCategory });
    } else if (type === "file") {
      setFormValues({ ...formValues, [name]: e.target.files[0] });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
    const errors = validate({ ...formValues, [name]: value }); // Validate the updated form values
    setFormErrors(errors);
  }

  const formdata = new FormData();
  function submit(e) {
    const errors = validate(formValues);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      formdata.append("title", formValues.title);
      formdata.append("image", formValues.image);
      formdata.append("description", formValues.description);
      formValues.category.forEach((category, index) => {
        formdata.append(`category[${index}]`, category);
      });
      const resp = axios.post("http://localhost:3030/producttable/postproductdetail", formdata)
      //  dispatch(UserDetails(formdata));
      setFormValues(initialValues);
    }
  }

  const validate = (values, e) => {
    const errors = {};
    const Regex = /^[A-Za-z][A-Za-z0-9_]{2,28}/;

    if (!values.title) {
      errors.title = " title is required!";
    } else if (!Regex.test(values.title)) {
      errors.title = " This is not a valid title format!";
    }

    if (!values.description) {
      errors.description = " description is required!";
    } else if (!Regex.test(values.description)) {
      errors.description = " This is not a valid description format!";
    }

    if (values.category.length === 0) {
      errors.category = " category is required!";
    }


    if (!values.image) {
      errors.image = " image is required!";

    } else {

      const fileSizeInMB = values.image.size / (1024 * 1024);
      const maxSizeInMB = 10;

      if (fileSizeInMB > maxSizeInMB) {
        errors.image = `image file size should not exceed ${maxSizeInMB}MB.`;
      }
    }

    return errors;
  };

  return (
    <>

      <form className="colorful-form row g-3">
        <div className="col-md-12">
          <label className="form-label">
            <b> Title </b>
          </label>
          <input
            type="text"
            className="form-control"
            // autoComplete="off"
            placeholder="Enter Your Title "
            name="title"
            value={formValues.title}
            onChange={onChange}

          />
          <p>{formErrors.title}</p>
        </div>
        <div className="col-md-12">
          <label className="form-label">

            <b> Description</b>
          </label>
          <textarea
            type="text"
            rows="3"
            className="form-control"
            placeholder="Enter Title Description "
            name="description"
            value={formValues.description}
            onChange={onChange}
          />
          <p>{formErrors.description}</p>
        </div>


        <div className="col-md-12">
          <label className="form-label">

            <b>Category </b>
          </label>
          <br />
          <input
            className="form-check-input p-1"
            type="checkbox"
            name="category"
            value="649036c4d93b7de903ce4977"
            onChange={onChange}
            checked={formValues.category.includes("649036c4d93b7de903ce4977")}
          />
          <label className="form-check-label">&nbsp; Dance &nbsp;</label>
          <input
            className="form-check-input p-1"
            type="checkbox"
            name="category"
            value="649036a8d93b7de903ce4975"
            onChange={onChange}
            checked={formValues.category.includes("649036a8d93b7de903ce4975")}
          />
          <label className="form-check-label">&nbsp; Games &nbsp;</label>
          <input
            className="form-check-input p-1"
            type="checkbox"
            name="category"
            value="6490368dd93b7de903ce4973"
            onChange={onChange}
            checked={formValues.category.includes("6490368dd93b7de903ce4973")}
          />
          <label className="form-check-label">&nbsp; Sports &nbsp;</label>
          <input
            className="form-check-input p-1"
            type="checkbox"
            name="category"
            value="649036d5d93b7de903ce4979"
            onChange={onChange}
            checked={formValues.category.includes("649036d5d93b7de903ce4979")}
          />
          <label className="form-check-label">&nbsp; Bags</label>
          <p>{formErrors.category}</p>
        </div>


        <div className="col-md-12">
          <label className="form-label">

            <b> Select Image</b>
          </label>
          <input
            className="form-control"
            type="file"
            accept="image/*"
            name="image"
            onChange={onChange}
          />
          <p>{formErrors.image}</p>
        </div>



        <button className="form-button" type="button" onClick={submit}>
          Submit
        </button>
      </form>

    </>
  )
}

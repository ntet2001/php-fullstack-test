import React, { useState } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import axios from "axios";

const Create = () => {
  const [brandName, setBrandName] = useState("");
  const [rating, setRating] = useState("");
  const [country, setCountry] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [alert, setAlert] = useState("");
  const [finalalert, setFinalAlert] = useState("");
  const validTypes = ["image/png", "image/jpeg", "image/jpg"];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        if (validTypes.includes(selectedFile.type)) {
          setImage(e.target.files[0]);
        } else {
          setImage(null);
          setAlert("image should respect this format (png,jpeg,jpg)");
        }
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const validateName = (name: string) => {
      const namePattern = /^[a-zA-Z0-9 ]+$/;
      return namePattern.test(name);
    };

    const validateCountry = (country: string) => {
      const countryPattern = /^[A-Za-z]{2}$/;
      return countryPattern.test(country);
    };

    if (!brandName || !rating || !image) {
      setAlert("Some field are not correctly fill.");
      return;
    }

    if (!validateName(brandName)) {
      setAlert("Please enter a valid name.");
      return;
    }

    if (!validateCountry(country)) {
      setAlert("Please enter a valid format for your country.");
      return;
    }

    const formData = new FormData();
    formData.append('brand_name', brandName);
    formData.append('brand_image', image); 
    formData.append('rating', rating);
    formData.append('country', country);

    window.scrollTo(0, 0);
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/brands/", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
      }
      });

      console.log(response);

      if (!response.data.success) {
        throw new Error("Failed to create brand");
      }

      setFinalAlert(response.data.message);

      window.scrollTo(0, 0);
    } catch (error) {
      setFinalAlert("Error");
      window.scrollTo(0, 0);
      // console.error('Error creating user:', error);
      // alert('Failed to create user.');
    } finally {
      setAlert("");
      setBrandName("");
      setRating("");
      setCountry("");
      setImage(null);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Create" backLink="/" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Create Brand
              </h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <span className="text-meta-1">{alert}</span>
                <span className="text-meta-1">{finalalert}</span>
                {/* Input fields for firstname, lastname, etc. */}
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Brand Name<span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter brand name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                    />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Brand Image<span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="file"
                      name="image"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      rating<span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="number"
                      placeholder="Enter rating"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Country<span className="text-meta-1">(optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="EX: EN"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
              >
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Create;

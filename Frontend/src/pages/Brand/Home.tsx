//import React from "react";
import { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { Link } from "react-router-dom";
import { IBrandInfo } from "../../types/IBrandInfo";
import axios from "axios";
import { MdUpdate } from "react-icons/md";

const Home = () => {

  const [brandInfo, setBrandInfo] = useState<IBrandInfo[] | null>(null);
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [error, setError] = useState('');
  // const [loading, setLoading] = useState(true);
  // const [brandId, setBrandId] = useState(0);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/brands/');
        if (response && response.data.success === false) {
          throw new Error(`Failed to fetch Brand: ${response.data.success}`);
        }
        console.log(response.data);
        const data = await response.data.data;
        console.log(data);
        setBrandInfo(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
      }
    };
    fetchBrands();
  }, []);

  const handleDelete = async (brand_id: number) => {
    
    const confirm = window.confirm(
      'Are you shure you want to delete this brand?',
    );
    if (!confirm) return;

    try {

        const response = await fetch(`http://127.0.0.1:8000/api/brands/${brand_id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
        });
      
     
      console.log(response);

      if (!response!.ok) {
        const errorData = await response!.json();
        const errorMessage =
          errorData.message || `Error deleting brand: ${response!.status}`;
        throw new Error(errorMessage);
      }

      const updatedBrand =
        brandInfo?.filter((brand) => brand.brand_id !== brand_id) || [];
      setBrandInfo(updatedBrand);
    } catch (error: any) {
      console.error('Error deleting Brand:', error);
      setError(error.message);
    }
  };

  const filteredBrand = brandInfo?.filter(
    (brand) =>
      brand.brand_name.toLowerCase().includes(filter.toLowerCase()) ||
      brand.brand_image.toLowerCase().includes(filter.toLowerCase()) ||
      brand.rating ||
      brand.country.toLowerCase().includes(filter.toLowerCase()) 
  );

  const indexOfLastBrand = currentPage * itemsPerPage;
  const indexOfFirstBrand = indexOfLastBrand - itemsPerPage;
  const currentBrands = filteredBrand?.slice(indexOfFirstBrand, indexOfLastBrand);

  const totalPages = Math.ceil((currentBrands?.length || 0) / itemsPerPage);


  return (
    <>
    {error }
      <Breadcrumb pageName="Home" backLink="/" />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <div className="flex items-center justify-between mb-3">
            <input
              type="text"
              placeholder="search..."
              className="w-full xl:w-1/4 p-1 rounded border-[1.5px] border-stroke bg-transparent py-2 px-4 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            <Link
              to="/brand/create"
              className="xl:w-1/6 rounded-md bg-primary py-2 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-6"
            >
              Add
            </Link>
          </div>
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Brand id
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Brand name
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Brand image
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Brand rating
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Country
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentBrands &&
                currentBrands.map((brandInfo) => (
                  <tr key={brandInfo.brand_id}>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <div className="flex items-center gap-4">
                        <div>
                          <h5 className="font-medium text-black dark:text-white">
                            {brandInfo.brand_id}
                          </h5>
                        </div>
                      </div>
                    </td>

                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <div className="flex items-center gap-4">
                        <div>
                          <h5 className="font-medium text-black dark:text-white">
                            {brandInfo.brand_name}
                          </h5>
                        </div>
                      </div>
                    </td>

                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <div className="flex items-center gap-4">
                        <div>
                          <h5 className="font-medium text-black dark:text-white">
                            <img src={brandInfo.brand_image} alt="image"/>
                          </h5>
                        </div>
                      </div>
                    </td>

                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <div className="flex items-center gap-4">
                        <div>
                          <h5 className="font-medium text-black dark:text-white">
                            {brandInfo.rating}
                          </h5>
                        </div>
                      </div>
                    </td>

                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <div className="flex items-center gap-4">
                        <div>
                          <h5 className="font-medium text-black dark:text-white">
                            {brandInfo.country}
                          </h5>
                        </div>
                      </div>
                    </td>
                    
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <button
                          className="text-white"
                          onClick={() => {
                            handleDelete(
                              brandInfo.brand_id
                            );
                          }}
                        >
                          <svg
                            className="fill-current"
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                              fill=""
                            />
                            <path
                              d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                              fill=""
                            />
                            <path
                              d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                              fill=""
                            />
                            <path
                              d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                              fill=""
                            />
                          </svg>
                        </button>

                        <button className="hover:text-primary">
                          <Link
                            className="text-white"
                            to={`/brand/update/${brandInfo.brand_id}`}
                          >
                            <MdUpdate />
                          </Link>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {/* Pagination controls */}
        <div className="flex justify-between mt-4 mb-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-2 xl:px-4"
          >
            Previous
          </button>
          <span className="text-primary font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-2 xl:px-4"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;

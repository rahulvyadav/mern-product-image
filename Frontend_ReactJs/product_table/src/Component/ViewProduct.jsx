import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Button from '@mui/material/Button';

export default function ViewProduct() {
    const [productdata, setproductdata] = useState();
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [searchValue, setSearchValue] = useState();
    const [sortValue, setSortValue] = useState("asc");
    // const [rows, setRows] = useState(1);
    // console.log("search ", searchValue);

    useEffect(() => {
        getproduct();
    }, []);

    async function getproduct() {
        try {

            // const resp = await axios.get(
            //     "http://localhost:3030/producttable/getproductdetail"
            // );
            // setproductdata(resp.data.data);
            const resps = await axios.get(
                `http://localhost:3030/producttable/sortsearchpost?pagination=${1}`
            );
            setproductdata(resps.data.data);

        } catch (error) {
            console.error("Error Getting products:", error);
        }
    }

    const handleCheckboxChange = (e) => {
        const productId = e.target.value;
        const isChecked = e.target.checked;

        if (isChecked) {
            setSelectedProducts((prevSelected) => [...prevSelected, productId]);
        } else {
            setSelectedProducts((prevSelected) =>
                prevSelected.filter((id) => id !== productId)
            );
        }
    };

    const searchValueChange = async (e) => {
        const a = e.target.value;
        setSearchValue(e.target.value);
        if (a !== "") {
            const resp = await axios.get(
                `http://localhost:3030/producttable/sortsearchpost?search=${a}`
            );
            console.log(" Search Res ", resp);
            setproductdata(resp.data.data);
        } else {
            getproduct();
        }

    };

    const sortfield = async (e) => {
        const resp = await axios.get(
            `http://localhost:3030/producttable/sortsearchpost?sort=${sortValue}`
        );
        // const resps = await axios.get(
        //     `http://localhost:3030/producttable/sortsearchpost`
        // );
        // setproductdata(resps.data.data);
        setproductdata(resp.data.data);
        setSortValue("desc");
    }


    const handleDelete = async () => {
        for (const productId of selectedProducts) {
            try {
                console.log("firstfghf", selectedProducts)
                const response = await axios.delete(
                    `http://localhost:3030/producttable/deleteproduct/${productId}`
                );
                console.log("Delete response:", response);
                getproduct();
            } catch (error) {
                console.error("Error deleting products:", error);
            }
        }
    };



    return (
        <>

            <div className="input-group p-4 searchbar">
                <div className="form-outline">
                    <input type="search" className="form-control" placeholder="Search" value={searchValue} onChange={searchValueChange} />
                </div>
            </div>


            <div className="container p-4">

                <Button className="deletebutton" variant="contained" size="small" color="error" endIcon={<DeleteForeverIcon />}
                    onClick={handleDelete}
                    disabled={selectedProducts.length === 0}
                > Delete Product </Button>



                <table className=" table productTable  border-dark   caption-top">
                    <caption>List of Products</caption>
                    <thead className="center table-light">
                        <tr>
                            <th scope="col"> Sr.no </th>
                            <th scope="col"> Image</th>
                            <th scope="col" onClick={sortfield}> Title</th>
                            <th scope="col"> Description </th>
                            <th scope="col"> Categories </th>
                            <th scope="col"> Check </th>
                        </tr>
                    </thead>

                    <tbody className=" table table-group-divider ">
                        {productdata?.map((data, index) => (
                            <tr key={index}>
                                <th scope="row"> {index + 1}</th>
                                <td>
                                    <img
                                        className="productimage" alt="Product Img"
                                        src={`http://localhost:3030/${data?.image?.path}`}
                                    />
                                </td>
                                <td>{data?.title} </td>

                                <td>{data?.description} </td>
                                <td>
                                    {
                                        data?.categories?.map((d, i) => (
                                            <ul key={i} style={{ listStyle: 'none' }}>
                                                <li>
                                                    {d?.category_name}
                                                </li>
                                            </ul>
                                        ))
                                    }

                                </td>
                                <td>
                                    <input
                                        type="checkbox"
                                        name="ischeck"
                                        value={data?.id}
                                        onChange={handleCheckboxChange}

                                    />
                                </td>

                            </tr>
                        ))}
                    </tbody>

                </table>

                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item">
                            <span className="page-link" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </span>
                        </li>
                        <li className="page-item"><span className="page-link" onClick={async () => {
                            const resps = await axios.get(
                                `http://localhost:3030/producttable/sortsearchpost?pagination=${1}`
                            );
                            setproductdata(resps.data.data);
                        }

                        } >1</span></li>
                        <li className="page-item"><span className="page-link" onClick={async () => {
                            const resps = await axios.get(
                                `http://localhost:3030/producttable/sortsearchpost?pagination=${2}`
                            );
                            setproductdata(resps.data.data);
                        }

                        } >2</span></li>
                        <li className="page-item"><span className="page-link" onClick={async () => {
                            const resps = await axios.get(
                                `http://localhost:3030/producttable/sortsearchpost?pagination=${3}`
                            );
                            setproductdata(resps.data.data);
                        }

                        } >3</span></li>
                        <li className="page-item"><span className="page-link" onClick={async () => {
                            const resps = await axios.get(
                                `http://localhost:3030/producttable/sortsearchpost?pagination=${4}`
                            );
                            setproductdata(resps.data.data);
                        }

                        } >4</span></li>
                        <li className="page-item">
                            <span className="page-link" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </span>
                        </li>
                    </ul>
                </nav>

            </div >
        </>
    );
}

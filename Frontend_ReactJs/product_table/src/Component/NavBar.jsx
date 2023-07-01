import React from 'react'
import '../../src/NavBar.css'
import '../../src/navBar'
import { NavLink } from 'react-router-dom'


export default function NavBar() {
    return (
        <>

            <div className="top">

                <div className="head">
                    PRODUCT<span>.</span>
                </div>

            </div>
            <div className="header">
                <ul className="navigation">
                    <li> <NavLink to="/">Home</NavLink> </li>
                    <li> <NavLink to="/addproduct">ADD</NavLink>  </li>
                    <li> <NavLink to="/viewproduct">View</NavLink> </li>
                    <li> <NavLink to="/addcategory"> Category</NavLink></li>
                </ul>
            </div>


        </>
    )
}

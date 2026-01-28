import { useState } from "react"
import Link from "next/link";
import { Package } from "lucide-react";
import React from "react";
import { Search } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { CircleUser } from "lucide-react";
import {  NavbarProps } from "@/interfaces/";


const NavLinks: { navigationLink: { label: string; href: string }[] } = {
    navigationLink: [
        {label:"Electronics", href:"/products/electronics" },
        {label:"Clothing", href:"/products/clothing" },
        {label:"Home & Kitchen", href:"/products/home-kitchen" },
        {label:"Books", href:"/products/books" },
        {label:"Toys & Games", href:"/products/toys-games"}
    ]
}




const Navbar: React.FC<NavbarProps> = ({searchHandlingProps,cartSummary,userProfile,navigationLink}) => {




    return(
        <nav className="bg-white shadow-md">
    
        <div>
            <div>
                {/*Logo Section*/}
                <Link href="/" className="flex items-center space-x-2">
                    <Package className="h-6 w-6 text-blue-600" />
                    <span className="text-xl font-bold text-gray-800">Nexus Store</span>
                </Link>


            </div>
            <div>
                {/*Search Bar Section*/}
                {searchHandlingProps && (
                    <form 
                    onSubmit={searchHandlingProps.onSearchSubmit}       
                    className="flex">
                        <input
                            type="text" 
                            value={searchHandlingProps.query}
                            onChange={(e) => searchHandlingProps.onSearch(e.target.value)}
                            placeholder="Search products..."
                            className="border rounded-l px-4 py-2 w-64"
                        />
                        <Search
                        type ="submit"
                         className="h-6 w-6 text-gray-500 mr-2 mt-2"/>   
                        {/* {<button 
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-r">
                            Search
                        </button>} */}
                    </form>
                )}
            </div>
            <div>
                {/*User Profile and Cart Section*/}
                {cartSummary && (
                    <div >
                        <div>
                            <ShoppingCart 
                            className="h-6 w-6 text-gray-800 cursor-pointer"
                            onClick={cartSummary.onCartClick}  
                            /> 
                        </div>
                        
                        <div>
                            <CircleUser
                            className="h-6 w-6 text-gray-800 cursor-pointer"
                            onClick={() => {
                                if (userProfile && userProfile.isAuthenticated) {
                                    // Handle user profile click
                                } else {
                                    // Redirect to login page
                                    window.location.href = '/login';
                                }
                                }  }
                            />
                        </div>
                    </div>
                )}
                            
                            
                            
                    
                        

                  

            </div>


        






        </div>
        <div>

            {/*Navigation Links*/}

            <div className="flex space-x-6">
                {navigationLink.map((link) => (
                    <Link 
                    key={link.label} 
                    href={link.href} 
                    className="text-gray-700 hover:text-blue-600"
                    >
                        {link.label}
                    </Link>
                ))}
        </div>

















    </div>


        </nav>











    )



}
 export default Navbar;
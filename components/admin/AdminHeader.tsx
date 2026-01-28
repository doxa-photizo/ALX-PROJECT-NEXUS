import React from "react";
import { AdminLayoutProps ,AdminHeaderProps } from "@/interfaces/";
import { BellIcon,Search  } from "lucide-react";



const AdminHeader: React.FC<AdminHeaderProps> = ({ title }) => {
    return (
        <header className="bg-white shadow p-4">        
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">{title}</h1>

                <div>
                    <form>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="border rounded-l px-4 py-2"
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded-r"
                        ><Search
                            className="h-6 w-6 text-white" />
                        </button>
                    </form>
                                  <BellIcon className="h-6 w-6 text-gray-600" />


                </div>
  

            </div>
        </header>

    );
}
 export default AdminHeader;
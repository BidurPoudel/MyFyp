import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

const SortButton = () => {
    const [range, setRange] = useState('Sort By Price Range')
    const [open, setOpen] = useState(false)
    const priceRange = ["100000-1000000", "100000-100000", "100000- 2000000"]
    
    return (
        <div>
            <div className="flex m-10 relative">
                <div
                    className="sort flex text-lg gap-2 p-2 border-2 rounded-md border-black bg-slate-300 cursor-pointer hover:bg-slate-400"
                    onClick={() => setOpen(!open)}
                >
                    {range}
                    <FontAwesomeIcon
                        icon={faChevronDown}
                        size="lg"
                        style={{ color: "black" }}
                        className="cursor-pointer"
                        onClick={() => setOpen(!open)}
                    />
                </div>
                {open && (
                    <div className="absolute left-0 mt-10 w-100"> 
                        <ul className="py-2 px-1 border rounded border-black bg-white"> {/* Add background color */}
                            {priceRange.map((price) => (
                                <li
                                    key={price}
                                    onClick={() => {
                                        setRange(price);
                                        setOpen(false);
                                    }}
                                    className="cursor-pointer mt-2 py-1 hover:bg-slate-200"
                                >
                                    {price}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SortButton;

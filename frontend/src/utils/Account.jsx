
import { useNavigate } from "react-router";
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
const Account = () => {
  const menus = ['dashboard'];
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()

  return (
    <div>
      <div>
        <FontAwesomeIcon icon={faCircleUser}
          size='2xl'
          style={{ color: 'black', paddingTop: "10px" }}
          className='-mt-1 cursor-pointer relative'
          onClick={() => setOpen(!open)}
        />
      </div>
      {open && <div className="drop absolute right-2 top-[9vh] ">
        <ul className='bg-red-200 text-black w-[15vh] py-2 px-1 ' onClick={() => setOpen(open)}>
          {
            menus.map((menu) => (
              <li
                key={menu}
                onClick={(event) => {
                  event.stopPropagation();
                  navigate(`/${menu}/property`);
                  setOpen(false)
                }
                }
                className='cursor-pointer  px-1 w-[100%] hover:bg-slate-200 '>{menu.toUpperCase()}</li>
            ))
          }
        </ul>
      </div>}
    </div>
  )
}

export default Account

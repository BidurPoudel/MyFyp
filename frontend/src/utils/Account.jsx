
import { useNavigate } from "react-router";
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
const Account = () => {
  const menus = ['owner'];
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  async function onNavigate(){
    navigate('owner/')
  }

  return (
    <div>
      <div>
        <FontAwesomeIcon icon={faCircleUser}
          size='xl'
          style={{ color: '#373737', paddingTop: "15px" }}
          className='-mt-2 cursor-pointer relative'
          onClick={onNavigate}
        />
      </div>
     
    </div>
  )
}

export default Account

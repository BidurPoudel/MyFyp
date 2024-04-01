import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'


const Chat = () => {
  return (
    <>

      <div className="mx-10 mt-1 h-[100vh] bg-slate-200 w-full relative flex">
        <div className="message w-full flex-row-reverse">
          <div className="flex justify-end">
            <div className="bg-white rounded-lg p-3 mb-1 max-w-sm break-words mx-8 my-2">
              This is a sent message.
            </div>
          </div>
          <div className="flex justify-start flex-col my-4">
            <div className="bg-white rounded-lg p-3 mb-1 max-w-sm break-words mx-8 my-2 flex-row-reverse">
              This is a sent message.
            </div>
          </div>
        </div>
        <textarea
          placeholder='Type message'
          className='absolute bottom-10 w-[75%] h-[4rem] border border-black rounded-3xl  outline-blue-500 py-4 overflow-hidden 
        px-2 mx-28 placeholder:text-slate-400'
          name='message'
        />
        <FontAwesomeIcon icon={faPaperPlane}
          size='2x'
          style={{ paddingTop: "10px" }}
          className='-mt-1 cursor-pointer text-blue-700 absolute bottom-[3.5rem] right-[13.5rem]'
          onClick={() => setOpen(!open)}
        />
      </div>
    </>
  )
}

export default Chat

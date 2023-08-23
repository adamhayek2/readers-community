import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import InputField from '../basic/InputFeild.jsx';
import Button from '../basic/Button/index.jsx';
import NewPost from '../NewPostComponent';


const Navbar = () => {
    
const navigate = useNavigate();
const [opneModal, setOpenModal] = useState(false)
  
  return (
    <nav className="sticky top-0 w-1/6 min-h-fit bg-white w-full border border-b-1 z-50">
        <div className="container max-w-6xl	ml-auto mr-auto">
            <div className=" flex flex-row py-1 items-center gap-3 justify-between ">
                <div className="basis-1/5 pl-3 lg:p-0">
                </div>
                
                <InputField
                    className="text-xs w-96 m-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
                    type="text"
                    placeholder="Search..."

                />
                
                <div className='flex flex-row py-1 items-center gap-3 '>
                    <div onClick={() => setOpenModal(true)}>
                        <Button
                        text="New Post"
                        /> 
                    </div>
                    <div className="">
                        edit profile
                    </div>
                </div>
                
            </div>
        </div>

        <NewPost open={opneModal} onClose={() => setOpenModal(false)}/>
    </nav>
  )
}

export default Navbar
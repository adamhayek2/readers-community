import React from 'react'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
const navigate = useNavigate();
  
  return (
    <nav className="sticky top-0 w-1/6 h-screen border border-b-1 z-10">
        <div className="container max-w-5xl p-2	">
            <div className="flex flex-col py-1 itens-center">
                <div className="pt-[3rem] px-[1.5rem] pb-[4rem]">
                </div>
                
                <div className="">
                    <input type="text" name="" id="" className=' border-black border rounded w-full'/>
                </div>
                
                <div className="">
                    edit profile
                </div>

                <div className="">
                    create post
                </div>
                
            </div>
        </div>
    </nav>
  )
}

export default Navbar
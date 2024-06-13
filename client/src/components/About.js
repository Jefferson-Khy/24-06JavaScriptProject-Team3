import React from 'react';
import { useNavigate } from 'react-router-dom';
import header from "../assets/header.png"
import techHive from "../assets/TechHive.png"

export default function About() {
    const navigate = useNavigate()
    const homeClick = (e) => {
        e.preventDefault()
        navigate("/")
    }
  return (
    <>
      {/* <!-- component --> */}
      <div className="leading-normal tracking-normal text-indigo-400 bg-cover min-h-screen flex items-center justify-center"
      style={{ backgroundImage: `url(${header})` }}>
            <div class="py-16">  
                <div class="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
                    <div class="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
                        <div class="md:5/12 lg:w-5/12">
                            <img src={techHive} alt="image" loading="lazy" width="" height=""/>
                        </div>
                        <div class="md:7/12 lg:w-6/12">
                            <h2 class="text-2xl font-bold md:text-4xl text-white">TechHive Software as a Service is developed to assist developers</h2>
                            <p class="mt-6 text-white">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum omnis voluptatem accusantium nemo perspiciatis delectus atque autem! Voluptatum tenetur beatae unde aperiam, repellat expedita consequatur! Officiis id consequatur atque doloremque!</p>
                            <p class="mt-4 text-white"> Nobis minus voluptatibus pariatur dignissimos libero quaerat iure expedita at? Asperiores nemo possimus nesciunt dicta veniam aspernatur quam mollitia.</p>
                        </div>
                    </div>
                    <div className='btn-container flex justify-center'>
                       
                        <button
                            className="mt-16 bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                            type="button" onClick={homeClick}
                        >
                        Home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
}

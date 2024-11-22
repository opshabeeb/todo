import React from 'react'

const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center  font-sans h-screen px-10 py-6 md:space-y-0 space-y-4">
    {/* Text Content */}
    <div className="md:w-1/2 text-center md:text-left space-y-4">
      <h1 className="text-6xl font-bold leading-tight">
        Organize Your <br /> Life and Work, Finally
      </h1>
      <p className="text-2xl font-semibold">
        Become focused, organized, and calm.
      </p>
    </div>
  
    {/* Button Section */}
    <div className="md:w-2/3 flex flex-col items-center space-y-2">
      <h1 className="text-3xl font-bold">Make a To-Do List</h1>
      <button className="px-6 py-3 shadow-md rounded-md bg-slate-400 text-white hover:bg-slate-500 transition duration-300">
        Click Here
      </button>
    </div>
  </div>
  
  
  

  )
}

export default Hero

import React from 'react'

const About = () => {
  return (
    <div className='container flex flex-col md:flex-row justify-center h-screen px-4 py-3 gap-x-3'>
       <div className="md:w-1/2 w-full">
        <p className='text-2xl font-bold rounded-md shadow-sm px-6 py-3 bg-slate-300 text-center'>About-Us</p>

          <p className='mt-5'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed earum nesciunt a minima pariatur. Eos sequi nulla veniam saepe assumenda. Ipsum cumque praesentium nobis tempore similique nihil possimus odio blanditiis?Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio quia doloribus culpa aliquam officiis, totam mollitia at qui. Animi provident atque recusandae molestiae fuga exercitationem est similique impedit, temporibus ea?Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias corporis sunt incidunt est debitis vero fuga nam veniam totam temporibus, neque voluptatum, eos aperiam alias dolore recusandae vitae aspernatur quibusdam!</p>
       </div>
       <div className="image md:w-1/3 w-full">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvsrU3go5BxBVLGorKLL3TDRO1SAyWaG_71yZml-WzSCZgCw-x_YNQv35gey-Cv5sQ74E&usqp=CAU" alt="" className='h-2/3 w-full'/>
       </div>
    </div>
  )
}

export default About

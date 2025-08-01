import React, { useState } from 'react'
import BlurCircle from './BlurCircle';
import { dummyTrailers } from '../assets/assets';
import { PlayCircleIcon } from 'lucide-react';


const TrailerSection = () => {

    const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[1]);

  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-44 py-20 overflow-hidden'>
        <p className='text-gray-300 font-medium text-lg max-w[960px] mx-auto'>Trailers</p>

        <div className='relative mt-6'>
            <BlurCircle top='-100px' right='-100px'/>
            <iframe
                className='mx-auto max-w-full'
                width="960px"
                height="540px"
                src={currentTrailer.videoUrl}
                allow="autoplay; encrypted-media"
                allowFullScreen
            />
        </div>

        <div className='group grid grid-cols-4 gap-4 md:gap-8 mt-8 max-w-4xl mx-auto'>
            { dummyTrailers.map((trailer)=>(

                <div key={trailer.image} onClick={()=>setCurrentTrailer(trailer)} className=' relative group-hover:not-hover:opacity-50 hover:-translate-y-1 duration-300 transition max-md:h-60 cursor-pointer'>

                    <img src={trailer.image} alt="" className='rounded-lg w-full h-full object-cover brightness-75' />

                    <PlayCircleIcon className=' absolute top-1/2 left-1/2 w-5 md:w-8 h-5 md:h-12 transform -translate-x-1/2 -translate-y-1/2' />

                </div>
            ))}
        </div>
    </div>
  )
}

export default TrailerSection
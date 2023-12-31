import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import AboutDataTemplate from "../components/AboutDataCard";
import { sectionData } from "../utilities/data";
import LoginCard from '../components/LoginCards';
import Navbar from '../components/Navbar';
import ReviewCarousel from "../components/ReviewCarousel";

import mongoose from "mongoose";
import { GetServerSideProps } from 'next';
import Reviews from "../models/Reviews";
import Revi from "../models/Revi";

const inter = Inter({ subsets: ['latin'] })
const renderAboutData = sectionData.map((data, index) => (
  <AboutDataTemplate
    key={index}
    start={data.start}
    picImg={data.picImg}
    number={data.number}
    title={data.title}
  />
));

export default function Home() {
  return (
    <>
      <Head>
        <title>WEkreta™</title>
        <meta name="description" content="perfect for vendors" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Navbar />


      {/* main hero section starts */}
      <section className="flex justify-center h-[85vh] items-center px-10 md:px-28 gap-7"> 
        <div className='flex flex-col justify-center gap-7 max-w-full md:max-w-[45vw]'>
          <h5 className='text-2xl text-purple-400 font-bold -my-4 font-public-sans'>START TO SUCCESS</h5>

          <h3 className='text-5xl font-semibold'>Empowering your long-lived <span className='text-green-500'>trust</span> with <span className="text-green-500">technology</span> and <span className="text-green-500">love</span></h3>
          <h5 className='text-xl font-public-sans'>Restoring the connection between vendors and consumers in a split second.</h5>
        </div>

        <div className='w-full md:w-[60vw]'>
          <Image 
            src={"/assets/herosec.gif"}
            width={500}
            height={500} 
            className="w-full"
            alt=""
          />
        </div>
      </section>
      {/* main hero section ends */}

      {/* stats section starts */}
      <section className="bg-gray-900 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-4 md:px-10 w-full">
      {renderAboutData}
      </section>

      {/* stats section ends */}

      {/* login for vendor and consumer starts */}
      <section className='px-4 md:px-32 pt-20'>
        <div className='h-[50vh] rounded-3xl bg-black text-white px-48 flex flex-col items-center text-center'>
          <p className='text-6xl font-bold my-14 leading-tight '>It&apos;s your time to make the move with <span className='text-green-500'>WE
            <span className='text-white'>kreta</span></span> </p>
            
 

  </div> 
 
  {/* this is the div surrounding vendor and customer */}
<div id="cardssection" className='flex justify-evenly px-20 relative -top-16  ' >
          <LoginCard name="Vendor" imgName='vendor' text='Sign up to know how Bahut hua online ka prahaar, ab phone hi badhaega apki raftaar. Abhi sign up karei' />
          <LoginCard name='Consumer' imgName='consumer' text='Ordering stuff is easy without making your pocket squeezy.' />
        </div>
        </section> 
      
      {/* login for vendor and consumer ends */}

      {/* Student Feedback Carousel Starts */}
      
      <div className="flex flex-col gap-10 w-full md:w-4/5 py-4 mx-auto -my-32 mb-0 relative mt-10">
  <div className="flex flex-col gap-2">
    <div className="xl:text-5xl text-4xl font-semibold">
      <h1 className="text-center">Hear it from our customers!</h1>
    </div>
    <p className="text-[#6D737A] text-lg font-public-sans text-center">
    </p>
  </div>
  <ReviewCarousel />
</div>

      {/* Student Feedback Carousel Ends */}
    </>
  )
}

export const getServerSideProps = async (context) => {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URL);
  }

  let Rev = await Reviews.find(); // You need to have Reviews imported and defined here
  // let Revs = await Revi.find(); // This line seems to be commented out, so no issue here
  
  return {
    props: { Rev: JSON.parse(JSON.stringify(Rev)) },
  };
};

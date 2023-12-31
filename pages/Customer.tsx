import React, { useState, useEffect, Fragment, useLayoutEffect } from "react";
import { useRouter } from "next/router";
// import CustomerHome from "../components/CustomerNavbar";
import Navbar from "../components/Navbar";
import CustomerSidebar from "../components/CustomerSidebar";
import Leaderboard from "../components/Leaderboard";
import Head from "next/head";
import CustomerNear from "./../components/CustomerNear";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Listbox, Transition } from "@headlessui/react";
import Review from "./../components/Review";
// import LocateProduct from './../components/LocateProduct';

const nearMe = [
  {
    Name: "Ramu",
    Distance: "2km",
  },
  {
    Name: "Somu",
    Distance: "7km",
  },
  {
    Name: "Vihari",
    Distance: "1.1km",
  },
  {
    Name: "Akash Jindal",
    Distance: "2.1km",
  },
];

const pincode = [
  { id: 1, pinCode: 110080, unavailable: false },
  { id: 2, pinCode: 110081, unavailable: false },
  { id: 3, pinCode: 110082, unavailable: false },
  { id: 4, pinCode: 110083, unavailable: true },
  { id: 5, pinCode: 110084, unavailable: false },
  { id: 5, pinCode: 110085, unavailable: false },
];
const Products = [
  { id: 1, day: "golgappe", unavailable: false },
  { id: 2, day: "Fruit", unavailable: false },
  { id: 3, day: "Vegetable", unavailable: false },
  { id: 4, day: "icecream", unavailable: true },
];


const eventData = [
  {id: 1, src: "/meditation.jpg", pinCode: 110080, name: "Serene Meditation", time: "Tuesday: 6 - 7", Instructor: "Ms. Neelam"},
  {id: 2, src: "/zumba.jpg", pinCode: 110081, name: "Pro Dance", time: "Tuesday: 6 - 7", Instructor: "Ms. Neelam"},
  {id: 3, src: "/zumba.jpg", pinCode: 110083, name: "Vibezz The Dance", time: "Tuesday: 6 - 7", Instructor: "Ms. Neelam"},
  {id: 1, src: "/yoga.jpg", pinCode: 110080, name: "Tranquill", time: "Tuesday: 6 - 7", Instructor: "Ms. Neelam"},
  {id: 2, src: "/meditation.jpg", pinCode: 110081, name: "Bodhik", time: "Tuesday: 6 - 7", Instructor: "Ms. Neelam"},
  {id: 3, src: "/zumba.jpg", pinCode: 110083, name: "The Crazies", time: "Tuesday: 6 - 7", Instructor: "Ms. Neelam"},
]

type Props = {};

const LocateProduct = (props: Props) => {
  const date = new Date();
  const showTime =
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  const [time, setTime] = useState(showTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(showTime);
    }, 1000);
    return () => clearInterval(interval);
  }, [showTime]);

  const [selected, setSelected] = useState(pincode[0]);
  const [todayDay, setTodayDay] = useState(Products[0]);
  const [show, setshow] = useState("");

  // toggle to button
  const [toggle, setToggle] = useState(true);

  const [dataSet, setDataSet] = useState({
    pin: selected.pinCode,
    day: todayDay.id,
    time: parseInt(date.getHours() + "" + date.getMinutes()),
  });
  useEffect(() => {
    let dateN = new Date();

    setDataSet({
      pin: selected.pinCode,
      day: todayDay.id,
      time: parseInt(dateN.getHours() + "" + dateN.getMinutes()),
    });
    console.log(dataSet);
  }, [toggle]);

  function sendData() {
    setToggle(!toggle);
    console.log(dataSet);
  }

  return (
    <>
      <div className="flex flex-col w-[70vw] ">
        <div className="grid grid-cols-5 px-10 gap-5 py-10">
          <div className="  col-span-2 flex flex-col gap-6">
            <h1 className="text-3xl font-semibold`">Search here</h1>

            <div>
              <h2 className="text-xl font-semibold pb-3">Enter Location</h2>
              <Listbox value={selected} onChange={setSelected}>
                <div className="relative mt-1 z-40">
                  <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate">{selected.pinCode}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {pincode.map((person, personIdx) => (
                        <Listbox.Option
                          key={personIdx}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active
                                ? "bg-amber-100 text-amber-900"
                                : "text-gray-900"
                            }`
                          }
                          value={person}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                {person.pinCode}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>

            <div>
              <h2 className="text-xl font-semibold pb-3">Enter Product</h2>
              <Listbox value={todayDay} onChange={setTodayDay}>
                <div className="relative mt-1 z-30">
                  <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate">{todayDay.day}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute mt-1  w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {Products.map((person, personIdx) => (
                        <Listbox.Option
                          key={personIdx}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active
                                ? "bg-amber-100 text-amber-900"
                                : "text-gray-900"
                            }`
                          }
                          value={person}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  todayDay ? "font-medium" : "font-normal"
                                }`}
                              >
                                {person.day}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>

            <button
              onClick={() => {
                setshow("show");
              }}
              className="bg-[#fc6441] w-2/5 rounded-xl p-2 text-white font-semibold"
            >
              Search
            </button>
            {show === "show" ? (
              <div className="justify-center w-3/5 grid grid-cols-1">
                <div className="bg-white shadow-lg my-3 rounded-lg text-center text-black border-[#fc6441] border-2">
                  <h1 className="font-semibold">Ramu</h1>
                  <p>1 km</p>
                </div>
                <div className="bg-white shadow-lg my-3 rounded-lg text-center text-black border-[#fc6441] border-2">
                  <h1 className="font-semibold">Prakash</h1>
                  <p>2 km</p>
                </div>
                <div className="bg-white shadow-lg my-3 rounded-lg text-center text-black border-[#fc6441] border-2">
                  <h1 className="font-semibold">Akash Jindal</h1>
                  <p>0.5 km</p>
                </div>
              </div>
            ) : null}
          </div>
          <div className="col-span-3">
            <div>
              <iframe
                width="100%"
                height="500"
                src="https://maps.google.com/maps?width=100%25&amp;height=500&amp;hl=en&amp;q=Ambica%20VIhar,%20New%20Delhi+(Ambika%20Vihar)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              >
                <a href="https://www.maps.ie/distance-area-calculator.html">
                  distance maps
                </a>
              </iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Customer = () => {
  const mypincode = [
    { id: 1, pinCode: 110080},
    { id: 2, pinCode: 110081 },
    { id: 3, pinCode: 110082 },
    { id: 4, pinCode: 110083 },
    { id: 5, pinCode: 110084 },
    { id: 5, pinCode: 110085 },
  ];
  const [selected, setSelected] = useState(mypincode[0]);
  const [component, setcomponent] = useState("");

  const router = useRouter();

  const vendor_id = router.query.id;
  return (
    <>
      <Head>
        <title>WEkreta</title>
        <meta name="description" content="perfect for vendors" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative overflow-x-hidden">
        <Navbar />

        <div className="flex flex-row">
          <div className="flex w-screen z-0">
            <CustomerSidebar component={setcomponent} />

            <div className="flex flex-col mx-auto">
              {component === "vendors near me" ? (
                <div className="text-[#fc6441] text-4xl text-center mt-20 w-[500px] font-extrabold">
                  Vendors near you{" "}
                </div>
              ) : null}

              {component === "review" || component === "" ? (
                <Review prop={vendor_id} />
              ) : null}
              <div className=" mx-auto grid grid-cols-2 justify-center">
                {component === "vendors near me" ? <LocateProduct /> : null}

                {/* leaderboard codee  */}
                {component === "leaderboard" ? <Leaderboard /> : null}

                {/* leaderboard code endss here */}

                {/* <SwiperSlide
      className="h-[200px] mt-[48px] ml-[48px] bg-purple-50 rounded-3xl px-6 py-8  flex flex-col gap-8"
    >
      <div className="flex flex-col items-center justify-between rounded-3xl w-full gap-4">
        <div className="flex w-full justify-between items-center">
          <div className="flex gap-4 items-center">
            <img
              src="http://medicine.exeter.ac.uk/images/profiles/John_Dennis.jpg"
              alt="mentor"
              className="h-14 rounded-full w-[50px]"
            />
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-[#1B1D1F]">Mukesh</h1>
              
            </div>
          </div>
          <div>
            <img src={`/reviews/quoteLogo.svg`} alt=""  className="text-green-500"/>
          </div>
        </div>
      </div>
      <div className="text-[#363A3D]">something</div>
    </SwiperSlide>

    <SwiperSlide
      className="h-[200px] mt-[48px] ml-[48px] bg-purple-50 rounded-3xl px-6 py-8  flex flex-col gap-8"
    >
      <div className="flex flex-col items-center justify-between rounded-3xl w-full gap-4">
        <div className="flex w-full justify-between items-center">
          <div className="flex gap-4 items-center">
            <img
              src="http://medicine.exeter.ac.uk/images/profiles/John_Dennis.jpg"
              alt="mentor"
              className="h-14 rounded-full w-[50px]"
            />
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-[#1B1D1F]">Harish</h1>
            </div>
          </div>
          <div>
            <img src={`/reviews/quoteLogo.svg`} alt=""  className="text-green-500"/>
          </div>
        </div>
      </div>
      <div className="text-[#363A3D]">More something</div>
    </SwiperSlide> */}
              </div>
            </div>
          </div>
        </div>

        <div
        className="mx-14 my-8"
        >
          <p className="text-center mx-auto font-semibold text-2xl text-[#fc6441]">Upcoming Events</p>


          <div>
              <h2 className="text-xl font-semibold pb-3">Enter Location</h2>
              <Listbox value={selected} onChange={setSelected}>
                <div className="relative mt-1 z-40">
                  <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate">{selected.pinCode}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {pincode.map((person, personIdx) => (
                        <Listbox.Option
                          key={personIdx}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active
                                ? "bg-amber-100 text-amber-900"
                                : "text-gray-900"
                            }`
                          }
                          value={person}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                {person.pinCode}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
          

          <div className="grid grid-cols-3">
{/*  */}
          {eventData.filter((item) => {
            console.log("item.pinCode:", item.pinCode);
            console.log("selected:", selected);
            if(item.pinCode === selected.pinCode) return true;
            return false;
          }).map((item) => (
            <div
            key={item.id}
             className="rounded-lg shadow-md m-8">
             <div style={{width: '100%', height: '250px', position: 'relative'}}>
              <Image alt="meditation" src={item.src}
              layout='fill'
              objectFit='contain'
              />
              </div>
                <div >
                  <h1 className="text-center font-semibold text-xl text-[#fc6441]">{item.name}</h1>
                  <div className='p-4'>
                    <div className="font-semibold text-md">
                      Timings : {item.time}
                    </div>
                    <div className="font-semibold text-md">
                      Instructor : {item.Instructor}
                    </div>
                  </div>
                </div>
             </div>
        
          ))}
             

             </div>
        </div>
      </div>
    </>
  );
};

export default Customer;

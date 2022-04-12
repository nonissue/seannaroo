import * as React from 'react';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

type TimeLeftObject = {
  days: number | null;
  hours: number | null;
  minutes: number | null;
  seconds: number | null;
};

const formatDate = (dateInSeconds: number) => {
  const days = Math.floor(dateInSeconds / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (dateInSeconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((dateInSeconds % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((dateInSeconds % (1000 * 60)) / 1000);

  return {
    days,
    hours,
    minutes,
    seconds,
  };
};

const calculateTimeLeft = (targetTime: number) => {
  const difference = +targetTime - +new Date();

  return formatDate(difference);
};

const TestPage: NextPage = () => {
  const seannarooDateUTC = new Date(Date.UTC(2022, 8, 15, 19, 0, 0));
  const [timeLeft, setTimeLeft] = useState<TimeLeftObject>({
    days: null,
    hours: null,
    minutes: null,
    seconds: null,
  });
  // useEffect(() => {
  //   setTimeLeft(calculateTimeLeft(+seannarooDateUTC));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(+seannarooDateUTC));
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <main className='flex items-center mx-4 max-w-xl min-h-screen sm:mx-auto'>
      <div className='w-full text-center bg-white rounded-lg border-4 border-gray-800 divide-y divide-gray-300 divide-dotted shadow-xl shadow-gray-800/20 sm:flex  sm:flex-col sm:justify-center '>
        <div className=' py-3 px-2 font-serif text-xl italic tracking-widest text-gray-900/70 uppercase'>
          Time left until...
        </div>

        <div className='py-10 text-5xl font-black sm:p-8 sm:py-16 sm:text-8xl'>
          Seannaroo
        </div>
        <div className=''>
          {timeLeft.seconds === null ||
          timeLeft.hours === null ||
          timeLeft.minutes === null ? (
            `Loading...`
          ) : (
            <div className='flex flex-col border-y border-gray-300  border-dotted shadow-sm sm:flex-row'>
              <div className='flex justify-center items-center px-4 w-full text-gray-800 sm:flex-col sm:py-10 sm:px-6'>
                <div className=' py-4 mr-2 font-mono text-4xl font-bold text-left sm:text-6xl sm:text-center'>{`${timeLeft.days}`}</div>

                <div className='text-lg font-semibold tracking-wider text-gray-600 uppercase'>
                  {timeLeft.days === 1 ? 'day &' : 'days'}
                </div>
              </div>
              <div className='flex justify-center items-center px-4 w-full text-gray-800 border-t-2 border-gray-300 border-dotted sm:flex-col sm:px-6 sm:border-t-0 sm:border-l sm:border-gray-300'>
                <div className='py-4 mr-2 font-mono text-4xl font-bold text-left sm:text-6xl sm:text-center'>
                  {`${timeLeft.hours
                    .toString()
                    .padStart(2, '0')}:${timeLeft.minutes
                    .toString()
                    .padStart(2, '0')}:${timeLeft.seconds
                    .toString()
                    .padStart(2, '0')}`}
                </div>
                <div className='text-lg font-semibold tracking-wider text-gray-600  uppercase'>
                  hours
                </div>
              </div>
            </div>
          )}
        </div>
        <div className='p-4 font-serif text-2xl italic sm:py-8 sm:text-6xl sm:font-light'>
          {'"The Event of the Century"'}
        </div>
        <div className=' flex flex-row justify-around '>
          <div className='grow py-2 font-mono border-r border-gray-300 border-dotted'>
            {seannarooDateUTC.toLocaleDateString()}
          </div>
          <div className='grow py-2 font-mono'>
            {seannarooDateUTC.toLocaleString().split(', ')[1].split(' ')[0]}
          </div>
        </div>
        <div className='py-2 text-xl font-semibold tracking-widest text-gray-50  uppercase bg-gray-800  sm:py-6 sm:text-3xl'>
          <span className='text-pink-400 border-b-2 border-pink-400/50'>
            Get Tickets
          </span>
        </div>
      </div>
    </main>
  );
};

export default TestPage;

import React, { useEffect, useState } from 'react'
import Loading from '../../components/Loading';
import Title from '../../components/admin/Title';
import { dateFormet } from '../../lib/dateFormat';
import { useAppContext } from '../../context/AppContext';

const ListShows = () => {

  const currency = import.meta.env.VITE_CURRENCY;

  const { axios, getToken, user } = useAppContext();

  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllShows = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get('/api/admin/all-shows', {headers: {Authorization: `Bearer ${token}`}});
      setShows(data.shows);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  useEffect(()=>{
    if(user){
      getAllShows();
    }
  }, [user]);


  return !loading ? (
    <>
      <Title text1={"List"} text2={"Shows"}/>
      <div className='max-w-4xl mt-6 no-scrollbar overflow-auto'>
        <table className='w-full border-collapse rounded-md overflow-hidden text-nowrap'>
          <thead>
            <tr className='bg-primary/20 text-left text-white'>
              <th className='p-2 font-medium pl-5'>Movie Name</th>
              <th className='p-2 font-medium'>Show Time</th>
              <th className='p-2 font-medium'>Total Bookings</th>
              <th className='p-2 font-medium'>Earning</th>
            </tr>
          </thead>
          <tbody>
            { shows.map((show, index) => (
              <tr key={index} className='border-b border-primary/10 bg-primary/5 even:bg-primary/10'>
                <td className='p-2 min-w-45 pl-5'>{show.movie.title}</td>
                <td className='p-2'>{dateFormet(show.showDateTime)}</td>
                <td className='p-2'>{Object.keys(show.occupiedSeats).length}</td>
                <td className='p-2'>{Object.keys(show.occupiedSeats).length * show.showPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  ) : <Loading />
}

export default ListShows
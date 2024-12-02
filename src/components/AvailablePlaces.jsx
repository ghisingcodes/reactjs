import { useEffect, useState } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvaiablePlaces } from '../../http.js';

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availableData, setAvailableData] = useState([]);
  const [error, setError] = useState();

  useEffect(()=>{
    async function fetchPlaces(){
      setIsFetching(true);
      try {
        const places = await fetchAvaiablePlaces();
        navigator.geolocation.getCurrentPosition((position)=>{
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailableData(sortedPlaces);
          setIsFetching(false);

        });
        // setAvailableData(resData.places);
      } catch (error) {
        setError({
          message:error.message || "Could not fetch places, please try again later."
        });
      }
      setIsFetching(false);
    }
    // fetch("http://localhost:3000/places").then(res=>{
    //   return res.json();
    // }).then(resData=>{
    //   setAvailableData(resData.places)
    // })
    fetchPlaces();
  },[])

  if(error){
    return <Error title="An Error occurred!" message={error.message} />
  }
  return (
    <Places
      title="Available Places"
      places={availableData}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}


import {useState,useEffect} from "react";
import axios from "axios";
import {Box,InputLabel,FormControl} from '@mui/material';

function App() {
  const [countries,setCountries]=useState([]);
  const [country,setCountry]=useState("");
  const [states,setStates]=useState([]);
  const [state,setState]=useState("");
  const [cities,setCities]=useState([]);
  const [city,setCity]=useState("");
  function getStates(country){
    axios.get(`https://location-selector.labs.crio.do/country=${country}/states`).then((res)=>{
      setStates(res.data);
    }).catch((err)=>{
      console.log(err);
    })
  }
  function getCities  (country,state){
    axios.get(`https://location-selector.labs.crio.do/country=${country}/state=${state}/cities`).then((res)=>{
      setCities(res.data);
    }).catch((err)=>{
      console.log(err);
    })
  }
  useEffect(()=>{
    
    axios.get("https://location-selector.labs.crio.do/countries").then((res)=>{
     
      setCountries(res.data);
    }).catch((err)=>{
      console.log(err);
    })
  },[])
  const handleChange=(event,field)=>{
    if(field==='country'){
      setCountry(event.target.value);
      getStates(event.target.value);
    }else if(field==='state'){
      setState(event.target.value);
      getCities(country,event.target.value);
    }else if(field==='city'){
      setCity(event.target.value);
    }
  }
  return (
   
      <Box sx={{ minWidth: 120 }}>
       <FormControl variant="outlined" sx={{ m: 1, minWidth: 300 }}>
      
        <select
          value={country}
          onChange={(e) => handleChange(e, "country")}
        >
          <option value="">Select Country</option>
          {countries?.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </FormControl>
      <FormControl variant="outlined" sx={{ m: 1, minWidth: 300 }}>
       
        <select
          value={state}
          disabled={!country}
          onChange={(e) => handleChange(e, "state")}
        >
          <option value="">Select State</option>
          {states?.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </FormControl>
      <FormControl variant="outlined" sx={{ m: 1, minWidth: 300 }}>
       
        <select
            value={city}
            disabled={!state}
            onChange={(e) => handleChange(e, "city")}
          >
            <option value="">Select City</option>
            {cities?.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
      </FormControl>
      {country && state && city && (
        
          <p> You selected {city}, {state}, {country}</p>
       
      )}
    </Box>
    
  )
}

export default App

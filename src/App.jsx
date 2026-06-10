
import {useState,useEffect} from "react";
import axios from "axios";
import {Box,InputLabel,MenuItem,FormControl,Select} from '@mui/material';

function App() {
  const [countries,setCountries]=useState("");
  const [country,setCountry]=useState("");
  const [states,setStates]=useState("");
  const [state,setState]=useState("");
  const [cities,setCities]=useState("");
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
        <InputLabel id="select-outlined-label-country">Select Country</InputLabel>
        <Select
          labelId="select-outlined-label-country"
          id="select-outlined-country"
          value={country}
          onChange={(event) => handleChange(event,'country') }
          label="Age"
        >
          {countries && countries.map((country)=>{
            return <MenuItem  key={country} value={country}>{country}</MenuItem>
          })}
        
        </Select>
      </FormControl>
      <FormControl variant="outlined" sx={{ m: 1, minWidth: 300 }}>
        <InputLabel id="select-outlined-label-state">Select State</InputLabel>
        <Select
          labelId="select-outlined-label-state"
          id="select-outlined-state"
          disabled={country?false:true}
          value={state}
          onChange={(event) => handleChange(event, 'state') }
        >
          {!states && (
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
          )}
          {states && states.map((state)=>{
            console.log(state);
            return <MenuItem  key={state} value={state}>{state}</MenuItem>
          })}
        </Select>
      </FormControl>
      <FormControl variant="outlined" sx={{ m: 1, minWidth: 300 }}>
        <InputLabel id="select-outlined-label-city">Select City</InputLabel>
        <Select
          labelId="select-outlined-label-city"
          id="select-outlined-city"
          disabled={state?false:true}
          value={city}
          onChange={(event) => handleChange(event, 'city') }
         >  
        
          {!cities && (
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
          )}
          {cities && cities.map((city)=>{
            console.log(city);
            return <MenuItem  key={city} value={city}>{city}</MenuItem>
          })}
        </Select>
      </FormControl>
      {country && state && city && (
        <Box sx={{ m: 1, minWidth: 300 }}>
          <p> <strong> You Selected {city},</strong>
          {state}, {country}</p>
        </Box>
      )}
    </Box>
    
  )
}

export default App

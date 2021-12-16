import React, {useState, useEffect} from 'react';
import axios from "axios";
import Card from "./components/card";
import {NetworkApiResponse} from "./types"
import './style.css'

const App = () => {
  const [dataObj, setDataObj] = useState<NetworkApiResponse>({});
  useEffect(() => {
    axios.get<NetworkApiResponse>('https://app.subsocial.network/subid/api/v1/chains/properties')
        .then(({data}) => setDataObj(data))
  }, []);
  const filteredDataArr = Object.entries(dataObj).filter(([networkName, networkData]) => {
    return networkData.hasOwnProperty('tokenDecimals') && networkData.hasOwnProperty('tokenSymbol')
  });
  return (
      <div>
        <div className='grid'>
          {filteredDataArr.map(([networkName, networkData]) => (
              <Card key={networkName} name={networkName} img={networkData.icon}/>
          ))}
        </div>
      </div>
  );
};

export default App;

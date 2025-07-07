import React, { useState } from 'react';
import './App.css';
import axios from 'axios';


const App = () => {
  const [inputs, setInputs] = useState({
    Temperature: '',
    Humidity: '',
    WindSpeed: '',
    Rainfall: '',
    FFMC_Index: '',
    DMC_Index: '',
    DC_Index: '',
    ISI_Index: '',
    BUI_Index: ''
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const featureArray = [
      parseFloat(inputs.Temperature),
      parseFloat(inputs.Humidity),
      parseFloat(inputs.WindSpeed),
      parseFloat(inputs.Rainfall),
      parseFloat(inputs.FFMC_Index),
      parseFloat(inputs.DMC_Index),
      parseFloat(inputs.DC_Index),
      parseFloat(inputs.ISI_Index),
      parseFloat(inputs.BUI_Index)
    ];

    try {
      const res = await axios.post('http://127.0.0.1:5000/predict', {
        features: featureArray
      });
      setPrediction(res.data.prediction);
    } catch (err) {
      console.error(err);
      alert('Error connecting to backend');
    }
  };

  return (
    <>
      <div className="nameofproject">ML Project</div>
      <form className='inputSegment' onSubmit={handleSubmit}>
        <input type="text" placeholder="Temperature" name="Temperature" value={inputs.Temperature} onChange={handleChange} />
        <input type="text" placeholder="Humidity" name="Humidity" value={inputs.Humidity} onChange={handleChange} />
        <input type="text" placeholder="WindSpeed" name="WindSpeed" value={inputs.WindSpeed} onChange={handleChange} />
        <input type="text" placeholder="Rainfall" name="Rainfall" value={inputs.Rainfall} onChange={handleChange} />
        <input type="text" placeholder="FFMC_Index" name="FFMC_Index" value={inputs.FFMC_Index} onChange={handleChange} />
        <input type="text" placeholder="DMC_Index" name="DMC_Index" value={inputs.DMC_Index} onChange={handleChange} />
        <input type="text" placeholder="DC_Index" name="DC_Index" value={inputs.DC_Index} onChange={handleChange} />
        <input type="text" placeholder="ISI_Index" name="ISI_Index" value={inputs.ISI_Index} onChange={handleChange} />
        <input type="text" placeholder="BUI_Index" name="BUI_Index" value={inputs.BUI_Index} onChange={handleChange} />
        
        <button type="submit">Submit</button>
      </form>

      {prediction !== null && (
        <div className="predictionResult">
          <h2>Predicted FWI Index: {prediction.toFixed(2)}</h2>
        </div>
      )}
    </>
  );
};

export default App;



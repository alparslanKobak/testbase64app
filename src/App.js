import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [base64Image, setBase64Image] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/images'); // JSON Server'dan veri çekiyoruz
        const data = response.data;
        if (data && data.length > 0) {
          const imagePath = data[0].path;
          await fetchImageAsBase64(imagePath);
        }
      } catch (error) {
        console.error('Error fetching image data:', error);
      }
    };

    fetchData();
  }, []);

  const fetchImageAsBase64 = async (imagePath) => {
    try {
      // public klasöründeki dosyayı fetch etmek için tam yolu kullanıyoruz
      const response = await fetch(`${process.env.PUBLIC_URL}${imagePath}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64Image(reader.result); // base64 string'in tamamını kullanıyoruz
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error('Error converting image to base64:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={base64Image} className="App-logo" alt="Fetched from JSON" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <br />

      {base64Image ? (
        <img src={base64Image} alt="Fetched from JSON" />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;

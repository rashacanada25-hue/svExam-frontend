import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState("לחץ על הכפתור כדי לקבל נתונים מהשרת");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      // כאן אנחנו פונים לשרת שרץ בפורט 3000
      const response = await axios.get('http://localhost:3000/');
      setMessage(response.data);
    } catch (error) {
      setMessage("שגיאת חיבור: וודא שה-Backend רץ בפורט 3000");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'Arial' }}>
      <h1>בדיקת חיבור פרויקט</h1>
      
      <div style={{ 
        margin: '20px auto', 
        padding: '20px', 
        border: '2px solid #333', 
        width: '300px',
        borderRadius: '8px'
      }}>
        {loading ? <p>טוען נתונים מהשרת...</p> : <p>{message}</p>}
      </div>

      <button 
        onClick={fetchData} 
        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
        Click me
      </button>
    </div>
  );
}

export default App;
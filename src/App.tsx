import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState("לחץ על הכפתור כדי לקבל נתונים מהשרת");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      // פנייה לשרת שרץ בפורט 3000
      const response = await axios.get('http://localhost:3000/');
      setMessage(response.data);
    } catch (error) {
      setMessage("שגיאת חיבור: וודא שה-Backend רץ בפורט 3000");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center font-sans p-4" dir="rtl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">בדיקת חיבור פרויקט</h1>
      
      <div className="w-full max-w-sm bg-white border-2 border-gray-300 rounded-xl p-6 shadow-sm text-center mb-6 transition-all">
        {loading ? (
          <p className="text-gray-500 animate-pulse">טוען נתונים מהשרת...</p>
        ) : (
          <p className="text-gray-700 font-medium text-lg leading-relaxed">{message}</p>
        )}
      </div>

      <button 
        onClick={fetchData} 
        disabled={loading}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition-all duration-200"
      >
        {loading ? "בטעינה..." : "לחץ לקבלת נתונים"}
      </button>
    </div>
  );
}

export default App;
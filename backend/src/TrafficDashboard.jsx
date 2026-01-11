import { useEffect, useState } from 'react';

export default function TrafficDashboard() {
  const [traffic, setTraffic] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('traffic');

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    console.log('Fetching data...');
    setLoading(true);
    setError('');
    
    try {
      // Fetch traffic
      console.log('Fetching traffic from http://localhost:5000/api/traffic');
      const trafficRes = await fetch('http://localhost:5000/api/traffic');
      console.log('Traffic response status:', trafficRes.status);
      
      if (!trafficRes.ok) {
        throw new Error(`Traffic fetch failed: ${trafficRes.status}`);
      }
      
      const trafficData = await trafficRes.json();
      console.log('Traffic data received:', trafficData);
      
      if (trafficData.data) {
        setTraffic(trafficData.data);
      }
      
      // Fetch vehicles
      console.log('Fetching vehicles from http://localhost:5000/api/vehicles');
      const vehiclesRes = await fetch('http://localhost:5000/api/vehicles');
      console.log('Vehicles response status:', vehiclesRes.status);
      
      if (!vehiclesRes.ok) {
        throw new Error(`Vehicles fetch failed: ${vehiclesRes.status}`);
      }
      
      const vehiclesData = await vehiclesRes.json();
      console.log('Vehicles data received:', vehiclesData);
      
      if (vehiclesData.data) {
        setVehicles(vehiclesData.data);
      }
      
      setLoading(false);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load data: ' + err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h1>🚦 Traffic Control System</h1>
        <p>Loading data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>
        <h1>🚦 Traffic Control System</h1>
        <p>Error: {error}</p>
        <button onClick={fetchAllData}>Retry</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>🚦 Traffic Control System</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => setActiveTab('traffic')}
          style={{ 
            marginRight: '10px',
            padding: '10px 20px',
            backgroundColor: activeTab === 'traffic' ? '#007bff' : '#ccc',
            color: activeTab === 'traffic' ? 'white' : 'black',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Traffic ({traffic.length})
        </button>
        <button 
          onClick={() => setActiveTab('vehicles')}
          style={{ 
            padding: '10px 20px',
            backgroundColor: activeTab === 'vehicles' ? '#007bff' : '#ccc',
            color: activeTab === 'vehicles' ? 'white' : 'black',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Vehicles ({vehicles.length})
        </button>
      </div>

      {activeTab === 'traffic' && (
        <div>
          <h2>Traffic Data</h2>
          {traffic.length === 0 ? (
            <p>No traffic data</p>
          ) : (
            <div>
              {traffic.map(item => (
                <div 
                  key={item.id}
                  style={{
                    border: '1px solid #ddd',
                    padding: '15px',
                    marginBottom: '10px',
                    borderRadius: '5px',
                    backgroundColor: '#f9f9f9'
                  }}
                >
                  <h3>{item.location}</h3>
                  <p><strong>Level:</strong> {(item.level * 100).toFixed(0)}%</p>
                  <p><strong>Vehicles:</strong> {item.vehicles}</p>
                  <p><strong>Speed:</strong> {item.speed} km/h</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'vehicles' && (
        <div>
          <h2>Vehicles Data</h2>
          {vehicles.length === 0 ? (
            <p>No vehicles data</p>
          ) : (
            <div>
              {vehicles.map(item => (
                <div 
                  key={item.id}
                  style={{
                    border: '1px solid #ddd',
                    padding: '15px',
                    marginBottom: '10px',
                    borderRadius: '5px',
                    backgroundColor: '#f9f9f9'
                  }}
                >
                  <h3>{item.type.toUpperCase()} - {item.plate}</h3>
                  <p><strong>Location:</strong> {item.location}</p>
                  <p><strong>Speed:</strong> {item.speed} km/h</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <button 
        onClick={fetchAllData}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          borderRadius: '5px'
        }}
      >
        Refresh Data
      </button>
    </div>
  );
}
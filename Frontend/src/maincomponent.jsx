import React, { useState, useEffect } from 'react';
import {
  Camera, Activity, Car, TrendingUp, AlertTriangle, Clock, MapPin, Zap, Radio,
  Shield, Users, Wifi, Signal, Battery, Settings, Navigation, Cloud, Wind,
  Thermometer, Eye, Bell, Download, Video, PlayCircle, Pause, BarChart3,
  Brain, Crosshair, Layers, AlertCircle, CheckCircle, XCircle
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, RadarChart,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ScatterChart, Scatter
} from 'recharts';

const AITrafficControlCenter = () => {
  // Core State Management - Initialize with realistic demo data
  const [vehicleCount, setVehicleCount] = useState(247);
  const [avgSpeed, setAvgSpeed] = useState(58);
  const [congestionLevel, setCongestionLevel] = useState('Medium');
  const [activeAlerts, setActiveAlerts] = useState(2);
  const [historicalData, setHistoricalData] = useState([
    { time: '14:20', count: 45, speed: 62 },
    { time: '14:22', count: 52, speed: 58 },
    { time: '14:24', count: 48, speed: 60 },
    { time: '14:26', count: 55, speed: 56 },
    { time: '14:28', count: 51, speed: 59 },
    { time: '14:30', count: 58, speed: 55 },
  ]);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [isLive, setIsLive] = useState(true);
  const [trafficLights, setTrafficLights] = useState([]);
  const [violations, setViolations] = useState([]);
  const [pollutionLevel, setPollutionLevel] = useState(68);
  const [peakHours, setPeakHours] = useState([]);
  const [emergencyVehicles, setEmergencyVehicles] = useState(1);
  const [parkingAvailability, setParkingAvailability] = useState(42);
  const [roadConditions, setRoadConditions] = useState([]);
  const [selectedTab, setSelectedTab] = useState('overview');

  // Advanced AI/ML State
  const [weatherData, setWeatherData] = useState({ temp: 28, condition: 'Sunny', humidity: 65 });
  const [aiPredictions, setAiPredictions] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [speedViolations, setSpeedViolations] = useState(12);
  const [mlAccuracy, setMlAccuracy] = useState(94);
  const [cameraHealth, setCameraHealth] = useState([]);
  const [laneOccupancy, setLaneOccupancy] = useState([]);
  const [trafficDensity, setTrafficDensity] = useState([]);

  // Real-time Data Updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (isLive) {
        const newCount = Math.floor(Math.random() * 50) + 20;
        setVehicleCount(prev => prev + Math.floor(Math.random() * 5));
        const newSpeed = Math.floor(Math.random() * 30) + 40;
        setAvgSpeed(newSpeed);

        // Congestion Logic
        if (newCount > 60) setCongestionLevel('High');
        else if (newCount > 40) setCongestionLevel('Medium');
        else setCongestionLevel('Low');

        // Update Metrics
        setActiveAlerts(Math.floor(Math.random() * 3));
        setPollutionLevel(Math.floor(Math.random() * 100));
        setEmergencyVehicles(Math.floor(Math.random() * 3));
        setParkingAvailability(Math.floor(Math.random() * 100));
        setSpeedViolations(Math.floor(Math.random() * 15));
        setMlAccuracy(85 + Math.floor(Math.random() * 12));

        // Historical Data
        const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        setHistoricalData(prev => {
          const updated = [...prev, { time, count: newCount, speed: newSpeed }];
          return updated.slice(-10);
        });

        // Weather Simulation
        setWeatherData({
          temp: 20 + Math.floor(Math.random() * 15),
          condition: ['Sunny', 'Cloudy', 'Rainy'][Math.floor(Math.random() * 3)],
          humidity: 40 + Math.floor(Math.random() * 40)
        });
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isLive]);

  // Initialize Data on Mount
  useEffect(() => {
    // Vehicle Types
    setVehicleTypes([
      { name: 'Cars', value: 65, color: '#3b82f6' },
      { name: 'Bikes', value: 20, color: '#10b981' },
      { name: 'Trucks', value: 10, color: '#f59e0b' },
      { name: 'Buses', value: 5, color: '#ef4444' }
    ]);

    // Traffic Lights - Smart adaptive signals
    setTrafficLights([
      { id: 'TL-01', location: 'Main St & 5th Ave', status: 'green', timer: 45, vehicles: 18 },
      { id: 'TL-02', location: 'Park Rd & Central Ave', status: 'red', timer: 28, vehicles: 34 },
      { id: 'TL-03', location: 'Highway Exit 12A', status: 'yellow', timer: 5, vehicles: 12 },
      { id: 'TL-04', location: 'Downtown Plaza Circle', status: 'green', timer: 52, vehicles: 22 },
      { id: 'TL-05', location: 'North Gate Junction', status: 'red', timer: 15, vehicles: 29 },
      { id: 'TL-06', location: 'South Express Flyover', status: 'green', timer: 38, vehicles: 16 }
    ]);

    // Violations - More realistic data
    const now = new Date();
    setViolations([
      { time: `${now.getHours()}:${String(now.getMinutes()-2).padStart(2, '0')}:22`, type: 'Speeding', location: 'Highway 101 North', vehicle: 'TN-12-AB-4521', severity: 'high', speed: '115 km/h' },
      { time: `${now.getHours()}:${String(now.getMinutes()-5).padStart(2, '0')}:15`, type: 'Red Light', location: 'Main St & 5th Ave', vehicle: 'TN-08-XY-7893', severity: 'medium', speed: '48 km/h' },
      { time: `${now.getHours()}:${String(now.getMinutes()-8).padStart(2, '0')}:08`, type: 'Wrong Lane', location: 'Park Road Junction', vehicle: 'TN-15-CD-4567', severity: 'low', speed: '62 km/h' },
      { time: `${now.getHours()}:${String(now.getMinutes()-12).padStart(2, '0')}:45`, type: 'No Helmet', location: 'Downtown Plaza', vehicle: 'TN-22-MN-8901', severity: 'medium', speed: '35 km/h' }
    ]);

    // Peak Hours
    setPeakHours([
      { hour: '6 AM', vehicles: 120 },
      { hour: '9 AM', vehicles: 280 },
      { hour: '12 PM', vehicles: 180 },
      { hour: '3 PM', vehicles: 150 },
      { hour: '6 PM', vehicles: 320 },
      { hour: '9 PM', vehicles: 90 }
    ]);

    // Road Conditions
    setRoadConditions([
      { area: 'Traffic Flow', score: 85 },
      { area: 'Road Safety', score: 92 },
      { area: 'Air Quality', score: 65 },
      { area: 'Signal Timing', score: 88 },
      { area: 'Emergency Response', score: 95 },
      { area: 'Parking Mgmt', score: 70 }
    ]);

    // AI Predictions
    setAiPredictions([
      { time: 'Next 15 min', congestion: 'Medium', confidence: 87 },
      { time: 'Next 30 min', congestion: 'High', confidence: 82 },
      { time: 'Next 1 hour', congestion: 'Low', confidence: 75 }
    ]);

    // Incidents - Real incident management
    setIncidents([
      { id: 'INC-2401-087', type: 'Minor Accident', location: 'Highway 12 - Mile 45', status: 'Active', responders: 3 },
      { id: 'INC-2401-082', type: 'Road Maintenance', location: 'Main St Bridge', status: 'Resolved', responders: 1 },
      { id: 'INC-2401-091', type: 'Vehicle Breakdown', location: 'Park Rd Overpass', status: 'Active', responders: 2 }
    ]);

    // Camera Health - AI-powered surveillance network
    setCameraHealth([
      { id: 'CAM-NG-01', status: 'online', uptime: 99.8, location: 'North Gate Main Entrance' },
      { id: 'CAM-SJ-02', status: 'online', uptime: 98.5, location: 'South Junction Overpass' },
      { id: 'CAM-EH-03', status: 'maintenance', uptime: 95.2, location: 'East Highway Toll Plaza' },
      { id: 'CAM-WP-04', status: 'online', uptime: 99.9, location: 'West Plaza Circle' },
      { id: 'CAM-CT-05', status: 'online', uptime: 99.6, location: 'Central Business District' },
      { id: 'CAM-DT-06', status: 'online', uptime: 97.8, location: 'Downtown Transit Hub' }
    ]);

    // Lane Occupancy
    setLaneOccupancy([
      { lane: 'Lane 1', occupancy: 75, speed: 65 },
      { lane: 'Lane 2', occupancy: 60, speed: 70 },
      { lane: 'Lane 3', occupancy: 45, speed: 80 },
      { lane: 'Lane 4', occupancy: 85, speed: 55 }
    ]);

    // Traffic Density
    setTrafficDensity([
      { zone: 'Zone A', density: 85, x: 30, y: 40 },
      { zone: 'Zone B', density: 60, x: 50, y: 60 },
      { zone: 'Zone C', density: 95, x: 70, y: 35 },
      { zone: 'Zone D', density: 40, x: 45, y: 75 }
    ]);
  }, []);

  // Utility Functions
  const getCongestionColor = () => {
    if (congestionLevel === 'High') return 'bg-red-500';
    if (congestionLevel === 'Medium') return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getSignalColor = (status) => {
    if (status === 'green') return 'bg-green-500';
    if (status === 'yellow') return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getSeverityColor = (severity) => {
    if (severity === 'high') return 'bg-red-500/20 text-red-400 border-red-500';
    if (severity === 'medium') return 'bg-yellow-500/20 text-yellow-400 border-yellow-500';
    return 'bg-blue-500/20 text-blue-400 border-blue-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                AI Traffic Control Center
              </h1>
              <div className="px-4 py-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/50 rounded-lg backdrop-blur">
                <span className="text-amber-400 font-bold text-sm flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  PORTFOLIO DEMO
                </span>
              </div>
            </div>
            <p className="text-slate-400 mt-2 flex items-center gap-2">
              <Brain className="w-4 h-4 text-purple-400" />
              YOLOv8 + LSTM + Reinforcement Learning | Real-time Smart City Management
            </p>
            <p className="text-slate-500 text-sm mt-1 flex items-center gap-2">
              <Layers className="w-3 h-3" />
              Full Stack: React.js • Node.js • Express • MongoDB • WebSocket
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur">
              <Cloud className="w-4 h-4 text-blue-400" />
              <span className="text-sm">{weatherData.condition} {weatherData.temp}°C</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur">
              <Signal className="w-4 h-4 text-green-400" />
              <span className="text-sm">5G Connected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></div>
              <span className="text-sm font-medium">{isLive ? 'LIVE STREAM' : 'PAUSED'}</span>
            </div>
            <button
              onClick={() => setIsLive(!isLive)}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg transition-all shadow-lg shadow-purple-500/30"
            >
              {isLive ? <Pause className="w-4 h-4" /> : <PlayCircle className="w-4 h-4" />}
            </button>
            <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Enhanced Tabs */}
        <div className="flex gap-2 bg-white/5 p-1 rounded-xl backdrop-blur border border-white/10 overflow-x-auto">
          {[
            { id: 'overview', icon: Layers, label: 'Overview' },
            { id: 'ai-analytics', icon: Brain, label: 'AI Analytics' },
            { id: 'signals', icon: Radio, label: 'Smart Signals' },
            { id: 'violations', icon: AlertTriangle, label: 'Violations' },
            { id: 'monitoring', icon: Video, label: 'Live Monitoring' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all whitespace-nowrap ${
                selectedTab === tab.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Enhanced Stats Grid - 8 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4 mb-8">
        {/* Vehicle Count */}
        <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 backdrop-blur-lg rounded-xl p-4 border border-blue-500/30 hover:border-blue-400/60 transition-all hover:shadow-lg hover:shadow-blue-500/30">
          <div className="flex items-center justify-between mb-2">
            <Car className="w-6 h-6 text-blue-400" />
            <TrendingUp className="w-4 h-4 text-green-400" />
          </div>
          <h3 className="text-slate-400 text-xs mb-1">Total Vehicles</h3>
          <p className="text-2xl font-bold text-white">{vehicleCount}</p>
          <p className="text-xs text-green-400 mt-1">+12% ↑</p>
        </div>

        {/* Speed & Congestion */}
        <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 backdrop-blur-lg rounded-xl p-4 border border-green-500/30 hover:border-green-400/60 transition-all hover:shadow-lg hover:shadow-green-500/30">
          <div className="flex items-center justify-between mb-2">
            <Activity className="w-6 h-6 text-green-400" />
            <div className={`px-2 py-1 rounded text-xs ${getCongestionColor()}`}>
              {congestionLevel}
            </div>
          </div>
          <h3 className="text-slate-400 text-xs mb-1">Avg Speed</h3>
          <p className="text-2xl font-bold text-white">{avgSpeed} km/h</p>
          <p className="text-xs text-slate-400 mt-1">{congestionLevel} traffic</p>
        </div>

        {/* Cameras */}
        <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 backdrop-blur-lg rounded-xl p-4 border border-purple-500/30 hover:border-purple-400/60 transition-all hover:shadow-lg hover:shadow-purple-500/30">
          <div className="flex items-center justify-between mb-2">
            <Camera className="w-6 h-6 text-purple-400" />
            <Eye className="w-4 h-4 text-purple-400" />
          </div>
          <h3 className="text-slate-400 text-xs mb-1">AI Cameras</h3>
          <p className="text-2xl font-bold text-white">24/24</p>
          <p className="text-xs text-purple-400 mt-1">All active</p>
        </div>

        {/* Alerts */}
        <div className="bg-gradient-to-br from-red-500/20 to-red-600/10 backdrop-blur-lg rounded-xl p-4 border border-red-500/30 hover:border-red-400/60 transition-all hover:shadow-lg hover:shadow-red-500/30">
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle className="w-6 h-6 text-red-400" />
            {activeAlerts > 0 && <Bell className="w-4 h-4 text-red-400 animate-bounce" />}
          </div>
          <h3 className="text-slate-400 text-xs mb-1">Live Alerts</h3>
          <p className="text-2xl font-bold text-white">{activeAlerts}</p>
          <p className="text-xs text-red-400 mt-1">Critical: {activeAlerts > 0 ? 1 : 0}</p>
        </div>

        {/* Air Quality */}
        <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 backdrop-blur-lg rounded-xl p-4 border border-orange-500/30 hover:border-orange-400/60 transition-all hover:shadow-lg hover:shadow-orange-500/30">
          <div className="flex items-center justify-between mb-2">
            <Wind className="w-6 h-6 text-orange-400" />
            <Thermometer className="w-4 h-4 text-orange-400" />
          </div>
          <h3 className="text-slate-400 text-xs mb-1">Air Quality</h3>
          <p className="text-2xl font-bold text-white">{pollutionLevel}</p>
          <p className="text-xs text-orange-400 mt-1">AQI Level</p>
        </div>

        {/* Emergency */}
        <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 backdrop-blur-lg rounded-xl p-4 border border-cyan-500/30 hover:border-cyan-400/60 transition-all hover:shadow-lg hover:shadow-cyan-500/30">
          <div className="flex items-center justify-between mb-2">
            <Shield className="w-6 h-6 text-cyan-400" />
            <Navigation className="w-4 h-4 text-cyan-400" />
          </div>
          <h3 className="text-slate-400 text-xs mb-1">Emergency</h3>
          <p className="text-2xl font-bold text-white">{emergencyVehicles}</p>
          <p className="text-xs text-cyan-400 mt-1">Active units</p>
        </div>

        {/* ML Accuracy */}
        <div className="bg-gradient-to-br from-pink-500/20 to-pink-600/10 backdrop-blur-lg rounded-xl p-4 border border-pink-500/30 hover:border-pink-400/60 transition-all hover:shadow-lg hover:shadow-pink-500/30">
          <div className="flex items-center justify-between mb-2">
            <Crosshair className="w-6 h-6 text-pink-400" />
            <Brain className="w-4 h-4 text-pink-400" />
          </div>
          <h3 className="text-slate-400 text-xs mb-1">ML Accuracy</h3>
          <p className="text-2xl font-bold text-white">{mlAccuracy}%</p>
          <p className="text-xs text-pink-400 mt-1">YOLOv8</p>
        </div>

        {/* Speed Violations */}
        <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 backdrop-blur-lg rounded-xl p-4 border border-yellow-500/30 hover:border-yellow-400/60 transition-all hover:shadow-lg hover:shadow-yellow-500/30">
          <div className="flex items-center justify-between mb-2">
            <Zap className="w-6 h-6 text-yellow-400" />
            <AlertCircle className="w-4 h-4 text-yellow-400" />
          </div>
          <h3 className="text-slate-400 text-xs mb-1">Speed Violations</h3>
          <p className="text-2xl font-bold text-white">{speedViolations}</p>
          <p className="text-xs text-yellow-400 mt-1">Last hour</p>
        </div>
      </div>

      {/* TAB: OVERVIEW */}
      {selectedTab === 'overview' && (
        <>
          {/* Traffic Flow & Vehicle Classification */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-400" />
                  Real-Time Traffic Flow
                </h3>
                <button className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-sm hover:bg-blue-500/30 transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={historicalData}>
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="time" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }} labelStyle={{ color: '#fff' }} />
                  <Area type="monotone" dataKey="count" stroke="#3b82f6" fillOpacity={1} fill="url(#colorCount)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-purple-400" />
                Vehicle Classification
              </h3>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie data={vehicleTypes} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                    {vehicleTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-3 mt-4">
                {vehicleTypes.map((type, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: type.color }}></div>
                      <span className="text-sm text-slate-300">{type.name}</span>
                    </div>
                    <span className="text-sm font-bold">{type.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Lane Occupancy & Traffic Density */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Layers className="w-5 h-5 text-cyan-400" />
                Lane Occupancy Analysis
              </h3>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={laneOccupancy}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="lane" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }} />
                  <Bar dataKey="occupancy" fill="#06b6d4" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="speed" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-pink-400" />
                Traffic Density Heatmap
              </h3>
              <ResponsiveContainer width="100%" height={280}>
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="x" stroke="#9ca3af" />
                  <YAxis dataKey="y" stroke="#9ca3af" />
                  <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }} cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter name="Density" data={trafficDensity} fill="#ec4899" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Peak Hours & System Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-yellow-400" />
                Peak Hours Analysis
              </h3>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={peakHours}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="hour" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }} />
                  <Bar dataKey="vehicles" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-400" />
                System Performance Radar
              </h3>
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={roadConditions}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis dataKey="area" stroke="#9ca3af" />
                  <PolarRadiusAxis stroke="#9ca3af" />
                  <Radar name="Score" dataKey="score" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                  <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      {/* TAB: AI ANALYTICS */}
      {selectedTab === 'ai-analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-xl p-6 border border-purple-500/30">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-400" />
              AI Traffic Predictions (LSTM Model)
            </h3>
            <div className="space-y-4">
              {aiPredictions.map((pred, idx) => (
                <div key={idx} className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-400">{pred.time}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      pred.congestion === 'High' ? 'bg-red-500' : 
                      pred.congestion === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}>
                      {pred.congestion} Congestion
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">ML Confidence</span>
                    <span className="text-sm font-bold text-purple-400">{pred.confidence}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
                    <div className="bg-purple-500 h-2 rounded-full transition-all" style={{width: `${pred.confidence}%`}}></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg border border-blue-500/30">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-medium">Reinforcement Learning Active</span>
              </div>
              <p className="text-xs text-slate-300 mt-1">Adaptive signal optimization based on predicted traffic patterns</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Camera className="w-5 h-5 text-cyan-400" />
              Camera Health Monitoring
            </h3>
            <div className="space-y-3">
              {cameraHealth.map((cam, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      cam.status === 'online' ? 'bg-green-500 animate-pulse' : 
                      cam.status === 'maintenance' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                    <div>
                      <div className="font-medium text-sm">{cam.id}</div>
                      <div className="text-xs text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {cam.location}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-green-400">{cam.uptime}%</div>
                    <div className="text-xs text-slate-400">Uptime</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Incidents */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 lg:col-span-2">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-400" />
              Active Incidents & Emergency Response
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {incidents.map((inc, idx) => (
                <div key={idx} className={`p-4 rounded-lg border ${
                  inc.status === 'Active' 
                    ? 'bg-red-500/10 border-red-500/30' 
                    : 'bg-green-500/10 border-green-500/30'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-lg">{inc.id}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      inc.status === 'Active' ? 'bg-red-500' : 'bg-green-500'
                    }`}>
                      {inc.status}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <AlertTriangle className="w-4 h-4 text-orange-400" />
                      <span className="text-slate-300">{inc.type}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-blue-400" />
                      <span className="text-slate-300">{inc.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Shield className="w-4 h-4 text-cyan-400" />
                      <span className="text-slate-300">{inc.responders} Emergency Units</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB: SIGNALS */}
      {selectedTab === 'signals' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Radio className="w-5 h-5 text-purple-400" />
              Smart Traffic Light Control
            </h3>
            <div className="space-y-3">
              {trafficLights.map((light, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors border border-white/10">
                  <div>
                    <div className="font-medium flex items-center gap-2">
                      {light.id}
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">
                        {light.vehicles} vehicles
                      </span>
                    </div>
                    <div className="text-sm text-slate-400 flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" />
                      {light.location}
                    </div>
                  </div>
                  <div className={`w-16 h-16 rounded-full ${getSignalColor(light.status)} flex items-center justify-center font-bold text-xl shadow-lg`}>
                    {light.timer}s
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Wifi className="w-5 h-5 text-cyan-400" />
              Adaptive Signal Optimization
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="w-5 h-5 text-purple-400" />
                  <span className="font-medium">AI Optimization Engine</span>
                </div>
                <p className="text-sm text-slate-300">Real-time signal timing adjustment using reinforcement learning</p>
              </div>

              <div className="p-4 bg-white/5 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-400">Green Wave Efficiency</span>
                  <span className="text-sm font-bold text-green-400">87%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full" style={{width: '87%'}}></div>
                </div>
              </div>

              <div className="p-4 bg-white/5 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-400">Average Wait Time</span>
                  <span className="text-sm font-bold text-blue-400">42s</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full" style={{width: '60%'}}></div>
                </div>
              </div>

              <div className="p-4 bg-white/5 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-400">Emergency Priority</span>
                  <span className="text-sm font-bold text-red-400">Active</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>3 emergency vehicles detected - Priority routing enabled</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: VIOLATIONS */}
      {selectedTab === 'violations' && (
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            Traffic Violations & ANPR Detection
          </h3>
          <div className="space-y-3">
            {violations.map((violation, idx) => (
              <div key={idx} className={`flex items-center justify-between p-4 rounded-lg border ${getSeverityColor(violation.severity)} hover:bg-white/5 transition-colors`}>
                <div className="flex items-center gap-4">
                  <span className="text-slate-400 text-sm font-mono">{violation.time}</span>
                  <div>
                    <div className="font-medium flex items-center gap-2">
                      {violation.type}
                      <span className="px-2 py-1 bg-white/10 rounded text-xs">{violation.speed}</span>
                    </div>
                    <div className="text-sm text-slate-400 flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" />
                      {violation.location}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 bg-white/10 rounded-full text-sm font-mono">{violation.vehicle}</span>
                  <span className={`px-4 py-2 rounded-full text-xs font-bold uppercase ${
                    violation.severity === 'high' ? 'bg-red-500 shadow-lg shadow-red-500/30' :
                    violation.severity === 'medium' ? 'bg-yellow-500 shadow-lg shadow-yellow-500/30' : 'bg-blue-500 shadow-lg shadow-blue-500/30'
                  }`}>
                    {violation.severity}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="p-4 bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-lg border border-red-500/30">
              <div className="text-2xl font-bold text-white">{speedViolations}</div>
              <div className="text-sm text-slate-400 mt-1">Speed Violations</div>
            </div>
            <div className="p-4 bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 rounded-lg border border-yellow-500/30">
              <div className="text-2xl font-bold text-white">8</div>
              <div className="text-sm text-slate-400 mt-1">Red Light Violations</div>
            </div>
            <div className="p-4 bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-lg border border-blue-500/30">
              <div className="text-2xl font-bold text-white">5</div>
              <div className="text-sm text-slate-400 mt-1">Lane Violations</div>
            </div>
          </div>
        </div>
      )}

      {                         }
      {selectedTab === 'monitoring' && (
        <>
          {/* Live Camera Feeds & Parking */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 lg:col-span-2">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Video className="w-5 h-5 text-purple-400" />
                Live Camera Feeds
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((cam) => (
                  <div key={cam} className="relative aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg overflow-hidden border border-white/10 group cursor-pointer">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PlayCircle className="w-12 h-12 text-white/50 group-hover:text-white/80 transition-colors" />
                    </div>
                    <div className="absolute top-2 left-2 px-2 py-1 bg-red-500 rounded text-xs font-bold flex items-center gap-1">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      LIVE
                    </div>
                    <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 rounded text-xs">
                      Camera {cam}
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-1 bg-green-500/80 rounded text-xs">
                      {Math.floor(Math.random() * 30 + 50)} FPS
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Crosshair className="w-5 h-5 text-cyan-400" />
                Parking Availability
              </h3>
              <div className="flex items-center justify-center">
                <div className="relative w-40 h-40">
                  <svg className="w-40 h-40 transform -rotate-90">
                    <circle cx="80" cy="80" r="70" stroke="#374151" strokeWidth="10" fill="none"/>
                    <circle cx="80" cy="80" r="70" stroke="#10b981" strokeWidth="10" fill="none"
                      strokeDasharray={`${parkingAvailability * 4.4} 440`} strokeLinecap="round"/>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-3xl font-bold">{parkingAvailability}%</span>
                    <span className="text-xs text-slate-400">Available</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between p-2 bg-white/5 rounded-lg">
                  <span className="text-slate-400 text-sm">Total</span>
                  <span className="font-bold text-sm">500</span>
                </div>
                <div className="flex justify-between p-2 bg-white/5 rounded-lg">
                  <span className="text-slate-400 text-sm">Occupied</span>
                  <span className="font-bold text-sm text-red-400">{Math.floor(500 * (1 - parkingAvailability/100))}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Environmental & Public Transport */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-lg rounded-xl p-6 border border-orange-500/30">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Wind className="w-5 h-5 text-orange-400" />
                Environmental Impact
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-300 text-sm">CO2 Emission</span>
                    <span className="text-orange-400 font-bold text-sm">Medium</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-3">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full shadow-lg shadow-orange-500/50" style={{width: '60%'}}></div>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">245 kg/hour estimated</p>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-300 text-sm">Air Quality</span>
                    <span className="text-green-400 font-bold text-sm">Good</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-3">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full shadow-lg shadow-green-500/50" style={{width: '75%'}}></div>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">AQI: {pollutionLevel} - Healthy range</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-400" />
                Public Transport Integration
              </h3>
              <div className="space-y-3">
                {[
                  { route: 'Bus 42A', status: 'On Time', passengers: 45, nextArrival: '2 min' },
                  { route: 'Bus 17B', status: 'Delayed', passengers: 38, nextArrival: '7 min' },
                  { route: 'Metro Blue', status: 'On Time', passengers: 120, nextArrival: '1 min' },
                  { route: 'Bus 9C', status: 'On Time', passengers: 28, nextArrival: '4 min' }
                ].map((transport, idx) => (
                  <div key={idx} className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{transport.route}</span>
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        transport.status === 'On Time' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}>
                        {transport.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>{transport.passengers} passengers</span>
                      <span>ETA: {transport.nextArrival}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Real-Time Detection Feed */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5 text-green-400" />
              Real-Time YOLOv8 Detection Feed
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {[
                { time: '14:32:15', type: 'Car', speed: '65 km/h', lane: 'Lane 2', status: 'normal', confidence: 0.94, plate: 'TN-01-AB-1234' },
                { time: '14:32:12', type: 'Bus', speed: '45 km/h', lane: 'Lane 1', status: 'normal', confidence: 0.89, plate: 'TN-02-CD-5678' },
                { time: '14:32:08', type: 'Motorcycle', speed: '85 km/h', lane: 'Lane 3', status: 'warning', confidence: 0.91, plate: 'TN-03-EF-9012' },
                { time: '14:32:05', type: 'Truck', speed: '55 km/h', lane: 'Lane 2', status: 'normal', confidence: 0.87, plate: 'TN-04-GH-3456' },
                { time: '14:32:01', type: 'Car', speed: '70 km/h', lane: 'Lane 1', status: 'normal', confidence: 0.96, plate: 'TN-05-IJ-7890' }
              ].map((detection, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all border border-white/5 hover:border-white/20 text-sm">
                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-slate-400 font-mono text-xs w-16">{detection.time}</span>
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs font-medium w-20 text-center">{detection.type}</span>
                    <span className="text-slate-300 w-16 text-xs">{detection.lane}</span>
                    <span className="text-purple-400 font-mono text-xs w-28">{detection.plate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-xs w-16">{detection.speed}</span>
                    <span className="text-green-400 font-bold text-xs">{(detection.confidence * 100).toFixed(0)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Footer */}
      <div className="mt-8 text-center text-slate-400 text-sm border-t border-white/10 pt-6">
        <p className="flex items-center justify-center gap-2 mb-2">
          <Brain className="w-4 h-4 text-purple-400" />
          AI-Powered Smart City Traffic Control | YOLOv8 + LSTM + Reinforcement Learning
        </p>
        <p className="text-xs text-slate-500">
          Portfolio Project • Simulated Data for Demonstration • Built with React, Node.js & AI/ML Integration
        </p>
      </div>
    </div>
  );
};

export default AITrafficControlCenter;
import React, { useEffect, useState } from 'react';
import SidebarUser from '../components/SidebarUser'; // Réutilise ton composant si la sidebar est commune
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;  if (!API_BASE_URL) {
    console.error("REACT_APP_API_BASE_URL n'est pas défini dans les variables d'environnement");
  }
function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];
  return null;
}

const UserDashboard = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_BASE_URL}/auth/me` , { withCredentials: true })
      .then(res => setCurrentUser(res.data))
      .catch(err => {
        console.error("Erreur récupération user connecté", err);
        if (err.response?.status === 403) {
          navigate('/unauthorized');
        }
      });
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const csrfToken = getCookie('csrf_access_token');
      const res = await axios.post(`${API_BASE_URL}/auth/logout` , {}, {
        headers: { 'X-CSRF-TOKEN': csrfToken },
        withCredentials: true
      });
      alert(res.data.message);
      navigate('/LoginPage');
    } catch (err) {
      console.error('Erreur de déconnexion:', err);
      setError('Impossible de se déconnecter');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <SidebarUser />

      {/* Main content */}
      <div className="flex-1 flex flex-col p-8 overflow-y-auto relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-700">Tableau de bord</h1>
          {currentUser && (
            <div className="relative group">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer shadow">
                {currentUser.role?.charAt(0).toUpperCase()}
              </div>
              <div className="absolute right-0 top-12 bg-white shadow-lg rounded p-4 hidden group-hover:block z-50">
                <p className="font-bold text-gray-700">{currentUser.nom} {currentUser.prenom}</p>
                <p className="text-sm text-gray-500">{currentUser.role}</p>
                <div className="mt-2 space-y-2">
                  <button className="text-blue-600 hover:underline w-full text-left">Mon profil</button>
                  <button onClick={handleLogout} className="text-red-500 hover:underline w-full text-left">Déconnexion</button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Message de bienvenue */}
        {currentUser && (
          <div className="text-lg text-gray-700 mb-4">
            Bienvenue <span className="font-semibold">{currentUser.nom} {currentUser.prenom}</span> !
          </div>
        )}

        {/* Contenu spécifique utilisateur */}
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Vos informations</h2>
          <ul className="text-gray-600 space-y-1">
            <li><strong>Email :</strong> {currentUser?.email}</li>
            <li><strong>Téléphone :</strong> {currentUser?.numero_tel}</li>
            <li><strong>Rôle :</strong> {currentUser?.role}</li>
          </ul>
        </div>

        {error && <div className="mt-4 text-red-500">{error}</div>}
      </div>
    </div>
  );
};

export default UserDashboard;

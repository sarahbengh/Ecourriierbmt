import React, { useState, useEffect } from 'react';
import axios from 'axios';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  if (!API_BASE_URL) {
    console.error("REACT_APP_API_BASE_URL n'est pas défini dans les variables d'environnement");
  }
const AjouterContact = () => {
  const [formData, setFormData] = useState({
    nom_complet: '',
    email: '',
    numero_tel: '',
    adresse: '',
    organisation: ''
  });

  const [message, setMessage] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/auth/me` , { withCredentials: true })
      .then(res => setCurrentUser(res.data))
      .catch(err => {
        console.error("Erreur récupération user connecté", err);
      });
  }, []);

 const handleLogout = async () => {
  try {
    await axios.post(`${API_BASE_URL}/auth/logout`, {}, { withCredentials: true });
    window.location.href = "/";
  } catch (err) {
    console.error("Erreur lors de la déconnexion :", err);
  }
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser || !currentUser.id) {
      setMessage("Utilisateur non identifié.");
      return;
    }

    try {
      const dataToSend = {
        ...formData,
        utilisateur_id: currentUser.id // ou currentUser._id selon ta base de données
      };

      const res = await axios.post(
       const handleLogout = async () => {
  try {
    await axios.post(`${API_BASE_URL}/auth/logout`, {}, { withCredentials: true });
    window.location.href = "/";
  } catch (err) {
    console.error("Erreur lors de la déconnexion :", err);
  }
};
add-contact',
        dataToSend,
        {
          withCredentials: true,
          headers: {
            'X-User-Name': `${currentUser?.nom} ${currentUser?.prenom}`,
            'X-User-Role': currentUser?.role
          }
        }
      );

      setMessage(res.data.message);
      setFormData({
        nom_complet: '',
        email: '',
        numero_tel: '',
        adresse: '',
        organisation: ''
      });
    } catch (err) {
      console.error("Erreur lors de l'ajout du contact", err);
      if (err.response?.data?.error) {
        setMessage(err.response.data.error);
      } else {
        setMessage("Erreur lors de l'ajout du contact.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-700">Ajouter un Contact</h1>
        {currentUser && (
          <div className="relative group">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer shadow">
              {currentUser.role ? currentUser.role.charAt(0).toUpperCase() : ''}
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

      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md w-full">
        {message && <div className="mb-4 text-green-600">{message}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nom_complet" className="font-semibold text-gray-700">Nom complet</label>
            <input
              type="text"
              id="nom_complet"
              name="nom_complet"
              value={formData.nom_complet}
              onChange={e => setFormData({ ...formData, nom_complet: e.target.value })}
              className="p-2 w-full border rounded"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="font-semibold text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="p-2 w-full border rounded"
              required
            />
          </div>

          <div>
            <label htmlFor="numero_tel" className="font-semibold text-gray-700">Numéro de téléphone</label>
            <input
              type="text"
              id="numero_tel"
              name="numero_tel"
              value={formData.numero_tel}
              onChange={e => setFormData({ ...formData, numero_tel: e.target.value })}
              className="p-2 w-full border rounded"
              required
            />
          </div>

          <div>
            <label htmlFor="adresse" className="font-semibold text-gray-700">Adresse</label>
            <input
              type="text"
              id="adresse"
              name="adresse"
              value={formData.adresse}
              onChange={e => setFormData({ ...formData, adresse: e.target.value })}
              className="p-2 w-full border rounded"
              required
            />
          </div>

          <div>
            <label htmlFor="organisation" className="font-semibold text-gray-700">Organisation</label>
            <input
              type="text"
              id="organisation"
              name="organisation"
              value={formData.organisation}
              onChange={e => setFormData({ ...formData, organisation: e.target.value })}
              className="p-2 w-full border rounded"
              required
            />
          </div>

          <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded mt-4">
            Ajouter Contact
          </button>
        </form>
      </div>
    </div>
  );
};

export default AjouterContact;

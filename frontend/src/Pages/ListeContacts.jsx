import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListeContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [message, setMessage] = useState('');

  // Récupération des infos de l'utilisateur connecté
  useEffect(() => {
    axios.get('http://localhost:5000/auth/me', {
      withCredentials: true
    })
      .then(res => {
        setCurrentUser(res.data);
        fetchContacts(); // Charger les contacts après avoir récupéré l'utilisateur
      })
      .catch(err => {
        console.error("Erreur récupération utilisateur", err);
        setMessage("Erreur lors de la récupération de l'utilisateur connecté.");
      });
  }, []);

  // Récupération des contacts de l'utilisateur connecté
  const fetchContacts = () => {
    axios.get('http://localhost:5000/view-contacts', {
      withCredentials: true
    })
      .then(res => {
        setContacts(res.data.contacts);
      })
      .catch(err => {
        console.error("Erreur récupération contacts", err);
        setMessage("Erreur lors du chargement des contacts.");
      });
  };

  const handleLogout = () => {
    axios.post('http://localhost:5000/auth/logout', {}, { withCredentials: true })
      .then(() => {
        setCurrentUser(null);
        window.location.href = "/";
      })
      .catch(err => {
        console.error("Erreur déconnexion", err);
        setMessage("Échec de la déconnexion.");
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">Mes Contacts</h1>
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

      {message && <div className="mb-4 text-red-600">{message}</div>}

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full table-auto text-sm text-left">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2">Nom complet</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Téléphone</th>
              <th className="px-4 py-2">Adresse</th>
              <th className="px-4 py-2">Organisation</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {contacts.length > 0 ? (
              contacts.map((contact) => (
                <tr key={contact.id} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-2">{contact.nom_complet || "-"}</td>
                  <td className="px-4 py-2">{contact.email || "-"}</td>
                  <td className="px-4 py-2">{contact.numero_tel || "-"}</td>
                  <td className="px-4 py-2">{contact.adresse || "-"}</td>
                  <td className="px-4 py-2">{contact.organisation || "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-4 text-center text-gray-500">Aucun contact trouvé.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListeContacts;

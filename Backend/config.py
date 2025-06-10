# backend/config.py
import os

API_KEY = os.getenv("API_KEY")
API_SECRET = os.getenv("API_SECRET")
CLOUD_NAME = os.getenv("CLOUD_NAME")

# Autorise le transport non sécurisé pour OAuth (utile en local)
os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'

class Config:
    # Clé secrète pour la sécurité de Flask
    SECRET_KEY = os.urandom(20) # For production, use an environment variable for SECRET_KEY too!

    # Configuration de la base de données distante (Freesqldatabase)
    # Récupère les infos de la base de données via les variables d'environnement
    DB_USER = os.getenv("DB_USER", "sql12784037") # Default for local, but will be overridden by Render ENV
    DB_PASSWORD = os.getenv("DB_PASSWORD", "cgWXcaYhgn") # Default for local, but will be overridden by Render ENV
    DB_HOST = os.getenv("DB_HOST", "sql12.freesqldatabase.com")
    DB_PORT = os.getenv("DB_PORT", "3306")
    DB_NAME = os.getenv("DB_NAME", "sql12784037")

    SQLALCHEMY_DATABASE_URI = (
        f'mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}'
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Configuration des mails (à adapter si nécessaire)
    MAIL_SERVER = 'localhost'
    MAIL_PORT = 1025
    MAIL_USE_SSL = False
    MAIL_USE_TLS = False
    MAIL_USERNAME = None
    MAIL_PASSWORD = None
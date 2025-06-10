import os

API_KEY = os.getenv("API_KEY")
API_SECRET = os.getenv("API_SECRET")
CLOUD_NAME = os.getenv("CLOUD_NAME")

# Autorise le transport non sécurisé pour OAuth (utile en local)
os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'

class Config:
    # Clé secrète pour la sécurité de Flask
    SECRET_KEY = os.urandom(20)

    # Configuration de la base de données distante (Freesqldatabase)
    SQLALCHEMY_DATABASE_URI = (
        'mysql+pymysql://sql12784037:cgWXcaYhgn@sql12.freesqldatabase.com:3306/sql12784037'
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Configuration des mails (à adapter si nécessaire)
    MAIL_SERVER = 'localhost'
    MAIL_PORT = 1025
    MAIL_USE_SSL = False
    MAIL_USE_TLS = False
    MAIL_USERNAME = None
    MAIL_PASSWORD = None


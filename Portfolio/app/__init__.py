import os
from flask import Flask
from flask_mailing import Mail # type: ignore
from config import Config


app = Flask(__name__)
app.config.from_object(Config)

# Konfiguration basierend auf der Umgebung wählen
config_type = os.environ.get('FLASK_ENV', 'development')  # Standardmäßig "development"
if config_type == 'production':
    app.config.from_object('config.ProductionConfig')
elif config_type == 'testing':
    app.config.from_object('config.TestingConfig')
else:
    app.config.from_object('config.DevelopmentConfig')


mail = Mail(app)

from app import routes

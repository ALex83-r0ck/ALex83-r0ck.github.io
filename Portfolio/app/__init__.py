import os
from flask import Flask

app = Flask(__name__)

# Konfiguration basierend auf der Umgebung wählen
config_type = os.environ.get('FLASK_ENV', 'development')  # Standardmäßig "development"
if config_type == 'production':
    app.config.from_object('config.ProductionConfig')
elif config_type == 'testing':
    app.config.from_object('config.TestingConfig')
else:
    app.config.from_object('config.DevelopmentConfig')

from app import routes

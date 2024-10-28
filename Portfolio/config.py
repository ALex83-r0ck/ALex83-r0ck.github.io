import os

class Config:
    """Basiskonfiguration"""
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'a_very_secret_key'
    DEBUG = False
    TESTING = False

    #Mail Konfiguration
    MAIL_SERVER = 'smtp.example.com'
    MAIL_POST = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')
    
    # Weitere Konfigurationsoptionen, die allgemein gültig sind
    # Beispiel für Uploads:
    # UPLOAD_FOLDER = '/path/to/the/uploads'
    # ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

class DevelopmentConfig(Config):
    """Konfiguration für die Entwicklungsumgebung"""
    DEBUG = True
    # Hier kannst du zum Beispiel SQLite oder einen anderen DB-Path definieren
    SQLALCHEMY_DATABASE_URI = os.environ.get('DEV_DATABASE_URI') or 'sqlite:///dev.db'

class ProductionConfig(Config):
    """Konfiguration für die Produktionsumgebung"""
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URI') or 'sqlite:///prod.db'

class TestingConfig(Config):
    """Konfiguration für das Testen"""
    TESTING = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('TEST_DATABASE_URI') or 'sqlite:///test.db'
    # Vielleicht möchtest du hier auch einige Dummy-Settings hinzufügen


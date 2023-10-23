from backend.settings.base import *
import os
from dotenv import load_dotenv


SECRET_KEY = 'django-insecure-z(zug1f)$xf$*niby*_j%a(0ic^#!o@vrd8gh!jy7vo+d69=qs'

DEBUG = True

ALLOWED_HOSTS = ['localhost', '127.0.0.1']

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": "pragma-test",
        "USER": "leonel",
        "PASSWORD": "123456",
        "HOST": "localhost",
        "DATABASE_PORT": 5432,
    },
}

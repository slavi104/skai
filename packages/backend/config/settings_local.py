import os
from .settings import *

# Override database settings to use SQLite for local development
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": os.path.join(BASE_DIR, "db.sqlite3"),
    },
    "channels_postgres": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": os.path.join(BASE_DIR, "db.sqlite3"),
    },
}

# Override Redis settings to use in-memory backend
CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels.layers.InMemoryChannelLayer",
    },
}

CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.locmem.LocMemCache",
    }
}

# Disable some features that require external services
CELERY_TASK_ALWAYS_EAGER = True
CELERY_TASK_EAGER_PROPAGATES = True

# Override email field collation for SQLite compatibility
from django.db import models

# Monkey patch EmailField to remove case_insensitive collation for SQLite
original_email_field_init = models.EmailField.__init__

def email_field_init(self, *args, **kwargs):
    # Remove db_collation for SQLite compatibility
    kwargs.pop('db_collation', None)
    original_email_field_init(self, *args, **kwargs)

models.EmailField.__init__ = email_field_init

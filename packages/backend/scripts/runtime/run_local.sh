#!/bin/bash
set -e

echo Starting local development server...

# Run migrations first
python manage.py migrate

# Initialize subscriptions and plans
python manage.py init_subscriptions
python manage.py init_customers_plans

# Start the development server
python manage.py runserver 0.0.0.0:5001

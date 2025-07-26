#!/bin/bash

celery -A config worker --loglevel=info >NOTES/task_logs.txt &

uvicorn config.asgi:application --reload

from typing import Annotated
from fastapi import FastAPI, status, Depends, Form, HTTPException
from starlette.requests import Request
from fastapi.responses import RedirectResponse
from database.connect import conn
from typing import List
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from psycopg2 import Error

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
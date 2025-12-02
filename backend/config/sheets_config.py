import os

from google.oauth2.service_account import Credentials

GOOGLE_SHEETS_CREDENTIALS_JSON = os.getenv("GOOGLE_SHEETS_CREDENTIALS_JSON")
SHEET_ID = os.getenv("SHEET_ID")


def get_credentials():
    creds = Credentials.from_service_account_file(
        GOOGLE_SHEETS_CREDENTIALS_JSON,
        scopes = ["https://www.googleapis.com/auth/spreadsheets"]
    )
    return creds
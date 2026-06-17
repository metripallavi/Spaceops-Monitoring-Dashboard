from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    APP_NAME: str
    API_V1_PREFIX: str
    DEBUG: bool
    DATABASE_URL: str

    model_config = SettingsConfigDict(
        extra="ignore"
    )


settings = Settings()

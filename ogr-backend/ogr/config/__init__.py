from functools import lru_cache

from pydantic import BaseSettings


class AppConfig(BaseSettings):
    # app meta
    app_name: str = "Ogr"
    app_version: str = "0.0.1"

    # logging
    log_level: str = "INFO"
    log_path: str = "ogr.log"
    log_config: str = "ogr/config/logging.conf"


@lru_cache
def get_config() -> AppConfig:
    return AppConfig()

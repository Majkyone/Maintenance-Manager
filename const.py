from typing import Final
DOMAIN: Final = "my_integration"
API_PATH: Final = "/my_integration"
API_URL: Final = API_PATH + "/main.js"
ICON: Final = "mdi:hammer-wrench"
PANEL_PATH: Final = "my_integration_panel"
SIGNAL_TASK_CREATED: Final = f"{DOMAIN}_task_created"
SIGNAL_TASK_STATE_CHANGED: Final = f"{DOMAIN}_task_state_changed"

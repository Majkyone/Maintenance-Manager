import uuid
import attrs
from typing import Any
import voluptuous as vol
from homeassistant.helpers import entity_registry
from homeassistant.components import websocket_api
from homeassistant.components.websocket_api import connection, messages
from homeassistant.core import HomeAssistant
from .const import DOMAIN
from .storage import HomeMaintananceTask
from dateutil.relativedelta import relativedelta
from datetime import datetime, timedelta
import logging

_LOGGER = logging.getLogger("custom_components.my_integration")

def web_socket_get_tasks(hass: HomeAssistant, connection: connection.ActiveConnection, msg: dict[str, Any]):
    storage = hass.data[DOMAIN].get("storage")
    tasks = storage.get_all_tasks()

    result = [attrs.asdict(task) for task in tasks]
    connection.send_result(msg["id"], result)

def web_socket_get_history(hass: HomeAssistant, connection: connection.ActiveConnection, msg: dict[str, Any]):
    storage = hass.data[DOMAIN].get("storage")
    history = storage.get_all_history()

    result = [attrs.asdict(task) for task in history]
    connection.send_result(msg["id"], result)

def web_socket_create_task(hass: HomeAssistant, connection: connection.ActiveConnection, msg: dict[str, Any]):

    storage = hass.data[DOMAIN]["storage"]
    storage.async_create_task(describeTask(msg))
    connection.send_result(msg["id"], {"success": True})


def web_socket_detete_task(hass: HomeAssistant, connection: connection.ActiveConnection, msg: dict[str, Any]):
    task_id = msg["task_id"]
    storage = hass.data[DOMAIN]["storage"]
    if task_id in storage.tasks:
        storage.async_delete_task(task_id)
        connection.send_result(msg["id"], {"success": True})
    else:
        _LOGGER.warning("Failed storage async")
        connection.send_result(msg["id"], {"success": False, "message": "Task not found"})

def web_socket_complete_task(hass: HomeAssistant, connection: connection.ActiveConnection, msg: dict[str, Any]):
    task_id = msg["task_id"]
    storage = hass.data[DOMAIN]["storage"]
    if task_id in storage.tasks:
        if task_id in storage.history:
            storage.async_add_completion_date(task_id, msg["Completion Notes"])
        else:
            storage.async_create_history(task_id, msg["Completion Notes"])
        connection.send_result(msg["id"], {"success": True, "message": msg.get("Completion Notes", "no notes")})
    else:
        _LOGGER.warning("Failed storage async")
        connection.send_result(msg["id"], {"success": False, "message": "Task not found"})

def web_socket_get_attributes(hass: HomeAssistant, connection: connection.ActiveConnection, msg: dict[str, Any]):
    storage = hass.data[DOMAIN]["storage"]
    result = storage.describe_entity(msg["task_sensor"])

    connection.send_result(msg["id"], result)

def web_socket_edit_task(hass: HomeAssistant, connection: connection.ActiveConnection, msg: dict[str, Any]):
    
    storage = hass.data[DOMAIN]["storage"]
    storage.async_edit_task(describeTask(msg))
    connection.send_result(msg["id"], msg)

def describeTask(msg: dict[str, Any]):
    type = msg["Type"]
    duration = msg.get("Duration", 0)
    
    duration_type = msg.get("Duration Type", "")
    last_completed=msg.get("Last Completed", ""),
    last_completed_str = last_completed[0] if last_completed else None
    next_due = ""
    if duration_type == "minutes":
        duration = duration * 60
    elif duration_type == "hours":
        duration = duration * 3600

    if type == "interval":
        interval = msg["Repeat Every"]
        unit = msg["Interval Type"]
        if unit != "runtime":
            base_date = datetime.fromisoformat(last_completed_str) if last_completed_str else datetime.now()
            next_due = str(
                (base_date + relativedelta(**{unit: interval})).strftime("%Y.%m.%d")
            ).replace(".","-")
        else:
            next_due = timedelta(hours=interval).total_seconds() # prepisat na hours
    task = HomeMaintananceTask(
        id=msg.get("task_id") or str(uuid.uuid4()),
        name=msg["Task Name"],
        type=type,

        description=msg.get("Description", "No description"),
        value=msg.get("Value", 0),
        control=msg.get("Control", ""),
        sensor=msg.get("Sensor", ""),
        location=msg.get("Location", "N/A"),
        operator=msg.get("Operator", "equal"),
        seasonal=msg.get("Seasonal Task", False),
        seasonal_interval=msg.get("Seasonal Interval") or msg.get("Repeat Every") or 0,
        seasonal_type=msg.get("Seasonal Type") or msg.get("Interval Type") or "",
        duration_condition=msg.get("Condition Duration", False),
        duration_type=msg.get("Duration Type", ""),
        duration=duration,
        last_completed=last_completed_str,
        fixed=msg.get("Fixed Interval", False),
        option=msg.get("Option", ""),
        next_due=next_due,
    )
    return task

async def async_register_websocket(hass: HomeAssistant):
    websocket_api.async_register_command(
        hass,
        "my_integration/get_tasks",
        web_socket_get_tasks,
        messages.BASE_COMMAND_MESSAGE_SCHEMA.extend({
            vol.Required("type"): "my_integration/get_tasks",
        })
    )

    websocket_api.async_register_command(
        hass,
        "my_integration/get_history",
        web_socket_get_history,
        messages.BASE_COMMAND_MESSAGE_SCHEMA.extend({
            vol.Required("type"): "my_integration/get_history",
        })
    )

    websocket_api.async_register_command(
        hass,
        "my_integration/create_task",
        web_socket_create_task,
        messages.BASE_COMMAND_MESSAGE_SCHEMA.extend({
            vol.Required("type"): "my_integration/create_task",
            vol.Optional("Description"): str,
            vol.Optional("Type"): str,
            vol.Required("Task Name"): str,
            vol.Optional("Sensor"): str,
            vol.Optional("Control"): str,
            vol.Optional("Value"): vol.Any(int, str),
            vol.Optional("Location"): str,
            vol.Optional("Operator"): str,
            vol.Optional("Seasonal Task"): bool,
            vol.Optional("Seasonal Interval"): int,
            vol.Optional("Seasonal Type"): str,
            vol.Optional("Condition Duration"): bool,
            vol.Optional("Duration"): int,
            vol.Optional("Duration Type"): str,
            vol.Optional("Last Completed"): str,
            vol.Optional("Repeat Every"): int,
            vol.Optional("Interval Type"): str,
            vol.Optional("Fixed Interval"): bool,
            vol.Optional("Option"): str
        })
    )

    websocket_api.async_register_command(
        hass,
        "my_integration/delete_task",
        web_socket_detete_task,
        messages.BASE_COMMAND_MESSAGE_SCHEMA.extend({
            vol.Required("type"): "my_integration/delete_task",
            vol.Required("task_id"): str,
        })
    )

    websocket_api.async_register_command(
        hass,
        "my_integration/complete_task",
        web_socket_complete_task,
        messages.BASE_COMMAND_MESSAGE_SCHEMA.extend({
            vol.Required("type"): "my_integration/complete_task",
            vol.Required("task_id"): str,
            vol.Optional("Completion Notes"): str,
        })
    )

    websocket_api.async_register_command(
        hass,
        "my_integration/get_attributes",
        web_socket_get_attributes,
        messages.BASE_COMMAND_MESSAGE_SCHEMA.extend({
            vol.Required("type"): "my_integration/get_attributes",
            vol.Required("task_sensor"): str,
        })
    )

    websocket_api.async_register_command(
        hass,
        "my_integration/edit_task",
        web_socket_edit_task,
        messages.BASE_COMMAND_MESSAGE_SCHEMA.extend({
            vol.Required("type"): "my_integration/edit_task",
            vol.Optional("Description"): str,
            vol.Optional("Type"): str,
            vol.Required("Task Name"): str,
            vol.Optional("Value"): vol.Any(int, str),
            vol.Optional("Sensor"): str,
            vol.Optional("Control"): str,
            vol.Optional("Location"): str,
            vol.Optional("Operator"): str,
            vol.Optional("Seasonal Task"): bool,
            vol.Optional("Seasonal Interval"): int,
            vol.Optional("Seasonal Type"): str,
            vol.Optional("Condition Duration"): bool,
            vol.Optional("Duration"): int,
            vol.Optional("Duration Type"): str,
            vol.Optional("Last Completed"): str,
            vol.Optional("Repeat Every"): int,
            vol.Optional("Interval Type"): str,
            vol.Optional("Fixed Interval"): bool,
            vol.Required("task_id"): str,
            vol.Optional("Option"): str
        })
    )

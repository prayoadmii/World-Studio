import subprocess
import os
import threading
import uvicorn
import webview

from fastapi import FastAPI, Request, Response
from fastapi.staticfiles import StaticFiles
from prayoadmii_lib import console
from prayoadmii_lib.configlib import tomlcfg

from src.libs.util import freeport, randomtxt

project_config = tomlcfg.load("project.toml")

subprocess.run("cls" if os.name == "nt" else "clear", shell=True)

http_host = str(project_config.get_config("internal.http_host", "127.0.0.1"))
http_port = int(freeport.get_free_port(str(http_host)))

console.info(f"Integrated Server Will Run On http://{str(http_host)}:{str(http_port)}/ And Protected Connection With Sesson Token")

sesson_token = str(randomtxt.rand_text(15))

fapi = FastAPI(
    docs_url=None,
    openapi_url=None,
    redoc_url=None
)


@fapi.middleware("http")
async def user_agent_middleware(request: Request, call_next):
    user_agent = str(request.headers.get("user-agent", ""))

    if not str(user_agent) == str(sesson_token):
        return Response(
            content="Forbidden",
            status_code=403
        )

    return await call_next(request)

@fapi.middleware("http")
async def add_no_cache_headers(request: Request, call_next):
    response = await call_next(request)
    
    response.headers["Cache-Control"] = "no-store, no-cache, must-revalidate, max-age=0"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "0"
    
    return response

fapi.mount(
    path="/",
    app=StaticFiles(
        directory="content/web",
        html=True
    ),
    name=str(project_config.get_config("metadata.name", "Google Chrome"))
)


def run_server():
    uvicorn.run(
        fapi,
        host=str(http_host),
        port=int(http_port)
    )

threading.Thread(
    target=run_server,
    daemon=True
).start()

electron = webview.create_window(
    title=f"{str(project_config.get_config('metadata.name', 'Google Chrome'))} v{str(project_config.get_config('metadata.version', 'UNKNOWN'))}",
    url=f"http://{str(http_host)}:{str(http_port)}/",
    maximized=True
)

webview.start(gui="qt", icon="favicon.png", user_agent=str(sesson_token))
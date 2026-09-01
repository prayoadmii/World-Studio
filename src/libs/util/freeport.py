import socket

def get_free_port(host: str) -> int:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind((str(host), 0))

        return s.getsockname()[1]
import random
import string

def rand_text(count: int) -> str:
    return str(str("").join(random.choice(string.ascii_letters) for _ in range(int(count))))
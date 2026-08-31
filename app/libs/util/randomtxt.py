import random
import string

def rand_text(count: int) -> int:
    return str("").join(random.choice(string.ascii_letters) for _ in range(int(count)))
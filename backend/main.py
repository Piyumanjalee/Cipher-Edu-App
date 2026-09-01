from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, field_validator
import base64

app = FastAPI(
    title="Cipher Educational API",
    description="API endpoints for learning and testing basic cryptography ciphers.",
    version="1.0.0"
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Pydantic Request & Response Models ---

class CaesarRequest(BaseModel):
    text: str = Field(..., example="HELLO", description="The string to be processed")
    shift: int = Field(..., example=3, description="An integer representing the shift value")
    operation: str = Field(..., example="encrypt", description="Operation: 'encrypt' or 'decrypt'")

    @field_validator("operation")
    @classmethod
    def validate_operation(cls, v: str) -> str:
        v_clean = v.strip().lower()
        if v_clean not in ("encrypt", "decrypt"):
            raise ValueError("Operation must be either 'encrypt' or 'decrypt'.")
        return v_clean


class CaesarResponse(BaseModel):
    result: str = Field(..., description="The processed string")
    original: str = Field(..., description="The original input string")
    shift: int = Field(..., description="The shift value used")
    operation: str = Field(..., description="The operation performed ('encrypt' or 'decrypt')")

class VigenereRequest(BaseModel):
    text: str = Field(..., example="HELLO", description="The string to be processed")
    keyword: str = Field(..., example="KEY", description="A string used as the key")
    operation: str = Field(..., example="encrypt", description="Operation: 'encrypt' or 'decrypt'")

    @field_validator("operation")
    @classmethod
    def validate_operation(cls, v: str) -> str:
        v_clean = v.strip().lower()
        if v_clean not in ("encrypt", "decrypt"):
            raise ValueError("Operation must be either 'encrypt' or 'decrypt'.")
        return v_clean

    @field_validator("keyword")
    @classmethod
    def validate_keyword(cls, v: str) -> str:
        if not any(c.isalpha() for c in v):
            raise ValueError("Keyword must contain at least one alphabetic character.")
        return v


class VigenereResponse(BaseModel):
    result: str = Field(..., description="The processed string")
    original: str = Field(..., description="The original input string")
    keyword: str = Field(..., description="The keyword used")
    operation: str = Field(..., description="The operation performed ('encrypt' or 'decrypt')")

class AtbashRequest(BaseModel):
    text: str = Field(..., example="HELLO", description="The string to be processed")
    operation: str = Field(..., example="encrypt", description="Operation: 'encrypt' or 'decrypt'")

    @field_validator("operation")
    @classmethod
    def validate_operation(cls, v: str) -> str:
        v_clean = v.strip().lower()
        if v_clean not in ("encrypt", "decrypt"):
            raise ValueError("Operation must be either 'encrypt' or 'decrypt'.")
        return v_clean


class AtbashResponse(BaseModel):
    result: str = Field(..., description="The processed string")
    original: str = Field(..., description="The original input string")
    operation: str = Field(..., description="The operation performed ('encrypt' or 'decrypt')")

class Base64Request(BaseModel):
    text: str = Field(..., example="HELLO", description="The string to be encoded or decoded")
    operation: str = Field(..., example="encode", description="Operation: 'encode' or 'decode'")

    @field_validator("operation")
    @classmethod
    def validate_operation(cls, v: str) -> str:
        v_clean = v.strip().lower()
        if v_clean not in ("encode", "decode"):
            raise ValueError("Operation must be either 'encode' or 'decode'.")
        return v_clean


class Base64Response(BaseModel):
    result: str = Field(..., description="The processed string")
    original: str = Field(..., description="The original input string")
    operation: str = Field(..., description="The operation performed ('encode' or 'decode')")


class RailFenceRequest(BaseModel):
    text: str = Field(..., example="HELLO", description="The string to be processed")
    rails: int = Field(..., example=3, description="An integer representing the number of rails/depth (>= 2)")
    operation: str = Field(..., example="encrypt", description="Operation: 'encrypt' or 'decrypt'")

    @field_validator("operation")
    @classmethod
    def validate_operation(cls, v: str) -> str:
        v_clean = v.strip().lower()
        if v_clean not in ("encrypt", "decrypt"):
            raise ValueError("Operation must be either 'encrypt' or 'decrypt'.")
        return v_clean

    @field_validator("rails")
    @classmethod
    def validate_rails(cls, v: int) -> int:
        if v < 2:
            raise ValueError("Number of rails must be at least 2.")
        return v


class RailFenceResponse(BaseModel):
    result: str = Field(..., description="The processed string")
    original: str = Field(..., description="The original input string")
    rails: int = Field(..., description="Number of rails used")
    operation: str = Field(..., description="The operation performed ('encrypt' or 'decrypt')")


class PlayfairRequest(BaseModel):
    text: str = Field(..., example="Hello World", description="The text message to process")
    key: str = Field(..., example="KEYWORD", description="The alphabetic key to construct the 5x5 matrix")

class CipherResponse(BaseModel):
    original: str = Field(..., description="The original input text")
    result: str = Field(..., description="The processed (encrypted/decrypted/encoded/decoded) text")


# --- Core Cipher Logic Implementations ---

def caesar_cipher(text: str, shift: int, operation: str = "encrypt", decrypt: bool | None = None) -> str:
    """
    Encrypts or decrypts text using the Caesar cipher.
    
    :param text: The string to be processed.
    :param shift: An integer representing the shift value.
    :param operation: A string, either "encrypt" or "decrypt".
    :param decrypt: (Optional backward-compatibility flag) Boolean indicating decryption if True.
    :return: Processed string with preserved case and untouched non-alphabetic characters.
    """
    if decrypt is not None:
        op = "decrypt" if decrypt else "encrypt"
    else:
        op = operation.lower().strip()

    if op not in ("encrypt", "decrypt"):
        raise ValueError("Operation must be either 'encrypt' or 'decrypt'.")

    # In decryption, we reverse the shift direction
    effective_shift = shift if op == "encrypt" else -shift

    result = []
    for char in text:
        if char.isalpha():
            start = ord('A') if char.isupper() else ord('a')
            result.append(chr((ord(char) - start + effective_shift) % 26 + start))
        else:
            result.append(char)
    return "".join(result)


def vigenere_cipher(text: str, keyword: str, operation: str = "encrypt", decrypt: bool | None = None) -> str:
    """
    Encrypts or decrypts text using the Vigenere cipher.
    Preserves case and ignores non-alphabetic characters (they are left unchanged and do not advance the keyword index).
    
    :param text: The string to be processed.
    :param keyword: A string used as the key.
    :param operation: A string, either "encrypt" or "decrypt".
    :param decrypt: (Optional backward-compatibility flag) Boolean indicating decryption if True.
    :return: Processed string with preserved case and untouched non-alphabetic characters.
    """
    if decrypt is not None:
        op = "decrypt" if decrypt else "encrypt"
    else:
        op = operation.lower().strip()

    if op not in ("encrypt", "decrypt"):
        raise ValueError("Operation must be either 'encrypt' or 'decrypt'.")

    key_indices = [ord(k.upper()) - ord('A') for k in keyword if k.isalpha()]
    if not key_indices:
        raise ValueError("Keyword must contain at least one alphabetic character.")

    result = []
    key_len = len(key_indices)
    key_idx = 0

    for char in text:
        if char.isalpha():
            start = ord('A') if char.isupper() else ord('a')
            shift = key_indices[key_idx % key_len]
            if op == "decrypt":
                shift = -shift
            result.append(chr((ord(char) - start + shift) % 26 + start))
            key_idx += 1
        else:
            result.append(char)

    return "".join(result)


def atbash_cipher(text: str, operation: str = "encrypt") -> str:
    """
    Encrypts or decrypts text using the Atbash cipher.
    Maps A <-> Z, B <-> Y, etc., while preserving case and leaving non-alphabetic characters untouched.
    Note: Atbash is an involution (symmetric), so encryption and decryption operations produce identical mapping.
    
    :param text: The string to be processed.
    :param operation: A string, either "encrypt" or "decrypt" (for consistency).
    :return: The processed string.
    """
    op = operation.lower().strip()
    if op not in ("encrypt", "decrypt"):
        raise ValueError("Operation must be either 'encrypt' or 'decrypt'.")

    result = []
    for char in text:
        if char.isalpha():
            if char.isupper():
                result.append(chr(ord('Z') - (ord(char) - ord('A'))))
            else:
                result.append(chr(ord('z') - (ord(char) - ord('a'))))
        else:
            result.append(char)
    return "".join(result)


def process_base64(text: str, operation: str = "encode") -> str:
    """
    Encodes or decodes text using standard Base64 encoding.
    
    :param text: The input string to process.
    :param operation: 'encode' or 'decode'.
    :return: The processed string.
    :raises ValueError: If operation is invalid or decoding encounters invalid Base64 / non-UTF-8 bytes.
    """
    op = operation.lower().strip()
    if op == "encode":
        return base64.b64encode(text.encode("utf-8")).decode("utf-8")
    elif op == "decode":
        try:
            decoded_bytes = base64.b64decode(text.encode("utf-8"), validate=True)
            return decoded_bytes.decode("utf-8")
        except Exception as e:
            raise ValueError(f"Invalid Base64 string: {str(e)}")
    else:
        raise ValueError("Operation must be either 'encode' or 'decode'.")


def base64_encode(text: str) -> str:
    """Encodes plain text to Base64 representation."""
    return process_base64(text, operation="encode")


def base64_decode(text: str) -> str:
    """Decodes Base64 encoded text back to plain text."""
    return process_base64(text, operation="decode")


def rail_fence_cipher(text: str, rails: int, operation: str = "encrypt") -> str:
    """
    Encrypts or decrypts text using the Rail Fence (Zig-Zag) cipher.
    
    :param text: The string to be processed.
    :param rails: An integer representing the number of rails (depth >= 2).
    :param operation: 'encrypt' or 'decrypt'.
    :return: The processed string.
    :raises ValueError: If rails < 2 or operation is invalid.
    """
    op = operation.lower().strip()
    if op not in ("encrypt", "decrypt"):
        raise ValueError("Operation must be either 'encrypt' or 'decrypt'.")
    if rails < 2:
        raise ValueError("Number of rails must be at least 2.")
    if not text or rails >= len(text):
        return text

    if op == "encrypt":
        fence = [[] for _ in range(rails)]
        rail = 0
        direction = 1
        for char in text:
            fence[rail].append(char)
            rail += direction
            if rail == 0:
                direction = 1
            elif rail == rails - 1:
                direction = -1
        return "".join("".join(row) for row in fence)
    else:
        pattern = [[None] * len(text) for _ in range(rails)]
        rail = 0
        direction = 1
        for col in range(len(text)):
            pattern[rail][col] = '*'
            rail += direction
            if rail == 0:
                direction = 1
            elif rail == rails - 1:
                direction = -1

        idx = 0
        for r in range(rails):
            for c in range(len(text)):
                if pattern[r][c] == '*' and idx < len(text):
                    pattern[r][c] = text[idx]
                    idx += 1

        result = []
        rail = 0
        direction = 1
        for col in range(len(text)):
            result.append(pattern[rail][col])
            rail += direction
            if rail == 0:
                direction = 1
            elif rail == rails - 1:
                direction = -1
        return "".join(result)


# Playfair Helper Functions
def generate_playfair_matrix(key: str) -> list:
    """Generates a 5x5 Playfair matrix from a key string."""
    key = key.upper().replace('J', 'I')
    seen = set()
    matrix = []
    for char in key:
        if char.isalpha() and char not in seen:
            seen.add(char)
            matrix.append(char)
    for char in "ABCDEFGHIKLMNOPQRSTUVWXYZ":  # 'J' is omitted
        if char not in seen:
            seen.add(char)
            matrix.append(char)
    return [matrix[i:i+5] for i in range(0, 25, 5)]


def find_playfair_position(matrix: list, char: str):
    """Finds row and column coordinates of a character in the 5x5 matrix."""
    for r in range(5):
        for c in range(5):
            if matrix[r][c] == char:
                return r, c
    return None


def prepare_playfair_text(text: str) -> str:
    """Prepares text for Playfair by capitalizing, replacing J with I, and grouping in digraphs."""
    clean_text = "".join([c.upper() for c in text if c.isalpha()]).replace('J', 'I')
    prepared = []
    i = 0
    while i < len(clean_text):
        char1 = clean_text[i]
        if i + 1 < len(clean_text):
            char2 = clean_text[i+1]
            if char1 == char2:
                prepared.append(char1)
                prepared.append('X')  # Insert filler character 'X'
                i += 1
            else:
                prepared.append(char1)
                prepared.append(char2)
                i += 2
        else:
            prepared.append(char1)
            prepared.append('X')  # Add filler if odd length
            i += 1
    return "".join(prepared)


def playfair_cipher(text: str, key: str, decrypt: bool = False) -> str:
    """Encrypts or decrypts text using the Playfair cipher (digraph-based substitution)."""
    if not key:
        raise HTTPException(status_code=400, detail="Key cannot be empty.")
    
    matrix = generate_playfair_matrix(key)
    prepared_text = prepare_playfair_text(text)
    
    if not prepared_text:
        return ""

    step = -1 if decrypt else 1
    result = []
    
    for i in range(0, len(prepared_text), 2):
        char1, char2 = prepared_text[i], prepared_text[i+1]
        pos1 = find_playfair_position(matrix, char1)
        pos2 = find_playfair_position(matrix, char2)
        
        if not pos1 or not pos2:
            continue
            
        r1, c1 = pos1
        r2, c2 = pos2
        
        if r1 == r2:
            # Same row: Shift columns
            result.append(matrix[r1][(c1 + step) % 5])
            result.append(matrix[r2][(c2 + step) % 5])
        elif c1 == c2:
            # Same column: Shift rows
            result.append(matrix[(r1 + step) % 5][c1])
            result.append(matrix[(r2 + step) % 5][c2])
        else:
            # Rectangle corner swap
            result.append(matrix[r1][c2])
            result.append(matrix[r2][c1])
            
    return "".join(result)


# --- API Routes ---

@app.get("/")
def read_root():
    return {
        "message": "Welcome to the Cipher Educational API!",
        "endpoints_docs": "/docs",
        "supported_ciphers": [
            "Caesar Cipher",
            "Vigenere Cipher",
            "Atbash Cipher",
            "Base64 Encoding",
            "Rail Fence Cipher",
            "Playfair Cipher"
        ]
    }

# 1. Caesar Cipher
@app.post("/caesar", response_model=CaesarResponse, tags=["Caesar Cipher"])
@app.post("/api/caesar", response_model=CaesarResponse, tags=["Caesar Cipher"])
def process_caesar(payload: CaesarRequest):
    result = caesar_cipher(payload.text, payload.shift, payload.operation)
    return CaesarResponse(
        result=result,
        original=payload.text,
        shift=payload.shift,
        operation=payload.operation
    )

# 2. Vigenere Cipher
@app.post("/vigenere", response_model=VigenereResponse, tags=["Vigenere Cipher"])
@app.post("/api/vigenere", response_model=VigenereResponse, tags=["Vigenere Cipher"])
def process_vigenere(payload: VigenereRequest):
    result = vigenere_cipher(payload.text, payload.keyword, payload.operation)
    return VigenereResponse(
        result=result,
        original=payload.text,
        keyword=payload.keyword,
        operation=payload.operation
    )

# 3. Atbash Cipher
@app.post("/atbash", response_model=AtbashResponse, tags=["Atbash Cipher"])
@app.post("/api/atbash", response_model=AtbashResponse, tags=["Atbash Cipher"])
def process_atbash(payload: AtbashRequest):
    result = atbash_cipher(payload.text, payload.operation)
    return AtbashResponse(
        result=result,
        original=payload.text,
        operation=payload.operation
    )

# 4. Base64 Encoding
@app.post("/base64", response_model=Base64Response, tags=["Base64 Encoding"])
@app.post("/api/base64", response_model=Base64Response, tags=["Base64 Encoding"])
def handle_base64(payload: Base64Request):
    try:
        result = process_base64(payload.text, payload.operation)
        return Base64Response(
            result=result,
            original=payload.text,
            operation=payload.operation
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

# 5. Rail Fence Cipher
@app.post("/railfence", response_model=RailFenceResponse, tags=["Rail Fence Cipher"])
@app.post("/api/railfence", response_model=RailFenceResponse, tags=["Rail Fence Cipher"])
def process_railfence(payload: RailFenceRequest):
    try:
        result = rail_fence_cipher(payload.text, payload.rails, payload.operation)
        return RailFenceResponse(
            result=result,
            original=payload.text,
            rails=payload.rails,
            operation=payload.operation
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

# 6. Playfair Cipher
@app.post("/api/playfair/encrypt", response_model=CipherResponse, tags=["Playfair Cipher"])
def encrypt_playfair(payload: PlayfairRequest):
    result = playfair_cipher(payload.text, payload.key, decrypt=False)
    return CipherResponse(original=payload.text, result=result)

@app.post("/api/playfair/decrypt", response_model=CipherResponse, tags=["Playfair Cipher"])
def decrypt_playfair(payload: PlayfairRequest):
    result = playfair_cipher(payload.text, payload.key, decrypt=True)
    return CipherResponse(original=payload.text, result=result)

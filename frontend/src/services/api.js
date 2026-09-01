// Base API endpoint URL
const BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

/**
 * Generic API request handler with error normalization
 */
async function apiRequest(endpoint, payload) {
  try {
    const url = `${BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      // Normalize FastAPI validation or HTTPException errors
      let errorMessage = `Request failed with status ${response.status}`;
      if (data) {
        if (typeof data.detail === 'string') {
          errorMessage = data.detail;
        } else if (Array.isArray(data.detail)) {
          errorMessage = data.detail.map(d => `${d.loc ? d.loc.join('.') + ': ' : ''}${d.msg}`).join(', ');
        } else if (data.message) {
          errorMessage = data.message;
        }
      }
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      throw new Error('Cannot connect to FastAPI backend. Ensure uvicorn is running on http://127.0.0.1:8000');
    }
    throw error;
  }
}

/**
 * Health check to verify backend connection
 */
export async function checkBackendHealth() {
  try {
    const response = await fetch(`${BASE_URL}/`, { method: 'GET' });
    if (!response.ok) return false;
    const data = await response.json();
    return Boolean(data && data.message);
  } catch {
    return false;
  }
}

/**
 * 1. Caesar Cipher
 * @param {string} text
 * @param {number} shift
 * @param {'encrypt'|'decrypt'} operation
 */
export async function apiCaesar(text, shift, operation = 'encrypt') {
  return apiRequest('/caesar', {
    text,
    shift: Number(shift),
    operation,
  });
}

/**
 * 2. Vigenère Cipher
 * @param {string} text
 * @param {string} keyword
 * @param {'encrypt'|'decrypt'} operation
 */
export async function apiVigenere(text, keyword, operation = 'encrypt') {
  return apiRequest('/vigenere', {
    text,
    keyword,
    operation,
  });
}

/**
 * 3. Atbash Cipher
 * @param {string} text
 * @param {'encrypt'|'decrypt'} operation
 */
export async function apiAtbash(text, operation = 'encrypt') {
  return apiRequest('/atbash', {
    text,
    operation,
  });
}

/**
 * 4. Base64 Encoding / Decoding
 * @param {string} text
 * @param {'encode'|'decode'} operation
 */
export async function apiBase64(text, operation = 'encode') {
  return apiRequest('/base64', {
    text,
    operation,
  });
}

/**
 * 5. Rail Fence Cipher
 * @param {string} text
 * @param {number} rails
 * @param {'encrypt'|'decrypt'} operation
 */
export async function apiRailFence(text, rails, operation = 'encrypt') {
  return apiRequest('/railfence', {
    text,
    rails: Number(rails),
    operation,
  });
}

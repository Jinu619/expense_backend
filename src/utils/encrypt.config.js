import crypto from 'crypto';

const algorithm = 'aes-256-cbc';

// derive key + iv from same secret
const getKeyAndIV = (secret) =>{
    const hash = crypto.createHash('sha256').update(secret).digest();
    const key = hash;
    const iv = hash.subarray(0, 16);
    return { key, iv };
}

const encrypt = (text, secret) => {
    const { key, iv } = getKeyAndIV(secret);
    const cipher = crypto.createCipheriv(algorithm, key, iv);

    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
};

const decrypt = (encryptedData, secret) => {
    const { key, iv } = getKeyAndIV(secret);
    const decipher = crypto.createDecipheriv(algorithm, key, iv);

    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};

export { encrypt, decrypt };

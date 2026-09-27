import crypto from 'crypto';

const key = () => Buffer.from(process.env.GOOGLE_ENCRYPTION_KEY!, 'hex');

export function encrypt(text: string) {
  const iv = crypto.randomBytes(12);
  const c = crypto.createCipheriv('aes-256-gcm', key(), iv);
  const enc = Buffer.concat([c.update(text, 'utf8'), c.final()]);
  return [
    iv.toString('hex'),
    c.getAuthTag().toString('hex'),
    enc.toString('hex')
  ].join(':');
}

export function decrypt(value: string) {
  const [iv, tag, data] = value.split(':');
  const d = crypto.createDecipheriv(
    'aes-256-gcm',
    key(),
    Buffer.from(iv, 'hex')
  );
  d.setAuthTag(Buffer.from(tag, 'hex'));
  return Buffer.concat([
    d.update(Buffer.from(data, 'hex')),
    d.final()
  ]).toString('utf8');
}

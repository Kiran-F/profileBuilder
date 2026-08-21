export function generateAndDownloadVCard({
  name = 'Contact',
  email = '',
  phone = '',
  title = '',
  company = ''
}) {
  const cleanName = name.trim() || 'Contact';
  const nameParts = cleanName.split(' ');
  const lastName = nameParts.length > 1 ? nameParts.pop() : '';
  const firstName = nameParts.join(' ') || cleanName;

  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${cleanName}`,
    `N:${lastName};${firstName};;;`,
    title ? `TITLE:${title}` : '',
    company ? `ORG:${company}` : '',
    phone ? `TEL;TYPE=CELL,VOICE:${phone}` : '',
    email ? `EMAIL;TYPE=INTERNET,HOME,PREF:${email}` : '',
    'END:VCARD'
  ].filter(Boolean);

  const vcardContent = lines.join('\r\n');
  const blob = new Blob([vcardContent], { type: 'text/vcard;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const fileName = `${cleanName.toLowerCase().replace(/[^a-z0-9]/g, '_')}.vcf`;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

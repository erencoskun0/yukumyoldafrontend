export function formatTurkishPhoneNumber(phone: string): string {
  // Sadece rakamları al
  const digits = phone.replace(/\D/g, "");

  if (!digits.startsWith("90")) {
    return phone; // Geçerli değilse dokunma
  }

  // +90 553 857 39 58
  return `+${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 8)} ${digits.slice(8, 10)} ${digits.slice(10, 12)}`;
}
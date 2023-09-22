export const hasNumber = (value: string) => {
    return /\d/.test(value);
};
  
  // Fungsi validasi kustom untuk memeriksa apakah email memiliki domain yang valid
export const isValidEmailDomain = (email: string) => {
    return email.includes('@gmail.com');
};

export const passwordLengthValid = (password: string, minLength: number, maxLength: number) => {
    const length = password.length;
    return length >= minLength && length <= maxLength
}

  // Fungsi validasi kustom untuk memeriksa panjang teks
export const isTextLengthValid = (value: string, minLength: number, maxLength: number) => {
    const length = value.length;
    return length >= minLength && length <= maxLength;
};
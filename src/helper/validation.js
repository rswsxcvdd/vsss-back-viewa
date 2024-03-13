function generateRandomText(length) {
    const possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomText = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * possibleChars.length);
      randomText += possibleChars.charAt(randomIndex);
    }
  
    return randomText;
}

function validateEmail(email) {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
}

function validateIndianMobileNumber(number) {
    // Regex pattern for Indian mobile numbers.
    const mobileRegex = /^[6-9]\d{9}$/;
  
    return mobileRegex.test(number);
}

module.exports = {
    generateRandomText,
    validateEmail,
    validateIndianMobileNumber,
}
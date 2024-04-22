export const randomNumber = (length) => {
  let charset = "0123456789";
  let number = "";
  for (var i = 0; i < length; i++) {
    let randomIndex = Math.floor(Math.random() * charset.length);
    number += charset[randomIndex];
  }
  return number;
}

// Generates a short code for a room
// Ref: https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript

export default () => {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   var codeLength = 5
   for ( var i = 0; i < codeLength; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}
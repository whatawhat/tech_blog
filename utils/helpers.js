// module.exports = {
//     format_date: date => {
//       return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
//         date
//       ).getFullYear()}`;
//     },
//     format_plural: (word, amount) => {
//         if (amount !== 1) {
//           return `${word}s`;
//         }
    
//         return word;
//     }
//   }


// module.exports = {
//   format_date: (date) => {
//     // Format date as MM/DD/YYYY
//     return date.toLocaleDateString();
//   },
 
// };


const format_date = (date) => new Date(date).toLocaleDateString();

module.exports = { format_date };
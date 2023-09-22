/**
 *
 * @param {String} words - words need capitalising
 * @returns words - capitalised words
 */

export default function capitaliseCase(words) {
  words = words.trim().toLowerCase().split(" ");
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }
  words = words.join(" ");
  return words;
}

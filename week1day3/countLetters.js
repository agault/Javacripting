function countLetters(input) {
  var noSpaces= input.split(" ").join('');
  var letters = {}

  for(var i = 0; i < noSpaces.length; i++) {
    var char = noSpaces[i]

    if (letters[char]) {
      letters[char] += 1
    } else {
      letters[char] = 1
    }
  }
    return letters
}

console.log(countLetters("Bacon Pancakes thats what I wanna make"))



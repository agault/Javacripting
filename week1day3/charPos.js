function letterPos(input) {
  var noSpaces= input.split(" ").join('');
  var letters = {}

  for(var i = 0; i < noSpaces.length; i++) {
    var char = noSpaces[i]

    if (letters[char]) {
      letters[char] += i
    } else {
      letters[char] = i
    }

  }
  console.log(letters)
}

letterPos("Bacon Pancakes thats what i wanna make")


   // }letters[noSpaces[i]] =
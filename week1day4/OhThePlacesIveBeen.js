var OhThePlacesIveBeen = ["Japan", "Morocco", "Spain", "USA", "Peru", "India", "Myanmmar", "Thailand", "Cambodia", "Malasia", "Borneo", "Vietnam", "China", "SouthKorea", "Indonesia", "Philipines"];

var Countries = OhThePlacesIveBeen.map(function(Places){
  return Places.split("").reverse().join("");
});

console.log(Countries);
var input = [
  { x: 3, y: 4 },
  { x: 12, y: 5 },
  { x: 8, y: 15 }
];


var result = input.map(function(z){

 return squareroot(z);


});

 function squared (input) {

    return Math.pow(input.x, 2) + Math.pow(input.y, 2)

}
  function squareroot (input) {

    var check = squared(input)

    return Math.sqrt(check)


};

console.log(result);

console.log(result[0] === 5);
console.log(result[1] === 13);
console.log(result[2] === 17);
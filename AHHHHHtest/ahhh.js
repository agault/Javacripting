/* Question 03

Implement a function "checkOverlap", which, when given two objects that represent lines,
returns whether they overlap or not.

Lines are represented in this way: {start: 0, end: 10}

(end will always be greater than start)


Example 1:

  checkOverlap({start: 0, end: 10}, {start: 8, end: 15})

Which visually, would be:

   0--------10

         8-------15

         ^^^^ overlap

Returns:

  true


function checkOverlap(lineA, lineB) {

  /* IMPLEMENT ME */
/* Question 03

Implement a function "checkOverlap", which, when given two objects that represent lines,
returns whether they overlap or not.

Lines are represented in this way: {start: 0, end: 10}

(end will always be greater than start)


Example 1:

  checkOverlap({start: 0, end: 10}, {start: 8, end: 15})

Which visually, would be:

   0--------10

         8-------15

         ^^^^ overlap

Returns:

  true



Example 2:

  checkOverlap({start: 12, end: 15}, {start: 0, end: 10})

Which visually, would be:

                 12-------15

   0--------10

                  no overlap

Returns:

  false

*/

//checkOverlap({start: 0, end: 10}, {start: 8, end: 15})


function checkOverlap(lineA, lineB) {
  var lineAstart = lineA.start;
  var lineAend = lineA.end;
  var lineBstart = lineB.start;
  var lineBend = lineB.end;
  var ArrayA = [];
  var ArrayB = [];

  for (var i = lineAstart; i <= lineAend; i++){
    ArrayA.push(i);
  }
  for (var j = lineBstart; j <= lineBend; j++){
    ArrayB.push(j);
  }


  for (var x = 0; x <= ArrayA.length; x++){
    for (var y = 0; y <= ArrayB.length; y++){

      if (ArrayA[x] === ArrayB[y] || ArrayB[y] === ArrayA[x]){
        return true;
      }
      if (ArrayA[x] !== ArrayB[y]){
        return false;
      }


    }
  }
}
console.log(checkOverlap({start: 0, end: 10}, {start: 8, end: 15}));


// Don't change below:

module.exports = checkOverlap;



// Don't change below:

module.exports = checkOverlap;

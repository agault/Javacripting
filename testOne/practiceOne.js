  /* Question 4
 *
 *  Implement the 'stdev' function defined below
 *
 * STDEV  - the square root of the average of the squared deviations of the values from their average value
 *        - you are allowed to look at Wikipedia's example calculation:
 *            https://en.wikipedia.org/wiki/Standard_deviation#Basic_examples
 *
 *        - use the provided 'round' function before returning your final value
 *        - you can take a square root using `Math.sqrt(number)`
 *
 * For example:
 *
 *    stdev([6,2,3,4,9,6,1,0,5]);
 *
 * Returns:
 *
 *    2.67
 */


 // I AM THE MEAN OF THE ARRAY:
function stdev(arr) {

  var sum = 0;
  for (i = 0; i < arr.length; i++){
    sum += arr[i];
    var meanOne = sum / arr.length;
  }
  return meanOne;
  console.log(meanOne);

//I AM EACH VARIABLES DIFFERENCE FROM THE MEAN

  function difFromMean (arr, meanOne) {



    var sqrMe = arr.map(function(x) {
    return x - meanOne
    });

  console.log(sqrMe);
  }

}

/*
 function sqr(sqrMe){
   var squared = sqrMe * sqrMe;
}
console.log(squared);



 function meanOfSquared(squared){

 var sum = 0;
  for (i = 0; i < squared.length; i++){
    sum += squared[i];
    var meanTwo = sum / squared.length;
  }
  return meanTwo;

  var takeRoot = Math.sqrt(meanTwo)

 }
  return takeRoot;
}


}

function round(number) {
  return Math.round(number * 100) / 100;
}
*/
console.log(stdev([6,2,3,4,9,6,1,0,5]));
// Don't change below:

module.exports = { stdev: stdev };

var students = [
  { id: 1, name: "bruce",    age: 40 },
  { id: 2, name: "zoidberg", age: 22 },
  { id: 3, name: "alex",     age: 22 },
  { id: 4, name: "alex",     age: 30 }
];
// sort by name
students.sort(function(x, y){

  function ageOrder(){
    if (x.name < y.name){
      return 1
    }
    if (x.name > y.name){
      return -1
    }

     if (x.name = y.name){
          student.sort(function(x, y){
          return x.age - y.age
          });

  return 0;

  }

});


sort()
  console.log(sort(students));

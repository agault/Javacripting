var salesTaxRates = {
  AB: 0.05,
  BC: 0.12,
  SK: 0.10
};

var companySalesData = [
  {
    name: "Telus",
    province: "BC",
    sales: [ 100, 200, 400 ]
  },
  {
    name: "Bombardier",
    province: "AB",
    sales: [ 80, 20, 10, 100, 90, 500 ]
  },
  {
    name: "Telus",
    province: "SK",
    sales: [ 500, 100 ]
  }
];

function totalSales(obj) {
  var salesArray = obj['sales'];
  var total = 0;
  for (var i = 0; i < salesArray.length ; i++) {
    total += salesArray[i]
  }
  return total

}

function totalTax(totalSales, taxRate) {
  return totalSales * taxRate;
}

function calculateSalesTax(salesData, taxRates) {
  var result = {};
  // Implement your code here
  for (var i = 0; i < salesData.length; i++) {

    if (result[salesData[i]['name']]) {
        result[salesData[i]['name']]['totalSales'] += totalSales(salesData[i])
        result[salesData[i]['name']]['totalTax'] += totalTax(totalSales(salesData[i]), salesTaxRates[salesData[i]['province']])
      } else {
        result[salesData[i]['name']] = {
          totalSales: totalSales(salesData[i]),
          totalTax: totalTax(totalSales(salesData[i]), salesTaxRates[salesData[i]['province']])
        }
      }
  }
  return result
}



var results = calculateSalesTax(companySalesData, salesTaxRates);
console.log(results)

/* var abTax = salesTaxRates["AB"];
var bcTax = salesTaxRates["BC"];
var skTax = salesTaxRates["SK"];

var TelusBC = companySalesData[0]['sales'];
var TelusSK = companySalesData[2]['sales'];

var TellusSalesArray = TelusBC.concat(TelusSK);
var BombSalesArray = companySalesData[1]['sales'];

var TelusTotalSales = TellusSalesArray
*/
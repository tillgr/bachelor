import AllDemRes from '../demografic/allDemRes'

var newArray = AllDemRes.filter(function (el)
    {
        return el.age >=6;
    }
);
console.log(newArray);
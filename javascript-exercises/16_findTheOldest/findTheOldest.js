const findTheOldest = function (people) {
  return people.reduce(
    (oldest, person) => {
      const age =
        (person.yearOfDeath || new Date().getFullYear()) - person.yearOfBirth;
      return age > oldest.age ? { name: person.name, age } : oldest;
    },
    { name: '', age: 0 }
  );
};

// Do not edit below this line
module.exports = findTheOldest;

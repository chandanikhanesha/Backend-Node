import React from "react";
import { array } from "yup";

function GitTest() {
  var object1 = {
    a: "somestring",
    b: 42,
    c: false,
    d: 67,
  };
  const obj2 = [];
  //Task description: Write a method that returns a deep array like [[key, value]]
  console.log(Object.entries(object1));
  console.log(Object.keys(object1));
  console.log(Object.values(object1));
  console.log(Object.keys(object1).map((il) => [il, object1[il]]));

  //Task description: Write a method that verifies an argument is a plain object, not an array or null
  console.log(
    typeof object1 === "object" && !Array.isArray(object1) && object1 !== null
  );
  console.log(
    typeof obj2 === "object" &&
      !Array.isArray(obj2) &&
      obj2 !== null &&
      obj2 !== undefined
  );

  //return object without property
  const wo = (object1, ...copy) => {
    const newObject = { ...object1 };
    copy.forEach((copy) => {
      delete newObject[copy];
    });
    return newObject;
  };
  //Task description: Write a method that makes a shallow compare of two objects
  const eqal = (object1, obj2) => {
    const foj = Object.keys(object1);
    const soj = Object.keys(obj2);
    if (foj.length !== soj.length) {
      return false;
    }
    return !foj.filter((keys) => foj[keys] !== soj[keys]).length;
  };

  const array = new Map([
    ["ck", "bk"],
    ["baz", 42],
    ["bk", "hk"],
  ]);

  console.log(Object.fromEntries(array));
  const invoke = (object1, path, func, args) => {
    const splittedPath = path.split(".");

    const target = splittedPath.reduce((acc, key) => {
      acc = acc[key] ? acc[key] : object1[key];
      return console.log(acc);
    }, {});

    console.log(Array.prototype[func].apply(target, args));
  };
  //Task description: Write a method that finds shallow intersections of objects
  const insertion = (fo, so) => {
    const fok = Object.keys(fo);

    return fok.reduce((acc = {}, key) => {
      if (fo[key] === so[key]) {
        acc = {
          ...acc,
          [key]: fo[key],
        };
      }
      return acc;

      // if (Array.isArray(fo[key]) && Array.isArray(so[key])) {
      //   const eqaldeep = isEualDeep(fo[key], so[key]);

      //   if (eqaldeep) {
      //     acc = {
      //       ...acc,
      //       [key]: fo[key],
      //     };
      //   }
      // }
    }, {});
  };

  //array exercise-----------------------------------------------------------------------------------

  //fill method-1

  const ckarr = [1, 2, 3, 4, 5];
  console.log(ckarr.fill("a", 0));
  console.log(ckarr.fill("b", 1, 3)); //start count,end not
  //reverse method

  const arr = ["ck", "bk", "dk", "jk"];
  console.log(arr.reverse());

  //reversed input array-2

  const reverse = (array) => {
    const reversed = [];
    for (let i = array.length - 1; i >= 0; i -= 1) {
      reversed.push(array[i]);
    }
    return reversed;
  };
  //remove value-3
  const compact = [0, 1, false, 2, undefined, "", 3, null, "ck"];
  const result = compact.filter(Boolean);
  console.log(result); //boolean remove all non use value

  //convert array into object-4

  const convertarr = [
    ["a", 1],
    ["b", 2],
    ["ck", 3],
  ];

  const convert = (convertarr) =>
    convertarr.reduce((acc, value) => {
      if (Array.isArray(value)) {
        acc[value[0]] = value[1];
      }
      return acc;
    }, {});
  console.log(convert(convertarr));

  //remove dublicate value-6
  const unique = (array) => Array.from(new Set(array));
  const same = [1, 2, 3, 1, 2];
  console.log(unique(same)); //output-[1,2,3]

  //remove listed value-7
  const same1 = [1, 2, 3, 1, 2];
  const remove = (same1, ...args) => {
    let samearr = [...same1];
    for (let i = 1; i < args.length; i += 1) {
      samearr = samearr.filter((item) => item !== args[i]);
    }
    console.log("--------------------");

    return samearr;
  };

  console.log(remove(same1)); //output-[3]

  //8-Write a method that makes a shallow compare of two arrays and returns true if they are identical.

  const farr = [1, 2, 3];
  const sarr = [1, 2, "ck"];

  const eqalarr = (farr, sarr) => {
    if (farr.length !== sarr.length) {
      return false;
    }
    const comapared = farr.map((el, id) => sarr[id] === el);
    return !comapared.includes(false);
  };
  console.log(eqalarr(farr, sarr));

  //9-converd deep array into simple array
  console.log("converd deep array into simple array");
  const deeparr = [1, 2, [3], [4, 5]];

  const simple = (deeparr) =>
    deeparr.reduce(
      (acc, val) => acc.concat(Array.isArray(val) ? simple(val) : val),
      []
    );

  console.log(simple(deeparr));

  //10slice array

  const parr = [1, 2, 3, 4, 5, 6];
  const chunked = [];
  let size = 4;
  for (let i = 0; i < parr.length; i += size) {
    chunked.push(parr.slice(i, i + size));
  }

  console.log(chunked);
  //11-deep unique array

  const insertarr = (...arrays) => {
    const result = arrays[0].filter((ele) => {
      const ioe = arrays[1].indexOf(ele);
      if (ioe >= 0) {
        return ele;
      }
    });
    if (arrays.length > 2) {
      return insertarr(result, ...arrays.slice(2, arrays.length));
    }

    return Array.from(new Set(result));
  };
  const u1 = [1, 2, 3];
  const u2 = [2, 3];

  console.log(insertarr(u1, u2));

  ///////////////////

  return <div></div>;
}

export default GitTest;

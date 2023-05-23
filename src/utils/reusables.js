const _ = require('lodash');
const mongoose = require('mongoose');

exports.getRandomNumber = (min, max) => {
  return parseInt(Math.random() * (max - min) + min);
};

exports.hasOwnProperty = (obj, field) => Object.prototype.hasOwnProperty.call(obj, field);

exports.transformToArray = (inp) => (inp.constructor === Array ? inp : inp.split(' '));

exports.transformToObjectsIds = (inpArray) => {
  let objectArray = [];
  inpArray.forEach((id) => objectArray.push(mongoose.Types.ObjectId(id)));

  return objectArray;
};

exports.getSorterFunc = (property) => {
  let sortOrder = 1;
  if (property[0] === '-') {
    sortOrder = -1;
    property = property.substr(1);
  }

  return (a, b) => {
    let result;
    if (property === 'title') {
      const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
      result = collator.compare(a.title, b.title);
    } else result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;

    return sortOrder * result;
  };
};

exports.sortObj = (sortBy = '_id') => {
  let sortKey = sortBy,
    order = 'asc';

  if (sortKey && sortKey.includes('-')) {
    order = 'desc';
    sortKey = sortKey.slice(1, sortKey.length);
  }

  const obj = {};
  obj[sortKey] = order;

  return obj;
};

exports.paginate = (data = [], offset = 0, limit = 25) => {
  offset = Number(offset);
  limit = Number(limit);

  offset = typeof offset === 'number' && !isNaN(offset) ? offset : 0;
  limit = typeof limit === 'number' && !isNaN(limit) ? limit : 0;
  
  return data.slice(offset, offset + limit);
};

exports.objectArrayToFieldArray = (objectArray, fieldToSelect = '_id') => {
  return objectArray.map((object) => object[fieldToSelect]);
};

exports.pick = (object, keys) => {
  return keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      // eslint-disable-next-line no-param-reassign
      obj[key] = object[key];
    }
    return obj;
  }, {});
};

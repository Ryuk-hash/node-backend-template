const httpStatus = require('http-status');

module.exports = ({
  code = 500,
  message = '',
  data = undefined,
  filters = undefined,
  count = undefined,
  extraDetails = {}
}) => {
  return {
    httpResponse: {
      code,
      class: httpStatus[`${code}_CLASS`],
      name: httpStatus[`${code}_NAME`],
      message: httpStatus[`${code}_MESSAGE`]
    },
    success: true,
    message,
    filters,
    count,
    data,
    ...extraDetails
  };
};

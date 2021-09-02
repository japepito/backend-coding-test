module.exports = {
  paginate(data, limit, page) {
    return {
      data,
      page,
      limit,
      totalCount: data.length,
    };
  },
};

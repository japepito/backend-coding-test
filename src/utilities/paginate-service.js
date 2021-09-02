module.exports = {
  paginate(data, limit, page) {
    return {
      data,
      page: Number(page),
      limit: Number(limit),
      totalCount: data.length,
    };
  },
};

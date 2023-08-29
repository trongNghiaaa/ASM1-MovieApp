exports.paginateAndSorted = (data, page, limit, sortByFile, sortOrder) => {
    let sortedMovies = [...data];

    const skip = (page - 1) * limit; // Số phim bỏ qua tương ứng với từng page

    // Sắp xếp danh sách phim theo trường sortByFile và sortOrder
    if (sortOrder === 'desc') sortedMovies = [...data].sort((a, b) => b[sortByFile] - a[sortByFile]);
    if (sortOrder === 'incr') sortedMovies = [...data].sort((a, b) => a[sortByFile] - b[sortByFile]);

    // Lấy danh sách các phim trên trang hiện tại
    const results = sortedMovies.slice(skip, skip + limit);

    return results;
};

exports.calcTotalPage = (totalItem, limit) => {
    return Math.ceil(totalItem / limit);
};

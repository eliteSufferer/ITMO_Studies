function saveToLocalStorage(x, y, r, result, curr_time, exec_time){
    const currData = JSON.parse(localStorage.getItem('tableData')) || [];
    currData.push({x, y, r, result, curr_time, exec_time});
    localStorage.setItem('tableData', JSON.stringify(currData));
}
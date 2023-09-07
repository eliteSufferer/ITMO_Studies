function addToTable(input1, input2, input3, result, curr_time, exec_time) {
    const table = document.getElementById('resultsTable');
    const row = table.insertRow();
    const cell1 = row.insertCell();
    cell1.textContent = input1;
    cell1.className = 'new-cell';
    const cell2 = row.insertCell();
    cell2.textContent = input2;
    cell2.className = 'new-cell';
    const cell3 = row.insertCell();
    cell3.textContent = input3;
    cell3.className = 'new-cell';
    const cell4 = row.insertCell();
    cell4.textContent = result;
    if (result === 'In'){
        cell4.className = "result-cell-in"
    } else{
        cell4.className = "result-cell-out";
    }
    const cell5 = row.insertCell();
    cell5.textContent = curr_time;
    cell5.className = 'new-cell';
    const cell6 = row.insertCell();
    cell6.textContent = exec_time;
    cell6.className = 'new-cell';
}

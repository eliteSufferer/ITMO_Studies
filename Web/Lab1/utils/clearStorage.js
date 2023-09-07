document.querySelector('.danger-zone').addEventListener('click', function (){
    const userConfirmation = confirm('Are you sure you want to clear table data?');
    if (userConfirmation){
        localStorage.clear();
        location.reload();
    }
})
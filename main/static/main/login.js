document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.form-control').forEach(field => {
        field.addEventListener('input', function() {
            username = document.querySelector('#username');
            password = document.querySelector('#password');
            if (username.value.length >= 1 && password.value.length >= 8) {
                document.querySelector('#confirm').disabled = false;
            } else {
                document.querySelector('#confirm').disabled = true;
            };
        })
    })
})
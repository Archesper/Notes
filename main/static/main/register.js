document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll('.password_field').forEach(field => {
        field.addEventListener('input', function() {
            password = document.getElementById('password').value;
            password2 = document.getElementById('password2').value;
            if (password.length >= 8 && password2.length >= 8) {
                document.getElementById('confirm').disabled = false;
                document.getElementById('password').style.backgroundColor ='white';
                document.getElementById('password2').style.backgroundColor ='white';
            } else if (password.length < 8 || password2.length < 8) {
                document.getElementById('confirm').disabled = true;
                document.getElementById('password').style.backgroundColor ='#f8d7da';
                document.getElementById('password2').style.backgroundColor ='#f8d7da';
            }
        })
    });
})
$(()=>{
    let $signup = $('.sign-up-form');
    $signup.find('.registration-button').on('click',function(e){
        e.preventDefault();
        $.ajax({
            type:'post',
            data:{
                username:$signup.find('[name="username"]').val(),
                password:$signup.find('[name="password"]').val(),
                email:$signup.find('[name="email"]').val(),
                repeatpassword:$signup.find('[name="repassword"]').val()
            },
            dataType: 'json',
            success:function (result) {
                console.log(result);
            }
        })
    })
})
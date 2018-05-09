$(()=>{
    let $signup = $('.sign-up-form');
    $signup.find('.sign-up2 input[name="username"]').on('blur',function () {
        let $this = $(this).parent().next();
        $.ajax({
            url:'/api/res/validate',
            type:'post',
            data:{
                username:$signup.find('[name="username"]').val()
            },
            dataType:'json',
            success:function(result){
                console.log($this);
                console.log($this.next('.show-msg'));
                $this.html(result.message);
            }
        })
    })
    $signup.find('.registration-button').on('click',function(e){
        console.log('1');
        e.preventDefault();
        $.ajax({
            type:'post',
            data:{
                username:$signup.find('[name="username"]').val(),
                password:$signup.find('[name="password"]').val(),
                email:$signup.find('[name="email"]').val(),
                repassword:$signup.find('[name="repassword"]').val()
            },
            dataType: 'json',
            success:function (result) {
                console.log(result);
            }
        })
    })
})
$("#theme_btn").on('click',function()
{
    $('body').toggleClass('dark-theme');
    if($('body').hasClass('dark-theme'))
    {
        $("#theme_btn").text('☀️')
    }
    else
    {
        $("#theme_btn").text('🌙')
    }
})

const MentorAPI = "http://localhost:3000/Mentor";
const StudentsAPI = "http://localhost:3000/Students";
const CoursesAPI = "http://localhost:3000/Courses";


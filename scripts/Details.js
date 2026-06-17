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
const CoursesEndrolled = "http://localhost:3000/CoursesEndrolled";

if(localStorage.getItem("StudentEmail") == undefined)
{
    const currentUser = "Mentor";
} 
else
{
    const currentUser = "Student";
}
const currentRole = localStorage.getItem("Role"); 
let currentTab = "Dashboard";

const contentContainer = document.getElementById("contentContainer");

if(currentRole === "Mentor")
{
    const 
}

document.addEventListener('DOMContentLoaded', () => {
    myFunction();
});

function myFunction() {
    console.log(currentUser);
}
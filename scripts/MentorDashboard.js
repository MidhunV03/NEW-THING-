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

toastr.options = {
    "closeButton": true,
    "progressBar": true,
    "positionClass": "toast-bottom-right",
    "timeOut": "3000"
};


async function fetchCourses() {
    try
    {
        const response = await fetch(CoursesAPI);
        const data = await response.json();
        
        const CourseListContainer = document.getElementById("CourseListContainer")
        
        data.forEach(element => {
        const courseCard = document.createElement('div')
        courseCard.classList.add("col-6", "mb-4");
        courseCard.innerHTML = 
        `
                <div class="card card-custom shadow rounded-4 h-100">
                    <div class="card-body">
                        <h3 class="fw-bold">📚 ${element.title}</h3>
                        <p class="text-muted">🕒 ${element.duration} Months</p>
                        <p class="card-text">${element.description}</p>
                    </div>
                    <div class="card-footer bg-transparent border-0 d-flex justify-content-between">
                        <button class="btn btn-primary">
                            View Details
                        </button>
                    </div>
                </div>

        `;
        CourseListContainer.appendChild(courseCard);
        });
        
    }
    catch(error)
    {
        toastr.error(error)
    }
}
fetchCourses();

const addCourseTitle = document.getElementById("addCourseTitle");
const addCourseDuration = document.getElementById("addCourseDuration");
const addCourseDepartment = document.getElementById("addCourseDepartment");
const addCourseDesc = document.getElementById("addCourseDesc");
const addCoursebtn = document.getElementById("addCoursebtn")

async function addCourse()
{
    if(addCourseTitle.value == "" || addCourseDuration.value == "" || addCourseDepartment.value == " " || addCourseDesc.value == "")
    {
        toastr.error("Fill all fields")
        return;
    }

    let course = {
        title : addCourseTitle.value,
        duration : addCourseDuration.value,   
        department : addCourseDepartment.value,
        description : addCourseDesc.value,
        createdby : localStorage.getItem("MentorEmail")
    }

    try
    {
        const response = await fetch(CoursesAPI,{
            method : "POST",
            headers : {
                'Content-type' : 'application/json'
            },
            body : JSON.stringify(course)
        })
        Swal.fire(
            "ADDED!",
            "New Course added to the list",
            "success"
        );

        const modal = bootstrap.Modal.getInstance(document.getElementById("addCourseModal"));
        modal.hide();

        // fetchCourses();

        if(!response.ok)
        {
            throw new Error("Failed to Fetch");
        }
    }
    catch(error)
    {
        toastr.error(error);
    }

}
addCoursebtn.addEventListener('click',addCourse);

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

const currentUserRole = localStorage.getItem("Role");
const currentUserEmail = localStorage.getItem("StudentEmail");

async function fetchDetails() {
    
    console.log(currentUserRole);
    console.log(currentUserEmail);

    const contentContainer = document.getElementById("contentContainer");
        
    if(currentUserRole === "Mentor")
    {
        const div = document.createElement('div');
        div.innerHTML = ``;

        const response = await fetch(`${MentorAPI}?email=${currentUserEmail}`);
        const data = await response.json();
                
            div.innerHTML = `
<div class="container py-5">

    <div class="row p-4 align-items-center">

        <!-- Profile Image -->
        <div class="col-lg-5 text-center mb-4 mb-lg-0">

            <img src="../assets/Login.svg"
                class="img-fluid"
                style="max-height:350px;"
                alt="Mentor Profile">

        </div>

        <!-- Details Card -->
        <div class="col-lg-7">

            <div class="card border-0 shadow-lg rounded-4 p-4">

                <h2 class="text-center fw-bold mb-4">
                    👨‍🏫 MENTOR DETAILS
                </h2>

                <div class="d-flex flex-column gap-3">

                    <div>
                        <span class="text-secondary">Name</span>
                        <h5 class="mb-0 fw-semibold">
                            ${data[0].name}
                        </h5>
                    </div>

                    <div>
                        <span class="text-secondary">Email</span>
                        <h5 class="mb-0 fw-semibold">
                            ${data[0].email}
                        </h5>
                    </div>

                    <div>
                        <span class="text-secondary">Department</span>
                        <h5 class="mb-0 fw-semibold">
                            ${data[0].department}
                        </h5>
                    </div>

                    <div>
                        <span class="text-secondary">Gender</span>
                        <h5 class="mb-0 fw-semibold">
                            ${data[0].gender}
                        </h5>
                    </div>

                    <div>
                        <span class="text-secondary">Role</span>
                        <h5 class="mb-0 fw-semibold">
                            ${data[0].role}
                        </h5>
                    </div>

                    <div class="mt-3">

                        <button class="btn btn-primary px-4">
                            Edit Profile
                        </button>

                    </div>

                </div>

            </div>

        </div>

    </div>

</div>
`;

contentContainer.appendChild(div);
        contentContainer.appendChild(div);
    }
    else
    {
        const div = document.createElement('div');
        div.innerHTML = ``;

        const response = await fetch(`${StudentsAPI}?email=${currentUserEmail}`);
        const data = await response.json();
                
            div.innerHTML = `
<div class="container py-5">

    <div class="row p-4 align-items-center">

        <!-- Profile Image -->
        <div class="col-lg-5 text-center mb-4 mb-lg-0">

            <img src="../assets/Login.svg"
                class="img-fluid"
                style="max-height:750px;"
                alt="Mentor Profile">

        </div>

        <div class="col-lg-7">

            <div class="card border-0 card-custom shadow-lg rounded-4 p-4">

                <h2 class="text-center fw-bold mb-4">
                    👨‍🏫 STUDENT DETAILS
                </h2>

                <div class="d-flex flex-column gap-3">

                    <div>
                        <span class="text-secondary">Name</span>
                        <h5 class="mb-0 fw-semibold">
                            ${data[0].name}
                        </h5>
                    </div>

                    <div>
                        <span class="text-secondary">Email</span>
                        <h5 class="mb-0 fw-semibold">
                            ${data[0].email}
                        </h5>
                    </div>

                    <div>
                        <span class="text-secondary">Department</span>
                        <h5 class="mb-0 fw-semibold">
                            ${data[0].department}
                        </h5>
                    </div>

                    <div>
                        <span class="text-secondary">Gender</span>
                        <h5 class="mb-0 fw-semibold">
                            ${data[0].gender}
                        </h5>
                    </div>

                    <div>
                        <span class="text-secondary">Role</span>
                        <h5 class="mb-0 fw-semibold">
                            ${data[0].role}
                        </h5>
                    </div>

                    <div class="mt-3">

                        <button class="btn btn-danger px-4" onclick="Logoutfn()">
                            Logout Profile
                        </button>

                    </div>

                </div>

            </div>

        </div>

    </div>

</div>
`;

        contentContainer.appendChild(div);
    }
}

fetchDetails();

async function Logoutfn()
{

try
{
    const result = await Swal.fire({
        title : "Log Out",
        text : "Do you want to log out?",
        icon : "question",
        showCancelButton : true,
        confirmButtonText : "Yes,Logout!",
        cancelButtonText : "No"
    })

    if(!result.isConfirmed)
    {
        return;
    }

    localStorage.clear();
    window.location.replace("Home.html");

}
catch(error)
{

}

}

// document.addEventListener('DOMContentLoaded', () => {
//     myFunction();
// });

// function myFunction() {
//     console.log(currentUser);
// }
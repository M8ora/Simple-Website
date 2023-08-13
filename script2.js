let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');
window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove ('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
            sec.classList.add('show-animate');
        }
        else {
            sec.classList.remove('show-animate');
        }
    });
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

}

const coursesContainer = document.getElementById("courses-container");
const addCourseBtn = document.getElementById("add-course-btn");
const calculateBtn = document.getElementById("calculate-btn");
const resultDiv = document.getElementById("result");

let courseCount = 0;

addCourseBtn.addEventListener("click", () => {
    courseCount++;
    const courseRow = document.createElement("div");
    courseRow.classList.add("course-row");
    courseRow.innerHTML = `
        <input class="course-input" type="number" placeholder="Units">
        <input class="course-input" type="text" placeholder="Grade">
    `;
    coursesContainer.appendChild(courseRow);
});


calculateBtn.addEventListener("click", () => {
    let totalUnits = 0;
    let totalGradePoints = 0;

    const courseRows = document.querySelectorAll(".course-row");

    courseRows.forEach(row => {
        const unitsInput = row.querySelector(".course-input:nth-child(1)");
        const gradeInput = row.querySelector(".course-input:nth-child(2)");

        if (unitsInput.value && gradeInput.value) {
            const units = parseInt(unitsInput.value);
            const grade = parseFloat(gradeInput.value.toUpperCase());

            totalUnits += units;
            totalGradePoints += units * grade;
        }
    });

    if (totalUnits === 0) {
        resultDiv.textContent = "Please enter course units and grades.";
    } else {
        const gpa = totalGradePoints / totalUnits;
        resultDiv.textContent = `Your GPA is: ${gpa.toFixed(2)}`;
    }
});

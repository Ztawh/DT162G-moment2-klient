/* 
Skrivet av Amanda HWatz Björkholm 2021
Moment 2 - Javascriptbaserad webbutveckling
*/

"use strict"

// Variabler
const coursesEl = document.getElementById("courses");
const messageEl = document.getElementById("message");

const url = "http://localhost:3000/courses";

// Lyssnare
window.addEventListener("load", getCourses);

// Funktioner
// Göm element
function hideElement() {
    // Byt ut klassen
    messageEl.classList.replace("message", "hide");
    messageEl.innerHTML = ""; // Nollställ
}

// Hämta kurser
function getCourses() {
    // Nollställ kurslistan och sätt rubriker
    coursesEl.innerHTML = `
    <tr>
        <th>ID</th>
        <th>Kurskod</th>
        <th>Kursnman</th>
        <th class="center">Period</th>
        <th class="center">Radera</th>
    </tr>
    `;

    // GET-anrop
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let i = 1;
            data.forEach(course => {
                // Skriv ut till table-tagg
                coursesEl.innerHTML += `
                <tr>
                    <td class="id">${i}</td>
                    <td class="code">${course.courseId}</td>
                    <td class="name">${course.courseName}</td>
                    <td class="center period">${course.coursePeriod}</td>
                    <td class="center delete"><i title="Radera kurs" onClick="deleteCourse(${course._id})" class="fas fa-trash-alt"></i></td>
                <tr>
                `;
                i +=1;
            })
        });
}

// Ta bort en kurs
function deleteCourse(id) {
    // Bekräfta med användare
    if (confirm("Är du säker på att du vill ta bort den här kursen?")) {
        // DELETE-anrop med ID
        fetch(url + "/" + id, {
            method: "DELETE",
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // Visa meddelande till användare i 3 sekunder
                messageEl.innerHTML = `<span>${data.message}</span>`;
                messageEl.classList.replace("hide", "message");
                setTimeout(hideElement, 3000);

                // Hämta kurserna på nytt
                getCourses();
            })
            .catch(error => {
                console.log("Error: ", error);
            });

    } else {
        return false; // Om användaren ångrar sig, avbryt funktionen
    }
}

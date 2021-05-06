function addCourse() {
    var i = 0;
    var units_input = document.getElementById('units-form').firstElementChild;
    var units_clone = units_input.cloneNode(true);
    units_clone.id = "units-input" + i;
    units_input.parentNode.appendChild(units_clone);

    var grade_input = document.getElementById('grade-form').firstElementChild;
    var grade_clone = grade_input.cloneNode(true);
    grade_clone.id = "grade-input" + i;
    grade_input.parentNode.appendChild(grade_clone);


    // i = i+1; this doesn't work, needs to be saved to local storage

}

function calculate() {
    // getting units and grade form 
    var units_form = document.getElementById('units-form').elements;
    var grade_form = document.getElementById('grade-form').elements;
    
    // caluclating semester's quality points ( adding up each class' units * grade value)
    var sem_quality_points = 0;
    for (var i = 0; i< units_form.length; i++) {
        sem_quality_points += parseInt(units_form[i].value) * parseInt(grade_form[i].value);
    }

    // getting semester units 
    sem_units = 0;
    for (var i = 0; i < units_form.length; i++) {
        sem_units += parseInt(units_form[i].value);
    }

    // getting old values + calculating new ones
    var units_from_storage = parseInt(localStorage.getItem("oldUnits"));
    var points_from_storage = parseInt(localStorage.getItem("oldPoints"));

    var total_quality_points = points_from_storage + sem_quality_points;
    var total_units_factorable = units_from_storage + sem_units 

    var qpa = total_quality_points / total_units_factorable; 

    localStorage.setItem("qpa", qpa);

    console.log("sem qual pts: " + sem_quality_points);
    console.log("sem units: " + sem_units);
    console.log("old units: " + units_from_storage);
    console.log("old points: " + points_from_storage);
    console.log("total qual pts: " + total_quality_points);
    console.log("total units: " + total_units_factorable);
    console.log("qpa: " + qpa);

    // // adding up grade value 
    // var grade_form = document.getElementById('grade-form').elements;
    // sem_grade_value = 0;
    // for (var i = 0; i < grade_form.length; i++) {
    //     sem_grade_value += parseInt(grade_form[i].value);
    // }

    // var sem_quality_points = sem_units * sem_grade_value; 

    // console.log("grade value: " + total_grade_value);

    // console.log("total units: " + total_units);

    // var quality_points = total_units * total_grade_value;
    // quality_points += parseInt(localStorage.getItem("oldPoints"))
    // var qpa = quality_points / total_units;

    // console.log("quality points: " + quality_points);
    // console.log("qpa: " + qpa);
    // var total_units = parseInt(localStorage.getItem("oldUnits"));




    // localStorage.setItem("qpa", qpa);

    // localStorage.setItem("newUnits", total_units);
    // localStorage.setItem("newPoints", total_grade_value);


}

function savePreviousValues() {
    var old_units = parseInt(document.getElementById("unitsfactorable").value);
    var old_points = parseInt(document.getElementById("totalpoints").value);

    localStorage.setItem("oldUnits", old_units);
    localStorage.setItem("oldPoints", old_points);
}

function displayQPA() {
    var qpa_div = document.getElementById("result-qpa");
    qpa_div.innerHTML = localStorage.getItem("qpa");
}

function clearStorage() {
    localStorage.removeItem("qpa");
}
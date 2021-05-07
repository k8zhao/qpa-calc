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
    console.log("calculating..."); 
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
    var units_from_storage = localStorage.getItem("oldUnits");
    var points_from_storage = parseInt(localStorage.getItem("oldPoints"));

    if (units_from_storage === 'NaN') {
        localStorage.setItem('oldUnits', 0);
    }


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
    var qpa = old_points / old_units; 

    localStorage.setItem("oldUnits", old_units);
    localStorage.setItem("oldPoints", old_points);
    localStorage.setItem("oldQPA", qpa); 

    var modal = document.getElementById("curr-qpa");

    if(Number.isNaN(qpa)) {
        modal.innerHTML = "You didn't enter values for Units Factorable or Total Points so the calculator will calculate your semester GPA only."
    } else {
        qpa = qpa.toFixed(2);
        modal.innerHTML = "Your current QPA is: " + qpa;
        let confirm = document.getElementById("qpa-confirmation");
        confirm.innerHTML = "This will be used to help calculate your overall QPA. If you think it is incorrect, please double check your input for Units Factorable and Total Points."
    }
}

function displayQPA() {
    var div = document.getElementById('result-qpa');
    var qpa = localStorage.getItem('qpa');
    div.innerHTML = qpa;

    var result_title = document.getElementById("result-title");
    var result_description = document.getElementById("result-description");

    var new_qpa = parseInt(localStorage.getItem('qpa')); 
    var old_qpa = localStorage.getItem('oldQPA');
    console.log("old qpa (before nan check): " + old_qpa); 
    if (old_qpa === 'NaN') {
        old_qpa = 0; 
        result_title.innerHTML = "You semester QPA is: "; 
    } else {
        if (old_qpa < new_qpa) {
            result_title.innerHTML = "Good Job!";
            result_description.innerHTML = "Looks like your hard work is going to pay off :D Your overall QPA is: "; 
        } else if (new_qpa < old_qpa) {
            result_title.innerHTML = "It's not over til it's over.";
            result_description.innerHTML = "Your QPA might drop a little this semester, but you got this! Your overall QPA is: "; 
        } else if (new_qpa == old_qpa) {
            result_title.innerHTML = "You're consistent, that's for sure!";
            result_description.innerHTML = "Looks like your QPA is going to stay the same, nice! Your overall QPA is: "; 
        }
    }

    console.log("new qpa: " + new_qpa);
    console.log("old qpa: " + old_qpa); 


    // var qpa_div = document.getElementById("result-qpa");
    // var new_qpa_from_storage = parseInt(localStorage.getItem('qpa'));

    // var old_qpa_from_storage = localStorage.getItem("oldQPA"); 

    // var result_title = document.getElementById("result-title");
    // var result_description = document.getElementById("result-description");

    // console.log("old qpa: " + old_qpa_from_storage);
    // console.log("new qpa: " + new_qpa_from_storage);

    // if (Number.isNaN(new_qpa_from_storage)) {
    //     result_title.innerHTML = "Oops!";
    //     result_description.innerHTML = "Looks like we weren't able to calculate your semester grades. Please re-enter your grades."; 
    // }

    // // new_qpa_from_storage = new_qpa_from_storage.toFixed(2);

    // if(old_qpa_from_storage < new_qpa_from_storage) {
    //     console.log("old qpa: " + old_qpa_from_storage);
    //     console.log("new qpa: " + new_qpa_from_storage);
    //     result_title.innerHTML = "Good Job!";
    //     result_description.innerHTML = "Looks like your hard work is going to pay off :D Your overall QPA is: "
    //     qpa_div.innerHTML = new_qpa_from_storage;
    // } else if (old_qpa_from_storage > new_qpa_from_storage) {
    //     console.log(old_qpa_from_storage);
    //     console.log(new_qpa_from_storage);
    //     result_title.innerHTML = "It's not over til it's over.";
    //     result_description.innerHTML = "Your QPA might drop a little this semester, but you got this! Your overall QPA is: "
    //     qpa_div.innerHTML = new_qpa_from_storage;
    // } else if (old_qpa_from_storage == new_qpa_from_storage) {
    //     console.log("old qpa: " + old_qpa_from_storage);
    //     console.log("new qpa: " + new_qpa_from_storage);
    //     result_title.innerHTML = "You're consistent, that's for sure!";
    //     result_description.innerHTML = "Looks like your QPA is going to stay the same, nice! Your overall QPA is: "; 
    //     qpa_div.innerHTML = new_qpa_from_storage;
    // } else {
    //     // result_title.innerHTML = "Your semester QPA is:"
    // }

}

function removeStorage() {
    localStorage.removeItem("qpa");
}

function clearStorage() {
    window.localStorage.clear();
}

let term = document.getElementById('term');
let subject = document.getElementById('subject');
let terms;
let subjects;

async function getTerms(){
    let url = '../api/get_terms.php';
    try {
        let response = await fetch(url ,{headers: {'Accept': 'application/json'}} );
        let data = await response.json();
    } catch (error){

        console.error(error);
    }
    return data
}

async function getSubjects(){
    let url ='../api/get_subjects.php';
}

term = getTerms();
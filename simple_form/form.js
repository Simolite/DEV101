        const studentStatusDropdown = document.getElementById('student-status');
        const studentInfoDiv = document.getElementById('student-info');
        studentStatusDropdown.addEventListener('change', function() {
            if (this.value === 'student' || this.value === 'guardian') {
                studentInfoDiv.style.display = 'block'; 
            } else {
                studentInfoDiv.style.display = 'none';
            }
        });
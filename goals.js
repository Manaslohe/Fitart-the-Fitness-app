// script.js
document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const age = document.getElementById('age').value;
    const sex = document.getElementById('sex').value;
    const goals = Array.from(document.getElementById('goals').selectedOptions).map(option => option.value);

    // Store data in local storage (or you can send this data to your server)
    localStorage.setItem('userFormData', JSON.stringify({ name, email, phone, age, sex, goals }));

    // Determine the appropriate PDF URL based on age group and goals
    let pdfUrl = '';

    if (age === 'below18') {
        if (goals.includes('weightGain')) pdfUrl = 'pdfs/Below_18_Weight_Gain.pdf';
        else if (goals.includes('weightLoss')) pdfUrl = 'pdfs/Below_18_Weight_Loss.pdf';
        else if (goals.includes('trekking')) pdfUrl = 'pdfs/Below_18_Trekking.pdf';
        else if (goals.includes('swimming')) pdfUrl = 'pdfs/Below_18_Swimming.pdf';
        else pdfUrl = 'pdfs/Below_18.pdf';
    } else if (age === '19-59') {
        if (goals.includes('weightGain')) pdfUrl = 'pdfs/19-59_Weight_Gain.pdf';
        else if (goals.includes('weightLoss')) pdfUrl = 'pdfs/19-59_Weight_Loss.pdf';
        else if (goals.includes('trekking')) pdfUrl = 'pdfs/19-59_Trekking.pdf';
        else if (goals.includes('swimming')) pdfUrl = 'pdfs/19-59_Swimming.pdf';
        else pdfUrl = 'pdfs/19-59.pdf';
    } else if (age === 'above60') {
        if (goals.includes('weightGain')) pdfUrl = 'pdfs/Above_60_Weight_Gain.pdf';
        else if (goals.includes('weightLoss')) pdfUrl = 'pdfs/Above_60_Weight_Loss.pdf';
        else if (goals.includes('trekking')) pdfUrl = 'pdfs/Above_60_Trekking.pdf';
        else if (goals.includes('swimming')) pdfUrl = 'pdfs/Above_60_Swimming.pdf';
        else pdfUrl = 'pdfs/Above_60.pdf';
    }

    // Provide a download link for the determined PDF
    if (pdfUrl) {
        // Creating a temporary link element to trigger download
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = pdfUrl.split('/').pop();
        link.click();
    } else {
        document.getElementById('responseMessage').textContent = 'No PDF available for the selected options.';
    }

    // Show a success message
    document.getElementById('responseMessage').textContent = 'Form submitted! Check your downloads folder for the PDF.';
});

//  Listen for submit
document.getElementById('loan-form').addEventListener('submit', function (e) {
    // hide Results
    document.getElementById('results').style.display = 'none';


    // Show Loader
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 1300);

    e.preventDefault();
});

// Calculate Results
function calculateResults() {


    // UI Vars
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    // Monthly payments

    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

        // Show Results Hide Loading
        document.getElementById('results').style.display = 'block';
        document.getElementById('loading').style.display = 'none';
    } else {
        showError('Preencha todos os campos');
    }
}

// Error Message
function showError(error) {

    // Hide Loading
    document.getElementById('loading').style.display = 'none';

    // create a div
    const errorDiv = document.createElement('div');

    // get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');


    // add class
    errorDiv.className = 'alert alert-danger ';

    // create text node and append
    errorDiv.appendChild(document.createTextNode(error));

    // insert error above heading
    card.insertBefore(errorDiv, heading);

    // clear error after 2secs
    setTimeout(clearError, 2000);
}

// Clear Error
function clearError() {
    document.querySelector('.alert').remove();
}
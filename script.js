import { DateTime } from '../node_modules/luxon/src/luxon.js';

datepicker('#birthdate', { id: 1 });

const calculateButton = document.getElementById('calculate');
const result = document.querySelector('.result-js');

calculateButton.addEventListener('click', () => {
    
    const dateNow = DateTime.local();;
    const birthdate = DateTime.fromJSDate(new Date(document.getElementById('birthdate').value));

    if(!birthdate.isValid) {
        result.innerHTML = "<b>This is not a valid Date!</b>";
        return;
    }

    if (birthdate > dateNow) {
        result.innerHTML = "<b>Your were not even born!!!</b>"
        return;
    }
    
    //  store the difference between now and the birthdate in an object
    const exactAge = dateNow.diff(birthdate, ['years', 'months', 'days']).toObject();

    // create an object with the text for each date part
    const labels = {
        years: 'year',
        months: 'month',
        days: 'day'
    };

    // create and array with the labels object,
    // map through each element to create a new array with the specific text
    // filter this new array to delete null/ texts with 0
    let ageParts = Object.entries(labels)
    .map(([key, label]) => {
        const value = Math.floor(exactAge[key] || 0);
        if (!value) return null;
        
        return `${value} ${label}${value > 1 ? 's' : ''}`
    })
    .filter(Boolean);

    result.innerHTML = ageParts.length
        ? `You are <b>${ageParts.join(', ')}</b> old.`
        : `<b>Congrats, you were just born today!</b>`;
})
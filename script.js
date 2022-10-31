const fareStructure = {
    "regular": {
        "base": 2,
        "capDaily": 6,
        "capWeekly": 20
    },
    "other": {
        "base": 1,
        "capDaily": 3,
        "capWeekly": 8
    }
};
const form = document.querySelector('#theForm');
const log = document.querySelector('div#logText')
const results = document.querySelector('div#resultText');

const DEBUG = false;

let daily_costs = {
    "days": {
        "day_1": {
            "cost": 0,
            "saved": 0
        },
        "day_2": {
            "cost": 0,
            "saved": 0
        },
        "day_3": {
            "cost": 0,
            "saved": 0
        },
        "day_4": {
            "cost": 0,
            "saved": 0
        },
        "day_5": {
            "cost": 0,
            "saved": 0
        },
        "day_6": {
            "cost": 0,
            "saved": 0
        },
        "day_7": {
            "cost": 0,
            "saved": 0
        }
    },    
    capHitForDay: function(day) {
        if (this['day_' + day] >= 6) {
            return true;
        } else {
            return false;
        }
    },
    weeklyCost: function() {
        let result = 0;
        for (const day in this.days) {
            result += this.days[day].cost;
        }
        return result;
    },
    weeklySaved: function() {
        let result = 0;
        for (const day in this.days) {
            result += this.days[day].saved;
        }
        return result;
    },
    costForDay: function(day) {
        return this.days['day_' + day].cost;
    },
    savedForDay: function(day) {
        return this.days['day_' + day].saved;
    },
    clear: function() {
        for (const day in this.days) {
            this.days[day].cost = 0;
            this.days[day].saved = 0;
        }
    }
};

if (!DEBUG) {
    document.querySelector('#logHeader').style.display = 'none';
    document.querySelector('#log').style.display = 'none';
}

document.querySelector('#theForm').addEventListener('submit', (e) => {
    const data = new FormData(form);
    const log = document.querySelector('#log');
    let resultsOutput = '';
    let logOutput = '';
    daily_costs.clear();


    try {
        for (const entry of data) {
            logOutput = `${logOutput}${entry[0]}=${entry[1]}\r`;
        }
        log.innerText = logOutput;

        /** FORM INPUTS **/
        const rides_per_day = data.get('metroRides');
        const days_per_week = data.get('metroDays');
        const fares = fareStructure[data.get('riderType')];

/* Daily Costs */

        for (let i = 1; i <= 7; i++) {
            if (i <= days_per_week) {
                let init_cost = rides_per_day * fares.base;

                if (init_cost >= 6) {
                    daily_costs.days['day_' + i].cost = 6;
                    daily_costs.days['day_' + i].saved = init_cost - 6;
                } else {
                    daily_costs.days['day_' + i].cost = init_cost;
                    daily_costs.days['day_' + i].saved = 0;
                }

                let total_cost = daily_costs.weeklyCost();

                if (total_cost >= 20) {
                    let diff = total_cost - 20;
                    daily_costs.days['day_' + i].cost = daily_costs.days['day_' + i].cost - diff;
                    daily_costs.days['day_' + i].saved = daily_costs.days['day_' + i].saved + diff;
                }
            }

/* Display daily costs in table */
            let display_text = 'Cost: $' + daily_costs.costForDay(i);
            display_text += '<br>Saved: $' + daily_costs.savedForDay(i);
            document.querySelector('td#day_' + i).innerHTML = display_text;
        }



/* Metro Fares */
        // let metroCostPerDay = fares.base * data.get('metroRides');
        // resultsOutput = `${resultsOutput}Regular base fare: \$${fares.base}\r\r`;
        // resultsOutput = `${resultsOutput}\$${fares.base} x ${data.get('metroRides')} trips per day = \$${metroCostPerDay}\r`;

        // if (metroCostPerDay > fares.capDaily) {
        //     metroCostPerDay = fares.capDaily;
        //     resultsOutput = `${resultsOutput}Daily Cap of \$${fares.capDaily} Reached!\r`;
        // }

        // resultsOutput = `${resultsOutput}Daily Cost: \$${metroCostPerDay}\r\r`;

        // let metroCostPerWeek = metroCostPerDay * data.get('metroDays');

        // resultsOutput = `${resultsOutput}\$${metroCostPerDay} x ${data.get('metroDays')} days per week = \$${metroCostPerWeek}\r`;

        // if (metroCostPerWeek > fares.capWeekly) {
        //     metroCostPerWeek = fares.capWeekly;
        //     resultsOutput = `${resultsOutput}Weekly Cap of \$${fares.capWeekly} Reached!\r`;
        // }

        // resultsOutput = `${resultsOutput}Weekly Cost: \$${metroCostPerWeek}\r`;

/* Non-Metro Fares */
        // let nonMetroSection = document.querySelector('#nonMetroRidesSection div');
        // if (nonMetroSection.childElementCount > 0) {
        //     let nonMetroChildren = nonMetroSection.children;
        //     for (const agency in nonMetroChildren) {
                
        //     }
        // }


/* Display Results */
        resultsOutput = "Total Cost: $" + daily_costs.weeklyCost();
        resultsOutput += "<br>Total Savings: $" + daily_costs.weeklySaved();
        results.innerHTML = resultsOutput;
    } catch (error) {
        console.log(error);
    } finally {
        e.preventDefault();
    }

}, false);

// document.querySelector('#addNonMetroRide').addEventListener('click', (e) => {
//     const nonMetroSection = document.querySelector('#nonMetroRidesSection div');
//     const nonMetroCount = document.querySelector('#nonMetroCount');
//     let newCount = parseInt(nonMetroCount.value) + 1;

//     let newSection = document.createElement('fieldset');
//     newSection.id = 'otherAgency' + newCount;
    
//     let newSectionLabel = document.createElement('legend');
//     newSectionLabel.innerText = 'Non-Metro Agency ' + newCount;

//     let removeButton = document.createElement('button');
//     removeButton.type = 'button';
//     removeButton.innerText = 'Remove';
//     removeButton.addEventListener('click', (e) => {
//         e.target.parentElement.remove();
//     });


//     let fieldCostDiv = document.createElement('div');
//     let fieldCostLabel = document.createElement('label');
//     fieldCostLabel.for = 'otherCost' + newCount;
//     fieldCostLabel.innerText = 'Cost per ride: ';
//     let fieldCostInput = document.createElement('input');
//     fieldCostInput.type = 'number';
//     fieldCostInput.name = 'otherCost' + newCount;
//     fieldCostInput.min = 0;
//     fieldCostLabel.appendChild(fieldCostInput);
//     fieldCostDiv.appendChild(fieldCostLabel);

//     let fieldRidesDiv = document.createElement('div');
//     let fieldRidesLabel = document.createElement('label');
//     fieldRidesLabel.for = 'otherRides' + newCount;
//     fieldRidesLabel.innerText = 'Rides per day: ';
//     let fieldRidesInput = document.createElement('input');
//     fieldRidesInput.type = 'number';
//     fieldRidesInput.name = 'otherRides' + newCount;
//     fieldRidesInput.min = 0;
//     fieldRidesLabel.appendChild(fieldRidesInput);
//     fieldRidesDiv.appendChild(fieldRidesLabel);

//     let fieldDaysDiv = document.createElement('div');
//     let fieldDaysLabel = document.createElement('label');
//     fieldDaysLabel.for = 'otherDays' + newCount;
//     fieldDaysLabel.innerText = 'Days per week: ';
//     let fieldDaysInput = document.createElement('input');
//     fieldDaysInput.type = 'number';
//     fieldDaysInput.name = 'otherDays' + newCount;
//     fieldDaysInput.min = 0;
//     fieldDaysInput.max = 7;
//     fieldDaysLabel.appendChild(fieldDaysInput);
//     fieldDaysDiv.appendChild(fieldDaysLabel);
    
//     newSection.appendChild(newSectionLabel);
//     newSection.appendChild(fieldCostDiv);
//     newSection.appendChild(fieldRidesDiv);
//     newSection.appendChild(fieldDaysDiv);
//     newSection.appendChild(removeButton);

//     nonMetroSection.appendChild(newSection);

//     nonMetroCount.value = newCount;
// });
# fare-cap-calculator

<form id="theForm">
    <fieldset>
        <legend>Select your rider type:</legend>
        <div>
            <input type="radio" id="regularRider" name="riderType" value="regular" checked><label for="regularRider">Regular</label>
        </div>
        <div>
            <input type="radio" id="otherRider" name="riderType" value="other"><label for="otherRider">Other (Senior, Disabled, Student)</label>
        </div>
    </fieldset>
    <fieldset>
        <legend>Metro Rides</legend>
        <div>
            <label for="metroRides">Metro rides per day: 
                <input type="text" name="metroRides" id="metroRides">
            </label>
        </div>
        <div>
            <label for="metroDays">Days per week: 
                <input type="text" name="metroDays" id="metroDays">
            </label>
        </div>
    </fieldset>
    <fieldset>
        <legend>Non-Metro Rides</legend>
        <div id="Other1">
            <div>
                <label for="otherCost1">Cost per ride:
                    <input type="text" name="otherCost1" id="otherCost1">
                </label>
            </div>
            <div>
                <label for="otherRides1">Number of rides per day:
                    <input type="text" name="otherRides1" id="otherRides1">
                </label>
            </div>
            <div>
                <label for="otherDays1">Number of rides per day:
                    <input type="text" name="otherDays1" id="otherDays1">
                </label>
            </div>
        </div>
    </fieldset>
    <button type="submit" id="btnCalculate">Calculate</button>
</form>

## Log

<div id="logText"></div>

## Results

<div id="resultText"></div>

<script type="text/javascript">
    const fareStructure = {
        "regular": {
            "base": 2,
            "cap-daily": 6,
            "cap-weekly": 20
        },
        "other": {
            "base": 1,
            "cap-daily": 3,
            "cap-weekly": 8
        }
    };
    const form = document.querySelector('#theForm');
    const log = document.querySelector('div#logText')
    const results = document.querySelector('div#resultText');

    document.querySelector('#theForm').addEventListener('submit', (e) => {
        const data = new FormData(form);
        let logOutput = '';
        let resultsOutput = '';

        try {
            for (const entry of data) {
                logOutput = `${logOutput}${entry[0]}=${entry[1]}\r`;
            }
            log.innerText = logOutput;

            let fares = fareStructure[data.get('riderType')];
            let metroCostPerDay = fares['base'] * data.get('metroRides');

            resultsOutput = `${resultsOutput}Regular base fare: \$${fares['base']}\r\r`;

            resultsOutput = `${resultsOutput}\$${fares['base']} x ${data.get('metroRides')} trips per day = \$${metroCostPerDay}\r`;

            if (metroCostPerDay > fares['cap-daily']) {
                metroCostPerDay = fares['cap-daily'];
                resultsOutput = `${resultsOutput}Daily Cap of \$${fares['cap-daily']} Reached!\r`;
            }

            resultsOutput = `${resultsOutput}Daily Cost: \$${metroCostPerDay}\r\r`;

            let metroCostPerWeek = metroCostPerDay * data.get('metroDays');

            resultsOutput = `${resultsOutput}\$${metroCostPerDay} x ${data.get('metroDays')} days per week = \$${metroCostPerWeek}\r`;

            if (metroCostPerWeek > fares['cap-weekly']) {
                metroCostPerWeek = fares['cap-weekly'];
                resultsOutput = `${resultsOutput}Weekly Cap of \$${fares['cap-weekly']} Reached!\r`;
            }

            resultsOutput = `${resultsOutput}Weekly Cost: \$${metroCostPerWeek}\r`;

            results.innerText = resultsOutput;
        } catch (error) {
            log.innerText = error;
        } finally {
            e.preventDefault();
        }

    }, false);
</script>

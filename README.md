# metro-fare-capping-tool

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

## Final Cost

<div id="resultText"></div>

<script>
    const fareStructure = {
        "regular": {
            "base": 2
            "cap-daily": 6,
            "cap-weekly": 20
        },
        "other": {
            "base": 1,
            "cap-daily": 3
            "cap-weekly": 8
        }
    };

    document.querySelector('#theForm').addEventListener('submit', (e) => {
        calculateTotalCost();
        e.preventDefault();
    }, false);

    function calculateTotalCost() {
        const form = document.querySelector('#theForm');
        const results = document.querySelector('div#resultText');
        const data = new FormData(form);

        for (const entry of data) {
            output = `${output}${entry[0]}=${entry[1]}\r`;
        }
        results.innerText = output;
    }
</script>
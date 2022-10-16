# metro-fare-capping-tool

<form>
<label>Metro rides in a single day: <input type="text" name="metroRides" id="metroRides"></label>
<button type="submit" id="btnCalculate">Calculate</button>
</form>

## Results

<div id="resultText"></div>

<script>
    document.querySelector('#btnCalculate').addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('div#resultText').innerText = '$' + result;
    });

    function calculateTotalCost() {
        let result = 0;
        let metroRidesPerDay = document.querySelector('input#metroRides').value;
        let baseRegularCost = 2;

        result = baseRegularCost * metroRidesPerDay;

        if (result > 6) {
            result = 6;
        }
        return result;
    }
</script>
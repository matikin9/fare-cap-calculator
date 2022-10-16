# metro-fare-capping-tool

<form>
<label>Metro rides in a single day: <input type="text" name="metroRides" id="metroRides"></label>
<button type="submit" id="btnCalculate">Calculate</button>
</form>

## Results

<div id="results"></div>

<script>
    document.querySelector('#btnCalculate').addEventListener('click', function(e) {
        document.querySelector('#results').innerText = 'Clicked!';
    });
</script>
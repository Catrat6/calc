function calculateTrip() {
  const loadedMiles = parseFloat(document.getElementById('loadedMiles').value) || 0;
  const unloadedMiles = parseFloat(document.getElementById('unloadedMiles').value) || 0;
  const legs = parseInt(document.getElementById('legs').value) || 1;
  const waitTime = parseInt(document.getElementById('waitTime').value) || 0;
  const night = document.getElementById('night').value.trim().toLowerCase();

  const perMileRate = 2.50;
  const flatPerLeg = 35;
  
  const waitChargeRate = 15; // per 30 mins
  const processingFeeRate = 0.04;
  const nightCharge = night === 'yes' ? 20 : 0; // $20 charge for night trips


  // Base cost
  let baseCost = (loadedMiles * perMileRate) + (legs * flatPerLeg) + nightCharge;

  // Wait time charge (only if more than 2 legs)
  let waitCharge = 0;
  
  const waitUnits = Math.ceil(waitTime / 30);
  waitCharge = waitUnits * waitChargeRate;
  baseCost += waitCharge;
 

  // Unloaded miles charge
  let unloadedCharge = unloadedMiles * perMileRate;

  let subtotal = baseCost + unloadedCharge;
  let processingFee = subtotal * processingFeeRate;
  let total = subtotal + processingFee;

  document.getElementById('result').innerHTML =
  `Trip Cost Breakdown:<br>
  Base Cost: $${baseCost.toFixed(2)}<br>
  Base Cost Breakdown:<br>
  - Night Charge: $${nightCharge.toFixed(2)}<br>
  - Loaded Miles (${loadedMiles} miles): $${(loadedMiles * perMileRate).toFixed(2)}<br>
  - Legs (${legs} legs): $${(legs * flatPerLeg).toFixed(2)}<br>
  - Wait Time (${waitTime} minutes): $${waitCharge.toFixed(2)}<br>
  <strong>Subtotal: $${subtotal.toFixed(2)}</strong><br>
  Unloaded Charge: $${unloadedCharge.toFixed(2)}<br>
  Processing Fee (4%): $${processingFee.toFixed(2)}<br>
  <strong>Total: $${total.toFixed(2)}</strong>`;
}
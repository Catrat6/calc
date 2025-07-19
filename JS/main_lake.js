function calculateTrip() {
  const loadedMiles = parseFloat(document.getElementById('loadedMiles').value) || 0;
  const unloadedMiles = parseFloat(document.getElementById('unloadedMiles').value) || 0;
  const legs = parseInt(document.getElementById('legs').value) || 1;
  const waitTime = parseInt(document.getElementById('waitTime').value) || 0;
  const discharge = document.getElementById('discharge').value.trim().toLowerCase();

  const perMileRate = 2.40;
  const flatPerLeg = 25;
  const dischargeUpcharge = discharge === 'yes' ? 25 : 0; // $25 upcharge for hospital discharges
  const waitChargeRate = 15; // per 30 mins
  const processingFeeRate = 0.04;

  // Base cost
  let baseCost = (loadedMiles * perMileRate) + (legs * flatPerLeg) + (dischargeUpcharge * legs);

  // Wait time charge (only if more than 2 legs)
  let waitCharge = 0;
  if (legs >= 2) {
    const waitUnits = Math.ceil(waitTime / 30);
    waitCharge = waitUnits * waitChargeRate;
    baseCost += waitCharge;
  }

  // Unloaded miles charge
  let unloadedCharge = unloadedMiles * perMileRate;

  let subtotal = baseCost + unloadedCharge;
  let processingFee = subtotal * processingFeeRate;
  let total = subtotal + processingFee;

  document.getElementById('result').innerHTML =
  `Trip Cost Breakdown:<br>
  Base Cost: $${baseCost.toFixed(2)}<br>
  Base Cost Breakdown:<br>
  - Discharge Fee: $${(dischargeUpcharge * legs).toFixed(2)}<br>
  - Loaded Miles (${loadedMiles} miles): $${(loadedMiles * perMileRate).toFixed(2)}<br>
  - Legs (${legs} legs): $${(legs * flatPerLeg).toFixed(2)}<br>
  ${legs >= 2 ? `- Wait Time (${waitTime} minutes): $${waitCharge.toFixed(2)}<br>` : ''}
  <strong>Subtotal: $${subtotal.toFixed(2)}</strong><br>
  Unloaded Charge: $${unloadedCharge.toFixed(2)}<br>
  Processing Fee (4%): $${processingFee.toFixed(2)}<br>
  <strong>Total: $${total.toFixed(2)}</strong>`;
}
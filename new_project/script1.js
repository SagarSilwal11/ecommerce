document.addEventListener('DOMContentLoaded', function () {
  const removeButtons = document.querySelectorAll('#cart .fa-times-circle');
  const quantityInputs = document.querySelectorAll(
    "#cart input[type='number']"
  );
  const subtotalElement = document.querySelector(
    '#subtotal table tr:nth-child(1) td:nth-child(2)'
  );
  const totalElement = document.querySelector(
    '#subtotal table tr:nth-child(3) td:nth-child(2)'
  );

  // Add event listeners to remove buttons
  removeButtons.forEach(function (button) {
    button.addEventListener('click', function (event) {
      event.preventDefault();
      const row = event.target.closest('tr');
      row.remove();
      updateSubtotal();
    });
  });

  // Add event listeners to quantity inputs
  quantityInputs.forEach(function (input) {
    input.addEventListener('change', function (event) {
      updateSubtotal();
    });
  });

  // Function to update subtotal and total
  function updateSubtotal() {
    let subtotal = 0;
    const rows = document.querySelectorAll('#cart tbody tr');
    rows.forEach(function (row) {
      const price = parseFloat(
        row.querySelector('td:nth-child(4)').textContent.replace(/[^\d.]/g, '')
      );
      const quantity = parseInt(
        row.querySelector("input[type='number']").value
      );
      const rowSubtotal = price * quantity;
      row.querySelector('td:nth-child(6)').textContent =
        '₨ ' + rowSubtotal.toFixed(2);
      subtotal += rowSubtotal;
    });
    subtotalElement.textContent = '₨ ' + subtotal.toFixed(2);
    totalElement.textContent = '₨ ' + subtotal.toFixed(2); // Update total
  }
});

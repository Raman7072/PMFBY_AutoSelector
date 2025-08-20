(async function () {
    let startNumber = parseInt(prompt("Enter the starting number: ").trim(), 10);

    if (isNaN(startNumber) || startNumber <= 0) {
        alert("❌ Invalid starting number!");
        return;
    }

    const scrollContainer = document.querySelector('.table-responsive');
    if (!scrollContainer) {
        alert("❌ Could not find scrollable container!");
        return;
    }

    function getLabeledCheckboxes() {
        let rows = Array.from(document.querySelectorAll('table tbody tr'));
        return rows.map(row => {
            let checkbox = row.querySelector('input[type="checkbox"][id="killaList"]');
            let numberCell = row.querySelectorAll('td')[1]; // second column
            let number = numberCell ? parseInt(numberCell.textContent.trim(), 10) : null;
            return { element: checkbox, number: number, row: row };
        }).filter(item => item.element && item.number !== null);
    }

    // Keep refreshing DOM reference as rows might load dynamically
    let labeledCheckboxes = getLabeledCheckboxes();
    let startIndex = labeledCheckboxes.findIndex(item => item.number === startNumber);

    if (startIndex === -1) {
        alert(`❌ Could not find checkbox with number ${startNumber}`);
        return;
    }

    let processed = 0;
    let targetCount = 99;

    while (processed < targetCount && startIndex + processed < labeledCheckboxes.length) {
        let item = labeledCheckboxes[startIndex + processed];

        // Make sure it's visible before clicking
        item.row.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Wait a bit for any lazy-loading
        await new Promise(r => setTimeout(r, 200));

        // Update value & simulate click
        item.element.value = "on"; // or dynamic per row if needed
        if (!item.element.checked) {
            item.element.click();
        }

        processed++;

        // Refresh list in case new rows appear after scrolling
        labeledCheckboxes = getLabeledCheckboxes();
    }

    alert(`✅ Processed ${processed} checkboxes starting from ${startNumber}`);
})();

const fs = require('fs');
const path = require('path');
const ExcelJS = require('exceljs');

async function runTests() {
  console.log('🧪 Starting Job Application Tracker Excel & Data Tests...');

  const templatePath = path.join(__dirname, '..', 'Job Tracker Template (Premium).xlsx');
  if (!fs.existsSync(templatePath)) {
    throw new Error('Template file missing at ' + templatePath);
  }

  // Test 1: Read workbook sheets
  console.log('Test 1: Reading Excel workbook structure...');
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(templatePath);

  const sheets = wb.worksheets.map(ws => ws.name);
  console.log('Found sheets:', sheets);
  if (!sheets.includes('Tracker')) {
    throw new Error('Missing Tracker sheet');
  }

  // Test 2: Parse Tracker sheet row 5 headers and data rows
  console.log('Test 2: Verifying headers and sample rows...');
  const tracker = wb.getWorksheet('Tracker');
  const row5 = tracker.getRow(5);
  const companyHeader = row5.getCell(4).value;
  const positionHeader = row5.getCell(5).value;

  if (companyHeader !== 'Company' || positionHeader !== 'Program') {
    throw new Error(`Unexpected headers: col D=${companyHeader}, col E=${positionHeader}`);
  }
  console.log('✓ Headers matched: Col D = "Company", Col E = "Program"');

  // Test 3: Modify rows preserving template styling and write to buffer
  console.log('Test 3: Testing export writing & shared formula protection...');
  const maxRow = Math.max(255, tracker.rowCount);

  // Clear all shared formula attributes across all rows for columns C..J
  for (let r = 6; r <= maxRow; r++) {
    const row = tracker.getRow(r);
    for (let c = 3; c <= 10; c++) {
      const cell = row.getCell(c);
      const model = cell.model;
      if (model) {
        delete model.shareType;
        delete model.ref;
        delete model.formula;
        delete model.sharedFormula;
      }
      cell.value = null;
    }
  }

  // Insert mock application
  const r6 = tracker.getRow(6);
  r6.getCell(3).value = 1;
  r6.getCell(4).value = 'DeepMind / Google';
  r6.getCell(5).value = 'Staff AI Engineer';
  r6.getCell(6).value = 'Fulltime';
  r6.getCell(7).value = 'Referral';
  r6.getCell(8).value = new Date('2026-10-31');
  r6.getCell(9).value = 'Offering';
  r6.getCell(10).value = 'Top priority offer';
  r6.commit();

  const buffer = await wb.xlsx.writeBuffer();
  console.log(`✓ Workbook successfully generated! Size: ${buffer.byteLength} bytes`);

  // Test 4: Re-read the generated buffer to verify integrity
  console.log('Test 4: Verifying written workbook can be reloaded and parsed...');
  const verifyWb = new ExcelJS.Workbook();
  await verifyWb.xlsx.load(buffer);
  const verifyTracker = verifyWb.getWorksheet('Tracker');
  const writtenCompany = verifyTracker.getRow(6).getCell(4).value;
  const writtenPosition = verifyTracker.getRow(6).getCell(5).value;

  if (writtenCompany !== 'DeepMind / Google' || writtenPosition !== 'Staff AI Engineer') {
    throw new Error(`Data mismatch on re-read: ${writtenCompany} / ${writtenPosition}`);
  }
  console.log(`✓ Re-read verified: ${writtenCompany} — ${writtenPosition}`);

  console.log('🎉 All test suites passed successfully!');
}

runTests().catch((err) => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});

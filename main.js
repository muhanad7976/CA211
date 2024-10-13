function calculateTotalTarget(startDate, endDate, totalAnnualTarget) {
    // Helper function to check if the given date is a Friday
    function isFriday(date) {
      return date.getDay() === 5; // Fridays are day 5 in JavaScript
    }
  
    // Helper function to count working days (excluding Fridays) in a month
    function countWorkingDays(start, end) {
      let count = 0;
      let currentDate = new Date(start);
  
      while (currentDate <= end) {
        if (!isFriday(currentDate)) {
          count++;
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
  
      return count;
    }
  
    // Convert input strings to Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    let totalWorkingDays = 0;
    let currentDate = new Date(start.getFullYear(), start.getMonth(), 1);
    let daysExcludingFridays = [];
    let daysWorkedExcludingFridays = [];
  
    // Loop through each month from startDate to endDate
    while (currentDate <= end) {
      let year = currentDate.getFullYear();
      let month = currentDate.getMonth();
  
      // First and last day of the current month
      let startOfMonth = new Date(year, month, 1);
      let endOfMonth = new Date(year, month + 1, 0);
  
      // Get the number of working days in the current month
      let workingDaysInMonth = countWorkingDays(startOfMonth, endOfMonth);
      daysExcludingFridays.push(workingDaysInMonth);
  
      // Calculate actual working days for the given range within the current month
      let startInRange = startOfMonth < start ? start : startOfMonth;
      let endInRange = endOfMonth > end ? end : endOfMonth;
      let workedDaysInMonth = countWorkingDays(startInRange, endInRange);
      daysWorkedExcludingFridays.push(workedDaysInMonth);
  
      // Sum up total working days within the range
      totalWorkingDays += workedDaysInMonth;
  
      // Move to the next month
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
  
    // Proportionally distribute the target across the actual working days
    let monthlyTargets = daysWorkedExcludingFridays.map(days => (days / totalWorkingDays) * totalAnnualTarget);
  
    return {
      daysExcludingFridays: daysExcludingFridays,
      daysWorkedExcludingFridays: daysWorkedExcludingFridays,
      monthlyTargets: monthlyTargets,
      totalTarget: totalAnnualTarget
    };
} 
console.log(calculateTotalTarget('2024-2-1')) 

const dateFormatter = (last_update) => {
    const formatDate = (updatedtime) => {
        const dateObject = new Date(updatedtime * 1000);
        return dateObject.toLocaleString(); 
      }
    const inputDate = formatDate(last_update);
    const [datePart, timePart] = inputDate.split(', ');
    const [day, month, year] = datePart.split('/');
    const [hours, minutes] = timePart.split(':');
    const newDate = new Date(`${month} ${day}, ${year} ${hours}:${minutes}: UTC`);
 
    const options = {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZone: 'Asia/Kolkata',
    };
  
    return newDate.toLocaleString('en-US', options);
  }

  export { dateFormatter }
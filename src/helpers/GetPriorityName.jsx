function GetPriorityName(priority) {

  switch (priority) {
    case 1:
      priority = "High"
      break;
    
    case 2:
    priority = "Medium"
    break;
    case 3:
      priority = "Low"
    default:
      break;
  }
  return priority;
}

export default GetPriorityName;
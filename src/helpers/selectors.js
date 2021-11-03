
export function getAppointmentsForDay(state, day) {
let result = []

for (const key of state.days){
  if (key.name === day){
    for (const id of key.appointments)
      result.push(state.appointments[id])
    }
  }
return result
}



export function getInterview(state, interview) {
  let result = {}
  if (!state.interviewers || !interview){
    return null;
  }
  for (const key in state.interviewers){
    if (state.interviewers[key].id === interview.interviewer){
      result.interviewer = state.interviewers[key];
      result.student = interview.student
    }
  }
  return result
}




export function getInterviewersForDay(state, day) {

//user will select a day - find current day
//get interviewers id from that day
//create empty array full of interviewers obj
//push each interviewer object into array
//return array of objects


let result = [];
if (!day){
  return result
}

for (const item of state.days){
  if (item.name === day){
    for(const id of item.interviewers){
      result.push(state.interviewers[id])
    }

  }
}
return result

}
  
  


export interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  category: string;
  explanation?: string;
}

export const questions: Question[] = [
  // Road Rules & Right of Way
  { id: 1, question: "What is the correct sequence of a robot (traffic light)?", options: ["Amber, Red, Green", "Red, Amber, Green", "Green, Red, Amber"], correctIndex: 1, category: "Traffic Lights" },
  { id: 2, question: "I may park my vehicle not closer to the corner than:", options: ["6.5m", "8m", "7.5m"], correctIndex: 2, category: "Parking" },
  { id: 3, question: "A continuous white line in the centre of the road may:", options: ["Be crossed if the road ahead is clear", "Not be crossed for the purpose of overtaking", "Be crossed only on highways"], correctIndex: 1, category: "Road Markings" },
  { id: 4, question: "Direction arrows used with prohibition lines on the road surface:", options: ["Are for information purposes only", "Relate to taxi drivers only", "Have a regulatory effect"], correctIndex: 2, category: "Road Markings" },
  { id: 5, question: "At a flashing amber robot I would:", options: ["Give right of way to traffic from the left", "Wait until the road ahead is clear", "Give right of way to traffic from your right"], correctIndex: 2, category: "Traffic Lights" },
  { id: 6, question: "When approaching a give way sign:", options: ["I am obliged to stop before proceeding", "I must give way to traffic from my right only", "I may proceed with caution if no approaching vehicle"], correctIndex: 2, category: "Signs" },
  { id: 7, question: "A broken yellow line on the left of the road indicates:", options: ["It may be straddled to overtake traffic turning right", "It may be straddled to overtake cyclists", "It may not be straddled"], correctIndex: 0, category: "Road Markings" },
  { id: 8, question: "If involved in a serious accident I must:", options: ["Report to police within 24 hours", "Report to a hospital", "Report to police as soon as possible, or within 24 hours"], correctIndex: 2, category: "Rules" },
  { id: 9, question: "When approaching a narrow bridge, I must pay attention to:", options: ["Height restriction", "Length restriction", "Width restriction"], correctIndex: 2, category: "Signs" },
  { id: 10, question: "When travelling at 60km/h, what distance should I leave?", options: ["4 vehicle lengths", "5 vehicle lengths", "6 vehicle lengths"], correctIndex: 1, category: "Following Distance" },
  { id: 11, question: "When travelling at 90km/h I must leave a gap of:", options: ["Six vehicle lengths", "Five vehicle lengths", "Seven vehicle lengths"], correctIndex: 0, category: "Following Distance" },
  { id: 12, question: "The purpose of the parking brake is to:", options: ["Keep the vehicle stationary", "Keep the vehicle stationary on a gradient only", "Slow the vehicle down"], correctIndex: 0, category: "Vehicle Controls" },
  { id: 13, question: "What must you do before you change direction?", options: ["Signal intention before acting and check road is clear", "Signal intention when turning left only", "Signal intention when turning right only"], correctIndex: 0, category: "Rules" },
  { id: 14, question: "What time should drivers switch on headlights?", options: ["Any convenient time", "Between 5:30pm and 6:30am", "Between 5:30am and 6:30pm"], correctIndex: 1, category: "Lights" },
  { id: 15, question: "At a rail level crossing with open booms a driver should:", options: ["Look both sides and cross", "Quickly cross the railway", "Stop and look to the right"], correctIndex: 0, category: "Railway Crossings" },
  { id: 16, question: "A vehicle turning right should:", options: ["Give way to oncoming traffic", "Give way to pedestrians on the pavement", "Give way to window shopping pedestrians"], correctIndex: 0, category: "Right of Way" },
  { id: 17, question: "If dazzled by another vehicle's light, what must you do?", options: ["Dip, get out of the way and slow down", "Increase your speed", "Retaliate"], correctIndex: 0, category: "Night Driving" },
  { id: 18, question: "When a fire engine approaches sounding its siren, what do you do?", options: ["Move as fast as possible", "Move out of its course and stop", "Move slowly on the left side"], correctIndex: 1, category: "Right of Way" },
  { id: 19, question: "In a traffic circle, I shall indicate:", options: ["When going in", "When going out", "When making a U-turn"], correctIndex: 1, category: "Traffic Circles" },
  { id: 20, question: "All vehicles shall have:", options: ["Either red or white reflectors in front", "Red reflectors in front", "White reflectors in front"], correctIndex: 2, category: "Vehicle Safety" },
  { id: 21, question: "A heavy vehicle may tow not more than:", options: ["One trailer", "Two trailers", "Three trailers"], correctIndex: 2, category: "Towing" },
  { id: 22, question: "When carrying a passenger on my motorcycle, I must:", options: ["Have headlamps fitted", "Have the petrol tank filled", "Have a pillion and foot rests firmly fixed"], correctIndex: 2, category: "Motorcycles" },
  { id: 23, question: "When travelling behind another vehicle at night, I must:", options: ["Dip my headlamps", "Switch on my sidelights", "Drive slowly"], correctIndex: 0, category: "Night Driving" },
  { id: 24, question: "When should a horn be used?", options: ["To attract a friend's attention", "When warning another road user", "When cattle are blocking the road"], correctIndex: 1, category: "Rules" },
  { id: 25, question: "In which circumstances would I proceed against a red robot?", options: ["When the green arrow is illuminated", "When there is no approaching traffic", "When the road is clear on the right"], correctIndex: 0, category: "Traffic Lights" },
  { id: 26, question: "A broken white line beside a continuous white line indicates:", options: ["May overtake if continuous line is on my side", "May overtake if broken line is on my side", "Must keep well left"], correctIndex: 1, category: "Road Markings" },
  { id: 27, question: "What must you do when meeting a vehicle displaying L-plates?", options: ["Hoot if blocking your path", "Exercise extreme caution", "Flash headlights"], correctIndex: 1, category: "Rules" },
  { id: 28, question: "The insignia of a danger warning sign is:", options: ["A triangle", "A circle", "A rectangle"], correctIndex: 0, category: "Signs" },
  { id: 29, question: "Cyclists should ride:", options: ["As many as possible abreast", "Two abreast", "Single file"], correctIndex: 2, category: "Cyclists" },
  { id: 30, question: "When facing a red robot with a green arrow straight ahead, I may:", options: ["Proceed straight ahead", "Turn right if I wish", "Not proceed"], correctIndex: 0, category: "Traffic Lights" },
  { id: 31, question: "I should always yield right of way to:", options: ["Ambulance sounding a siren", "Presidential motorcade", "All of the above"], correctIndex: 2, category: "Right of Way" },
  { id: 32, question: "A solid yellow line on the left of the road indicates:", options: ["May be straddled to overtake turning traffic", "May be straddled to overtake cyclists", "May not be straddled"], correctIndex: 2, category: "Road Markings" },
  { id: 33, question: "When approaching a pedestrian crossing you should:", options: ["Sound the horn", "Accelerate quickly over it", "Slow down and prepare to stop"], correctIndex: 2, category: "Pedestrians" },
  { id: 34, question: "A heavy vehicle towing independent trailers must have:", options: ["Safety chains fitted to the trailers", "More pulling power", "As many spare wheels as possible"], correctIndex: 0, category: "Towing" },
  { id: 35, question: "When approaching a slow moving combine harvester:", options: ["Increase speed and overtake", "Slow down and give it space", "Slow down and keep behind until safe to overtake"], correctIndex: 2, category: "Rules" },
  { id: 36, question: "To drive a heavy vehicle you must have reached:", options: ["Nineteen years", "Eighteen years", "Seventeen years"], correctIndex: 1, category: "Licensing" },
  { id: 37, question: "What is the legal maximum speed on a Zimbabwean Highway?", options: ["120km/h for all vehicles", "120km/h for light, 80km/h for heavy vehicles", "Between 80 and 120 km/h on all roads"], correctIndex: 1, category: "Speed" },
  { id: 38, question: "When you are driving and feel sleepy, what must you do?", options: ["Maintain a high speed", "Maintain a slow speed", "Move off the road and rest"], correctIndex: 2, category: "Safety" },
  { id: 39, question: "At a narrow bridge, I am not allowed to:", options: ["Dip my lights for oncoming vehicles", "Overtake slow moving vehicles", "Slow down and check the road"], correctIndex: 1, category: "Bridges" },
  { id: 40, question: "A speed restriction sign means:", options: ["Do not exceed the stated speed", "Drive below the stated speed", "Watch out for the police"], correctIndex: 0, category: "Signs" },
  { id: 41, question: "When stopping a vehicle on a road (except in traffic), where will you stop?", options: ["Extreme left or authorized parking place", "Extreme right of the road", "In the middle if safe"], correctIndex: 0, category: "Parking" },
  { id: 42, question: "A vehicle should be fitted with reflectors of what colour?", options: ["Amber front, red back", "White front, amber back", "White front, red back"], correctIndex: 2, category: "Vehicle Safety" },
  { id: 43, question: "Who is required to wear a crash helmet?", options: ["Cyclists only", "Motor cyclists only", "Both of the above"], correctIndex: 2, category: "Safety" },
  { id: 44, question: "At what age are cyclists not allowed to carry passengers?", options: ["50 years", "Over 18 years", "Under 16 years"], correctIndex: 2, category: "Cyclists" },
  { id: 45, question: "Which is a possible sequence of a robot?", options: ["Amber, Green, Red, filter arrow", "Green, Red, filter arrow", "Red, filter arrow, Green, Amber"], correctIndex: 2, category: "Traffic Lights" },
  { id: 46, question: "When approaching a flooded bridge what do you do?", options: ["Do not attempt to cross", "Engage low gear and proceed slowly", "Cross only with heavy vehicle"], correctIndex: 0, category: "Bridges" },
  { id: 47, question: "A driving school vehicle must have:", options: ["L-plates and instructor certificate", "Certificate of fitness and insurance", "Dual brakes and vehicle licence"], correctIndex: 2, category: "Licensing" },
  { id: 48, question: "When travelling at 60km/h the reaction distance is:", options: ["5.6m", "10m", "16.7m"], correctIndex: 0, category: "Stopping Distance" },
  { id: 49, question: "How many meters do you indicate before turning on a main road at high speed?", options: ["50m", "100m", "150m"], correctIndex: 1, category: "Signals" },
  { id: 50, question: "When travelling at 120km/h what is the reaction distance?", options: ["5.6m", "10m", "16.7m"], correctIndex: 2, category: "Stopping Distance" },
  { id: 51, question: "When travelling at 40km/h what is the stopping distance?", options: ["12.4m", "18m", "24m"], correctIndex: 1, category: "Stopping Distance" },
  { id: 52, question: "How many reflective triangles does a lorry carrying 3 trailers have?", options: ["4", "6", "8"], correctIndex: 2, category: "Vehicle Safety" },
  { id: 53, question: "One-way sign is in which class and what colour?", options: ["Regulatory, Red", "Informative, Green", "Warning, Yellow"], correctIndex: 1, category: "Signs" },
  { id: 54, question: "Stop lines are:", options: ["Longitudinal lines", "Transverse lines", "Diagonal lines"], correctIndex: 1, category: "Road Markings" },
  { id: 55, question: "How many meters do you indicate before turning in city traffic?", options: ["30 metres", "50 metres", "100 metres"], correctIndex: 1, category: "Signals" },
  { id: 56, question: "Pedal cyclists must not carry a load of more than:", options: ["20 kgs", "30 kgs", "40 kgs"], correctIndex: 2, category: "Cyclists" },
  { id: 57, question: "Class 1 drivers and public vehicle applicants must be age of:", options: ["21 with medical", "25 with medical", "18 with medical"], correctIndex: 1, category: "Licensing" },
  { id: 58, question: "When travelling at 40km/h what is the braking distance?", options: ["12.4m", "18m", "24m"], correctIndex: 0, category: "Stopping Distance" },
  { id: 59, question: "In a learner vehicle, how many passengers are you allowed to carry?", options: ["1 and the instructor", "None", "Two"], correctIndex: 1, category: "Licensing" },
  { id: 60, question: "What are lane changing procedures?", options: ["Mirror, signal, blind spot, hand signal", "Mirror and blind spot", "Blind spot and signal"], correctIndex: 0, category: "Rules" },
  { id: 61, question: "At the age of 16, a person can get a licence in which class?", options: ["Classes 2 and 5", "Class 3 and 4", "Class 1 and 2"], correctIndex: 1, category: "Licensing" },
  { id: 62, question: "A learner driver is exempt from wearing seat belts only when:", options: ["Driving under instruction", "Driving at low speeds", "Reversing"], correctIndex: 2, category: "Safety" },
  { id: 63, question: "When can an applicant apply for a duplicate learner's licence?", options: ["The original has expired", "The original has been lost or defaced", "When going for road test"], correctIndex: 1, category: "Licensing" },
  { id: 64, question: "An ambulance has right of way when:", options: ["Sounding its siren", "Travelling at high speed", "Flashing emergency lights and sounding siren"], correctIndex: 2, category: "Right of Way" },
  { id: 65, question: "Motor cycles should travel in which lane?", options: ["Right lane", "Left lane", "Centre lane"], correctIndex: 1, category: "Motorcycles" },
  { id: 66, question: "A driver's medical certificate is valid for how long?", options: ["12 months", "8 months", "16 months"], correctIndex: 0, category: "Licensing" },
  { id: 67, question: "What is a blind spot?", options: ["A depression", "A dangerous place", "The portion not seen by mirrors"], correctIndex: 2, category: "Safety" },
  { id: 68, question: "What is hazardous perception?", options: ["A dangerous place", "Anticipation of what is in front", "A wrong turn"], correctIndex: 1, category: "Safety" },
  { id: 69, question: "On a bridge one should not:", options: ["Accelerate", "Change gears", "Overtake slow moving vehicles"], correctIndex: 2, category: "Bridges" },
  { id: 70, question: "Fog lights are used:", options: ["When parking", "During a breakdown", "When it is misty"], correctIndex: 2, category: "Lights" },
  { id: 71, question: "What is the use of a clutch?", options: ["To reduce speed", "To connect/disconnect engine from gearbox", "To increase speed"], correctIndex: 1, category: "Vehicle Controls" },
  { id: 72, question: "What is the colour of reflectors at the front of vehicles?", options: ["Red", "White", "Yellow"], correctIndex: 1, category: "Vehicle Safety" },
  { id: 73, question: "When do you indicate in a roundabout?", options: ["When slowing down", "To caution other drivers", "When going out"], correctIndex: 2, category: "Traffic Circles" },
  { id: 74, question: "At a pedestrian crossing place, what do you do?", options: ["Keep to extreme left", "Use hazards", "Exercise caution and proceed if safe"], correctIndex: 2, category: "Pedestrians" },
  { id: 75, question: "What is the purpose of a hooter?", options: ["Alerting animals", "Alerting pedestrians", "Alerting other vehicles"], correctIndex: 2, category: "Vehicle Controls" },
  { id: 76, question: "In which class is a one-way sign?", options: ["Regulatory", "Informative", "Carriage markings"], correctIndex: 1, category: "Signs" },
  { id: 77, question: "I must dip my headlamps when:", options: ["Approaching a railway level crossing", "Driving in a well-lit area", "Approaching an urban area"], correctIndex: 1, category: "Lights" },
  { id: 78, question: "In rural areas where traffic is not controlled, give precedence to:", options: ["Traffic from a road on the left", "Traffic from a road on the right", "Traffic already in intersection regardless of side"], correctIndex: 2, category: "Right of Way" },
  { id: 79, question: "At a robot-controlled intersection, if stopped over pedestrian lines:", options: ["Carry on", "Reverse the vehicle", "Stay where you are"], correctIndex: 2, category: "Traffic Lights" },
  { id: 80, question: "When travelling at 75km/h I must leave a gap of:", options: ["Five vehicle lengths", "Four vehicle lengths", "Seven vehicle lengths"], correctIndex: 0, category: "Following Distance" },
  { id: 81, question: "Passengers getting off a bus should:", options: ["Cross from whichever side is safe", "Cross from rear or front of bus", "Wait until bus leaves then cross"], correctIndex: 2, category: "Pedestrians" },
  { id: 82, question: "A driver of a public service vehicle must undergo retesting after:", options: ["3 years", "5 years", "10 years"], correctIndex: 1, category: "Licensing" },
  { id: 83, question: "Which vehicle has the right of way: ambulance, police car, or motorcade?", options: ["Ambulance", "Police car", "Motorcade"], correctIndex: 2, category: "Right of Way" },
  { id: 84, question: "When parked on an incline, what should you do?", options: ["Engage high gear, steer toward curb", "Engage lower gear, apply handbrake", "Engage reverse, apply handbrake"], correctIndex: 1, category: "Parking" },
  { id: 85, question: "What do you do when you see an aeroplane in your rear view mirror?", options: ["Exercise extreme caution", "Do nothing", "Slow down"], correctIndex: 2, category: "Safety" },
  { id: 86, question: "When you are on a straight ahead lane you should:", options: ["Reduce speed", "Not turn at all", "Increase speed"], correctIndex: 1, category: "Rules" },
  { id: 87, question: "A seat belt is not necessary when:", options: ["Reversing", "Driving in rural areas", "Increasing speed"], correctIndex: 0, category: "Safety" },
  { id: 88, question: "How do you stop on the road?", options: ["Slow down, check mirror and signal", "Check mirror, reduce speed, pull off then stop", "Reduce speed, stop"], correctIndex: 1, category: "Rules" },
  { id: 89, question: "What are diverging lines?", options: ["Transverse lines", "Lines crossing the road", "Lines which form two"], correctIndex: 2, category: "Road Markings" },
  { id: 90, question: "When parking a vehicle on the side of the road at night, use:", options: ["Headlights", "Park lights", "Side lights"], correctIndex: 1, category: "Parking" },
];

export const categories = [...new Set(questions.map(q => q.category))];

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

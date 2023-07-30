window.onload = function() {
  const alarmList = [
    {
        name: "Normal Course Day (Long courses)",
        times: ["4:00:00", "6:30:00", "7:50:00", "9:00:00", "11:00:00", "12:50:00", "14:15:00","14:20:00", "15:30:00", "17:00:00", "17:50:00", "19:07:00", "21:00:10","22:16:10"]
    },
    {
      name: "Metta Days (Long courses)",
      times: ["4:00:00", "6:30:00", "7:50:00", "9:00:00", "11:00:00", "14:20:00", "15:30:00", "17:00:00", "17:50:00", "19:07:00"]
    },
    {
      name: "Final Day (Long courses)",
      times: ["5:30:00","9:20:00", "11:45:00", "14:20:00", "17:00:00", "17:50:00"]
    },
    {
      name: "Normal Course Day (Short courses)",
      times: ["4:00:00","4:20:00", "6:30:10", "7:50:00", "9:07:00", "11:00:00", "12:50:00", "14:15:00", "14:22:00", "15:37:00", "17:00:00", "17:50:00", "19:07:00"]
    },
    {
      name: "Vipassana Day (10-day course)",
      times: ["4:00:00","4:20:00", "6:30:10", "7:50:00", "9:07:00", "11:00:00", "12:50:00", "13:45:00", "13:53:00", "15:07:00", "17:00:00", "17:50:00", "19:07:00"]
    },
    {
      name: "Metta Day (Short courses)",
      times: ["4:00:00","4:20:00", "6:30:10", "7:50:00", "9:07:00", "11:00:00", "12:50:00", "13:45:00", "13:53:00", "15:07:00", "17:00:00", "17:50:00", "19:07:00"]
    },
    {
      name: "Final Day (Short courses)",
      times: ["4:00:00", "4:20:00", "6:30:10", "7:50:00", "9:07:00", "11:00:00", "14:20:00", "15:55:00", "17:00:00", "17:50:00", "19:07:00"]
    },
    {
      name: "General Service Period",
      times: ["4:00:00", "4:20:00", "9:20:00", "11:45:00", "14:20:00", "17:00:00", "17:50:00"]
    },
    {
      name: "Automations Off (day 0 & 3-day courses)",
      times: ["99:99"]
    },
    // repeat for the rest of the items
    // I've only included the first one as an example, you would fill the rest in the same manner
];
console.log("list of alarms : ")
for (let i = 0; i < alarmList.length; i++) {
           console.log("name  : " + alarmList[i].name)
           console.log("times : " + alarmList[i].times)
        }
console.log('--------------------------------------------------------')

  const alarmContainer = document.getElementById('alarm-container');

  // Empty array to hold the selected alarm times
  let mainAlarm = [];

  alarmList.forEach((item, index) => {
    const switchContainer = document.createElement('div');
    const switchLabel = document.createElement('label');
    const switchInput = document.createElement('input');
    const switchSlider = document.createElement('span');

    switchContainer.className = 'switch-container';

    switchLabel.htmlFor = 'alarm-' + index;
    switchLabel.innerText = item.name;

    const switchDiv = document.createElement('div');
    switchDiv.className = 'switch';

    switchInput.type = 'checkbox';
    switchInput.id = 'alarm-' + index;
    switchInput.className = 'alarm-switch';
    const allSwitches = document.getElementsByClassName('alarm-switch');
    switchInput.addEventListener('change', function() {
      console.log('Change event fired');  // New log here
  
      const allSwitches = document.getElementsByClassName('alarm-switch');
      if (this.checked) {
        mainAlarm = [...item.times];
        console.log('alarms that is set ' + mainAlarm)
        console.log('the switch that switched on ' + item.name)
        console.log('the switch that switched on ' + item.times)
        console.log('--------------------------------------------------------')
        // Loop through all switches and turn off the others
        for (let i = 0; i < allSwitches.length; i++) {
            if (allSwitches[i].id !== this.id) {
                allSwitches[i].checked = false;
            }
        }
        } else {
          // If the alarm is turned off, clear the mainAlarm array
          mainAlarm = [];
        }
    
    });
   
    switchSlider.className = 'slider round';

    switchDiv.appendChild(switchInput);
    switchDiv.appendChild(switchSlider);
    switchContainer.appendChild(switchLabel);
    switchContainer.appendChild(switchDiv);
    alarmContainer.appendChild(switchContainer);
  });

  // Function to play the alarm sound
  function playSound() {
    console.log('playing sound')
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let request = new XMLHttpRequest();

    request.open('GET', 'Gong Recorded.mp3', true);
    request.responseType = 'arraybuffer';

    request.onload = function() {
      audioContext.decodeAudioData(request.response, function(buffer) {
        let source = audioContext.createBufferSource(); 
        source.buffer = buffer;
        source.connect(audioContext.destination);
        source.start(0);
        console.log("playing gong sound")
      }, function(e) {
        console.log('Error decoding audio data' + e.err);
      });
    }

    request.send();
  }

  // Function to check if the current time matches any alarm time
  function checkTime() {
    let now = new Date();
    let timeString = now.getHours() + ":" + now.getMinutes();

    // Check if the current time is in the mainAlarm array
    if (mainAlarm.includes(timeString)) {
      playSound();
    }
  }

  // Check the time every minute
  setInterval(checkTime, 60000);
}
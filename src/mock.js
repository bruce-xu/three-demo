import alarmManager from "./utils/alarm";

const ch4Btn = document.getElementById('ch4Btn');
const coBtn = document.getElementById('coBtn');
const smokeBtn = document.getElementById('smokeBtn');
const dustBtn = document.getElementById('dustBtn');
const tempBtn = document.getElementById('tempBtn');

const ch4SensorCard = document.getElementById('ch4SensorCard');
const coSensorCard = document.getElementById('coSensorCard');
const smokeSensorCard = document.getElementById('smokeSensorCard');
const dustSensorCard = document.getElementById('dustSensorCard');
const tempSensorCard = document.getElementById('tempSensorCard');


ch4Btn.addEventListener('click', () => {
  const hasAlarm = alarmManager.checkAlarm('CH4');
  if (!hasAlarm) {
    alarmManager.triggerAlarm('CH4');
    ch4Btn.textContent = '结束甲烷异常';
    ch4Btn.classList.add('active');
    ch4SensorCard.classList.add('alarm');
  } else {
    alarmManager.stopAlarm('CH4');
    ch4Btn.textContent = '模拟甲烷异常';
    ch4Btn.classList.remove('active');
    ch4SensorCard.classList.remove('alarm');
  }
});

coBtn.addEventListener('click', () => {
  const hasAlarm = alarmManager.checkAlarm('CO');
  if (!hasAlarm) {
    alarmManager.triggerAlarm('CO');
    coBtn.textContent = '结束一氧化碳异常';
    coBtn.classList.add('active');
    coSensorCard.classList.add('alarm');
  } else {
    alarmManager.stopAlarm('CO');
    coBtn.textContent = '模拟一氧化碳异常';
    coBtn.classList.remove('active');
    coSensorCard.classList.remove('alarm');
  }
});

smokeBtn.addEventListener('click', () => {
  const hasAlarm = alarmManager.checkAlarm('Smoke');
  if (!hasAlarm) {
    alarmManager.triggerAlarm('Smoke');
    smokeBtn.textContent = '结束烟雾异常';
    smokeBtn.classList.add('active');
    smokeSensorCard.classList.add('alarm');
  } else {
    alarmManager.stopAlarm('Smoke');
    smokeBtn.textContent = '模拟烟雾异常';
    smokeBtn.classList.remove('active');
    smokeSensorCard.classList.remove('alarm');
  }
});

dustBtn.addEventListener('click', () => {
  const hasAlarm = alarmManager.checkAlarm('Dust');
  if (!hasAlarm) {
    alarmManager.triggerAlarm('Dust');
    dustBtn.textContent = '结束粉尘异常';
    dustBtn.classList.add('active');
    dustSensorCard.classList.add('alarm');
  } else {
    alarmManager.stopAlarm('Dust');
    dustBtn.textContent = '模拟粉尘异常';
    dustBtn.classList.remove('active');
    dustSensorCard.classList.remove('alarm');
  }
});

let tempHasAlarm = false;
tempBtn.addEventListener('click', () => {
  if (!tempHasAlarm) {
    tempBtn.textContent = '结束温度异常';
    tempBtn.classList.add('active');
    tempSensorCard.classList.add('alarm');
  } else {
    tempBtn.textContent = '模拟温度异常';
    tempBtn.classList.remove('active');
    tempSensorCard.classList.remove('alarm');
  }
  tempHasAlarm = !tempHasAlarm; // 切换状态
});
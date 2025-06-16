
export class AlarmManager {
  constructor() {
    this.alarms = new Map(); // 存储报警器实例
    this.currentAlarms = new Set(); // 当前正在报警的类型
  }

  /**
   * 添加报警器
   * @param {string} type - 报警器类型
   * @param {Detector} detector - 关联的检测器实例
   */
  addAlarm(type, detector) {
    if (!this.alarms.has(type)) {
      this.alarms.set(type, detector);
    }
  }

  removeAlarm(type) {
    if (this.alarms.has(type)) {
      this.alarms.delete(type);
    }
  }

  getAlarmModel(type) {
    return this.alarms.has(type) ? this.alarms.get(type).getModel() : null;
  }

  triggerAlarm(type) {
    if (this.alarms.has(type)) {
      const detector = this.alarms.get(type);
      detector.triggerAlarm(); // 开始报警
      this.currentAlarms.add(detector); // 添加到当前报警集合
    }
  }

  stopAlarm(type) {
    if (this.alarms.has(type)) {
      const detector = this.alarms.get(type);
      detector.stopAlarm(); // 停止报警
      this.currentAlarms.delete(detector); // 从当前报警集合中移除
    }
  }

  checkAlarm(type) {
    return this.currentAlarms.has(this.alarms.get(type)); // 检查指定类型的报警器是否正在报警
  }

  getAlarmState() {
    return this.currentAlarms.size > 0; // 如果有任何报警器正在报警，则返回 true
  }
}

const alarmManager = new AlarmManager();

export default alarmManager;
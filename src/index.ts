class School {
  // implement 'add area', 'remove area', 'add lecturer', and 'remove lecturer' methods

  _areas: string[] = [];

  // Name, surname, position, company, experience, courses, contacts

  _lecturers: {
    name: string;
    surname: string;
    position: string;
    company: string;
    experience: number;
    courses: string[];
    contacts: number[];
  }[] = [];

  get areas(): string[] {
    return this._areas;
  }

  get lecturers(): {
    name: string;
    surname: string;
    position: string;
    company: string;
    experience: number;
    courses: string[];
    contacts: number[];
  }[] {
    return this._lecturers;
  }

  addArea(value: string): void {
    this._areas.push(value);
  }

  removeArea(area: string): void {
    this._areas = this._areas.filter(item => item !== area);
  }

  addLecture(obj: {
    name: string;
    surname: string;
    position: string;
    company: string;
    experience: number;
    courses: string[];
    contacts: number[];
  }): void {
    this._lecturers.push(obj);
  }

  removeLecturer(lacturerName: string): void {
    this._lecturers = this._lecturers.filter(item => item.name !== lacturerName);
  }
}

class Area {
  // implement getters for fields and 'add/remove level' methods
  _levels: Level[] = [];
  _name: string;

  get levels(): Level[] {
    return this._levels;
  }

  get name(): string {
    return this._name;
  }

  constructor(name: string) {
    this._name = name;
  }

  addLevel(obj: Level): void {
    this._levels.push(obj);
  }

  removeLevel(name: string): void {
    this._levels.filter(level => level._name !== name);
  }
}

class Level {
  // implement getters for fields and 'add/remove group' methods

  _groups: Group[] = [];
  _name: string;
  _description: string;

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get groups(): Group[] {
    return this._groups;
  }

  constructor(name: string, description: string) {
    this._name = name;
    this._description = description;
  }

  addGroup(group: Group): void {
    this._groups.push(group);
  }

  removeGroup(area: string): void {
    this._groups = this.groups.filter(group => group._area !== area);
  }
}

class Group {
  // implement getters for fields and 'add/remove student' and 'set status' methods

  _area: string;
  _status: string;
  _directionName: string;
  _levelName: string;
  _students: Student[] = []; // Modify the array so that it has a valid toSorted method*

  get area(): string {
    return this._area;
  }

  get status(): string {
    return this._status;
  }

  get directionName(): string {
    return this._directionName;
  }

  get levelName(): string {
    return this._levelName;
  }

  get students(): Student[] {
    return this._students;
  }

  set status(status: string) {
    this._status = status;
  }

  constructor(directionName: string, levelName: string, area: string, status: string, students: Student[]) {
    this._directionName = directionName;
    this._levelName = levelName;
    this._area = area;
    this._status = status;
    this._students = students;
  }

  addStudent(item: Student): void {
    this._students.push(item);
  }

  removeStudents(firstName: string, lastName: string): void {
    this._students = this._students.filter(item => item._firstName !== firstName && item._lastName !== lastName);
  }

  showPerformance(): Student[] {
    const sortedStudents = this._students.toSorted((a, b) => b.getPerformanceRating() - a.getPerformanceRating());
    return sortedStudents;
  }
}

class Student {
  // implement 'set grade' and 'set visit' methods
  _firstName: string;
  _lastName: string;
  _birthYear: number;
  _grades: { [workName: string]: number } = {}; // workName: mark
  _visits: { [lesson: string]: boolean } = {}; // lesson: present

  get fullName(): string {
    return `${this._lastName} ${this._firstName}`;
  }

  set fullName(value: string) {
    const [lastName, firstName] = value.split(' ');
    this._lastName = lastName;
    this._firstName = firstName;
  }

  get age(): number {
    return new Date().getFullYear() - this._birthYear;
  }

  set grade(obj: { workName: string; mark: number }) {
    this._grades[obj.workName] = obj.mark;
  }

  set visit(obj: { lesson: string; present: boolean }) {
    this._visits[obj.lesson] = obj.present;
  }

  constructor(firstName: string, lastName: string, birthYear: number) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._birthYear = birthYear;
  }

  getPerformanceRating(): number {
    const gradeValues = Object.values(this._grades);
    const visits = Object.values(this._visits);

    if (!gradeValues.length) return 0;

    const averageGrade = gradeValues.reduce((sum, grade) => sum + grade, 0) / gradeValues.length;
    const attendancePercentage = (visits.filter(present => present).length / visits.length) * 100;

    return (averageGrade + attendancePercentage) / 2;
  }
}

const FirstSchool = new School();
const NewArea = new Area('name1');

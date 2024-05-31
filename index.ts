#!/usr/bin/env node

import inquirer from 'inquirer';

class Student {
    static counter = 10000;
    id: number;
    name: string;
    courses: string[];
    balance: number;

    constructor(name: string) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 100;
    }

    enrollCourse(course: string) {
        this.courses.push(course);
    }

    viewBalance() {
        console.log(`Balance for ${this.name}: ${this.balance}`);
    }

    payFees(amount: number) {
        this.balance -= amount;
        console.log(`${amount} fees paid successfully for ${this.name}`);
    }

    showStatus() {
        console.log(`ID: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Courses: ${this.courses.join(', ')}`);
        console.log(`Balance: ${this.balance}`);
    }
}

class StudentManager {
    students: Student[];

    constructor() {
        this.students = [];
    }

    addStudent(name: string) {
        const student = new Student(name);
        this.students.push(student);
        return student;
    }

    findStudent(id: number) {
        return this.students.find(student => student.id === id);
    }
}

const studentManager = new StudentManager();

async function mainMenu() {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What do you want to do?',
            choices: [
                'Add a new student',
                'Enroll in a course',
                'View balance',
                'Pay fees',
                'Show student status',
                'Exit'
            ]
        }
    ]);

    switch (answers.action) {
        case 'Add a new student':
            await addStudent();
            break;
        case 'Enroll in a course':
            await enrollCourse();
            break;
        case 'View balance':
            await viewBalance();
            break;
        case 'Pay fees':
            await payFees();
            break;
        case 'Show student status':
            await showStatus();
            break;
        case 'Exit':
            return;
    }

    await mainMenu();
}

async function addStudent() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter student name:'
        }
    ]);

    const student = studentManager.addStudent(answers.name);
    console.log(`Student added with ID: ${student.id}`);
}

async function enrollCourse() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'Enter student ID:'
        },
        {
            type: 'input',
            name: 'course',
            message: 'Enter course name:'
        }
    ]);

    const student = studentManager.findStudent(Number(answers.id));
    if (student) {
        student.enrollCourse(answers.course);
        console.log(`Enrolled in course: ${answers.course}`);
    } else {
        console.log('Student not found');
    }
}

async function viewBalance() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'Enter student ID:'
        }
    ]);

    const student = studentManager.findStudent(Number(answers.id));
    if (student) {
        student.viewBalance();
    } else {
        console.log('Student not found');
    }
}

async function payFees() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'Enter student ID:'
        },
        {
            type: 'input',
            name: 'amount',
            message: 'Enter amount to pay:'
        }
    ]);

    const student = studentManager.findStudent(Number(answers.id));
    if (student) {
        student.payFees(Number(answers.amount));
    } else {
        console.log('Student not found');
    }
}

async function showStatus() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'Enter student ID:'
        }
    ]);

    const student = studentManager.findStudent(Number(answers.id));
    if (student) {
        student.showStatus();
    } else {
        console.log('Student not found');
    }
}

mainMenu();
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { inherits } = require("util");

let team = [];


// Function to build a team as per user choice

function buildTeam() {
    inquirer.prompt([{
        type: "list",
        message: "Please enter the role of an employee!",
        name: "role",
        choices: [
            "Manager",
            "Engineer",
            "Intern",
            "No more employees to add!"
        ]

    }])
        .then(input => {
            switch (input.role) {
                case "Manager":
                    addManager();
                    break;
                case "Engineer":
                    addEngineer();
                    break;
                case "Intern":
                    addIntern();
                    break;
                case "No more employees to add!":

                createHtml(team);
            }
        })
}

// Function to input for the Manager role

function addManager() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Please enter the full name of the manager!"

        },
        {
            type: "input",
            name: "id",
            message: "Please enter the ID of the manager!"
        },
        {
            type: "input",
            name: "email",
            message: "Please enter an email address of the manager!"
        },
        {
            type: "input",
            name: "officeNumber",
            message: "Please enter an office phone number of the manager!"
        }
    ])
        .then (input => {
            const manager = new Manager(input.name, input.id, input.email, input.officeNumber);
            team.push(manager);
            buildTeam();
        })
}

// Function to input for an Engineer role

function addEngineer() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Please enter the full name of an Engineer!"

        },
        {
            type: "input",
            name: "id",
            message: "Please enter the ID of an Engineer!"
        },
        {
            type: "input",
            name: "email",
            message: "Please enter an email address of an Engineer!"
        },
        {
            type: "input",
            name: "github",
            message: "Please enter the GitHub username of an Engineer!"
        }
    ])
        .then(input => {
            const engineer = new Engineer(input.name, input.id, input.email, input.github);
            team.push(engineer);
            buildTeam();
        })
}

// Function to input for an Intern role

function addIntern() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Please enter the full name of an Intern!"

        },
        {
            type: "input",
            name: "id",
            message: "Please enter the ID of an Intern!"
        },
        {
            type: "input",
            name: "email",
            message: "Please enter an email address of an Intern!"
        },
        {
            type: "input",
            name: "school",
            message: "Please enter school name of an Intern!"
        }
    ])
        .then(input => {
            const intern = new Intern(input.name, input.id, input.email, input.school);
            team.push(intern);
            buildTeam();
        })
}
buildTeam();

// Function to render team.html as per User choice

function createHtml() {
    // Create output directory if previously exist
    if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR);

    // Create team.html file
    fs.writeFileSync(outputPath, render(team));
}
createHtml();

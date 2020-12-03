const inquirer = require('inquirer');
const fs = require('fs');
const { url } = require('inspector');

var projectName;
var description;
var installation;
var licenses;
var usage;
var contributors;
var tests;
var anyQuestions;
var documentBody;

var table;
var userDescription;
var userInstallation;
var userLicenses;
var userContributors;
var userTests;
var userName;
var userUsage;
var email;

var licenseType; 
var licenseSummary;


// array of questions for user
const questions = [

    "What is the title of your project?",
    "Give a quick description of your project",
    "What is the installation process?",
    "What are the licenses for your project?",
    "What usage instructions do you have for this application?",
    "Who are the contributing members to this project?",
    "What tests have you performed for your project?",
    "Please enter your Github user name",
    "Please enter your email address",

];

// function to write README file
function writeToFile(fileName, data) {

    const filename = fileName;

    fs.writeFile(filename, data, (err) =>
        err ? console.log(err) : console.log('Success!')
    );
}

// function to initialize program
function init() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'projectName',
                message: questions[0],
            },
            {
                type: 'input',
                name: 'description',
                message: questions[1],
            },
            {
                type: 'input',
                name: 'installation',
                message: questions[2],
            },
            {
                type: 'list',
                name: 'licenses',
                message: questions[3],
                choices: ['None', 'Boost Software License', 'Apache License', 'BSD 3-Clause License', 'Eclipse Public License', 'The MIT License']
            },
            {
                type: 'input',
                name: 'usage',
                message: questions[4],
            },
            {
                type: 'input',
                name: 'contributors',
                message: questions[5],
            },
            {
                type: 'input',
                name: 'tests',
                message: questions[6],
            },
            {
                type: 'input',
                name: 'username',
                message: questions[7],
            },
            {
                type: 'input',
                name: 'email',
                message: questions[8],
            },
        ])
        .then((data) => {
            projectName = data.projectName;
            userDescription = data.description;
            userInstallation = data.installation;
            userLicenses = data.licenses;
            userUsage = data.usage;
            userContributors = data.contributors;
            userTests = data.tests;
            userName = "https://github.com/" + data.username;
            email = "[" + data.email + "](mailto:" + data.email +")" ;

            createSections();

            writeToFile("GeneratedREADME.md", documentBody);
        });
}

function writeBadge() {
    switch (userLicenses) {
        case "Boost Software License":
            
            licenseType = "[![License](https://img.shields.io/badge/License-Boost%201.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)";
            licenseSummary = "Boost Software License - Version 1.0"
            break; 
        case "Apache License":
            licenseType = "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
            licenseSummary = "Licensed under the Apache License, Version 2.0 ";
            break;
        case "BSD 3-Clause License":
            licenseType = "[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)";
            licenseSummary = "Licensed under the BSD 3-Clause License";
            break;
        case "Eclipse Public License":
            licenseType = "[![License](https://img.shields.io/badge/License-EPL%201.0-red.svg)](https://opensource.org/licenses/EPL-1.0)";
            licenseSummary = "Licensed under Eclipse Public License, Version 1.0 (EPL-1.0)";
            break;
        case "The MIT License":
            licenseType = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
            licenseSummary = "Licensed under the MIT license";
            break;
        default:
            licenseType = "";
            licenseSummary = "";
    }
}

function createSections() {
    writeBadge();
    table = "## Table of Contents \n * [Installation](#installation)\n * [Usage](#usage)\n * [Licenses](#licenses)\n * [Contributors](#Contributors)\n * [Tests](#tests)\n * [Questions](#questions)\n\n";
    description = "## Description \n " + userDescription + "\n\n";
    installation = "## Installation\n" + userInstallation + "\n\n";
    licenses = "## Licenses\n" + userLicenses + "---" + licenseSummary + "\n\n";
    usage = "## Usage\n" + userUsage + "\n\n";
    contributors = "## Contributors\n" + userContributors + "\n\n";
    tests = "## Tests\n" + userTests + "\n\n";
    anyQuestions = "## Questions\n" + "If you have any questions, find our Github page via " + userName + " or email us at " + email + "\n\n";

    documentBody = "# " + projectName + "\n\n" + licenseType + "\n" + description + table + installation + usage + licenses +  contributors + tests + anyQuestions;
}




// function call to initialize program
init();

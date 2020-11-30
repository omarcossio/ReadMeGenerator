const inquirer = require('inquirer');
const fs = require('fs');

var projectName;
var description;
var installation;
var licenses;
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
var email;

// array of questions for user
const questions = [

    "What is the title of your project?",
    "Give a quick description of your project",
    "What is the installation process?",
    "What are the licenses for your project?",
    "Who are the contributing members to this project?",
    "Do you have any tests you would like to add?",
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
                type: 'input',
                name: 'licenses',
                message: questions[3],
            },
            {
                type: 'input',
                name: 'contributors',
                message: questions[4],
            },
            {
                type: 'input',
                name: 'tests',
                message: questions[5],
            },
            {
                type: 'input',
                name: 'username',
                message: questions[6],
            },
            {
                type: 'input',
                name: 'email',
                message: questions[7],
            },
        ])
        .then((data) => {
            projectName = data.projectName;
            userDescription = data.description;
            userInstallation = data.installation;
            userLicenses = data.licenses; 
            userContributors = data.contributors;
            userTests = data.tests;
            userName = data.username;
            email = data.email;

            createSections();

            writeToFile("README.md", documentBody);
        });
}

function createSections(){
    table = "## Table of Contents \n *[Installation](#installation)\n *[Licenses](#licenses)\n *[contributos](#contributos)\n *[Tests](#tests)\n *[Questions](#questions)\n\n";
    description = "## Description \n " + userDescription + "\n\n";
    installation = "## Installation\n" + userInstallation + "\n\n";
    licenses = "## Licenses\n" + userLicenses + "\n\n";
    contributors = "## Contributors\n" + userContributors + "\n\n";
    tests = "## Tests\n" + userTests + "\n\n";
    anyQuestions = "## Questions\n" + "If you have any questions, find our Github page via " + userName + " or email us at " + email + "\n\n";

    documentBody = "# " + projectName  + "\n\n" + description + table + installation + licenses + contributors + tests + anyQuestions;
}




// function call to initialize program
init();

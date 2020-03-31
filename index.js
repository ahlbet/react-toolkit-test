const inquirer = require('inquirer');
const { buildChoices } = require('./utils/buildChoices');
const { exec } = require('child_process');
const { resolve } = require('path');

inquirer
  .prompt([
    {
      type: 'checkbox',
      message: 'Select Components',
      name: 'Components',
      choices: buildChoices(),
      validate: function(answer) {
        if (answer.length < 1) {
          return 'You must choose at least one component.';
        }

        return true;
      },
    },
  ])
  .then(answers => {
    let answersString = '';

    for (let i = 0; i < answers.Components.length; i++) {
      answersString += resolve(
        __dirname,
        `./components/${answers.Components[i]} `,
      );
    }

    // First, make a directory named components
    exec('mkdir components', (err, stdout, stderr) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
      }
    });

    // Second, copy and paste the chosen components into the new components directory
    exec(`cp -r ${answersString} components/`, (err, stdout, stderr) => {
      if (err) {
        //some err occurred
        console.error(err);
      } else {
        // the *entire* stdout and stderr (buffered)
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
      }
    });
  });

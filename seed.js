const bcrypt = require('bcryptjs');
const chalk = require('chalk');
const inquirer = require('inquirer');
const Admins = require('./models/admins');


const seedAdmin = async () => {
  const logInit = chalk.yellow('[!] Initializing Admin!');
  const adminExist = chalk.blue('[👌] admin exist');
  const adminCreated = chalk.green('[✅] admin created');
  // eslint-disable-next-line no-console
  console.log(logInit);
  inquirer
    .prompt([
      {
        type: 'password',
        name: 'password',
        message: 'password',
        mask: '*',
      },
      {
        name: 'email',
        message: 'email (default: admin@example.com)',
        default: 'admin@example.com',
      },
      {
        name: 'name',
        message: 'John Doe (default: John Doe)',
        default: "John Doe"
      },
    ])
    .then(async (ans) => {
      await Admins.findOne({email: ans.email}).then(
        (admin) => {
          if (admin) {
            console.log(adminExist)
          } else {
            bcrypt.hash(ans.password, 10).then((hash) => {
              const admin = new Admins({
                name: ans.name,
                password: hash,
                email: ans.email
              });
              admin.save().then(
                ()=> {console.log(adminCreated)}
              ).catch((error)=>{console.log(error)});
            })
          }
        }
      ).catch((err) => {console.log(chalk.red(err))})
    })
  
}

module.exports.seedAdmin = seedAdmin;

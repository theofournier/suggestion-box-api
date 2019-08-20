/* eslint-disable no-console */

const bcrypt = require('bcryptjs');
const db = require('../utils/db');

function initDb() {
  db.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``, (err) => {
    if (err) {
      console.log(err);
    }
  });

  db.query(`USE \`${process.env.DB_NAME}\``, (err) => {
    if (err) {
      console.log(err);
    }
  });

  db.query(`CREATE TABLE IF NOT EXISTS \`history\` (
    \`id\` int(11) NOT NULL AUTO_INCREMENT,
    \`date\` datetime DEFAULT NULL,
    \`adminId\` varchar(45) DEFAULT NULL,
    \`suggestionId\` int(11) DEFAULT NULL,
    \`modification\` json DEFAULT NULL,
    PRIMARY KEY (\`id\`)
  )`, (err) => {
    if (err) {
      console.log(err);
    }
  });

  db.query(`CREATE TABLE IF NOT EXISTS \`login\` (
    \`id\` int(11) NOT NULL AUTO_INCREMENT,
    \`login\` varchar(45) NOT NULL,
    \`password\` char(60) NOT NULL,
    PRIMARY KEY (\`id\`),
    UNIQUE KEY \`login_UNIQUE\` (\`login\`)
  )`, (err) => {
    if (err) {
      console.log(err);
    }
  });

  db.query(`CREATE TABLE IF NOT EXISTS \`suggestion\` (
    \`id\` int(11) NOT NULL AUTO_INCREMENT,
    \`date\` datetime DEFAULT NULL,
    \`contributorName\` varchar(50) DEFAULT NULL,
    \`contributorEmail\` varchar(50) DEFAULT NULL,
    \`contributorTeam\` varchar(50) DEFAULT NULL,
    \`category\` varchar(45) DEFAULT NULL,
    \`targetedSystem\` varchar(45) DEFAULT NULL,
    \`description\` text,
    \`personDayCurrent\` int(11) DEFAULT NULL,
    \`personDayFuture\` int(11) DEFAULT NULL,
    \`cost\` int DEFAULT NULL,
    \`gatewayStatus\` varchar(45) DEFAULT NULL,
    \`approvalStatus\` varchar(45) DEFAULT NULL,
    \`remark\` text,
    \`editDate\` datetime DEFAULT NULL,
    \`title\` text,
    PRIMARY KEY (\`id\`)
  )`, (err) => {
    if (err) {
      console.log(err);
    }
  });

  bcrypt.genSalt(10, (error, salt) => {
    // eslint-disable-next-line no-shadow
    bcrypt.hash(process.env.ADMIN_PASSWORD, salt, (error, hash) => {
      if (error) throw error;
      const insert = 'INSERT IGNORE INTO `login` (`login`, `password`) VALUES (?, ?);';
      db.query(insert, [process.env.ADMIN_LOGIN, hash], (err2) => {
        if (err2) {
          console.log(err2);
        }
      });
    });
  });
}

export default initDb;

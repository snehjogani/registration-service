module.exports = {
  DB_CREATIION: `
  CREATE SCHEMA IF NOT EXISTS \`assignment2\` DEFAULT CHARACTER SET latin1 ;
  USE \`assignment2\` ;

  -- -----------------------------------------------------
  -- Table \`assignment2\`.\`users\`
  -- -----------------------------------------------------

  CREATE TABLE IF NOT EXISTS \`assignment2\`.\`users\` (
    \`id\` INT(11) NOT NULL AUTO_INCREMENT,
    \`name\` VARCHAR(30) NULL DEFAULT NULL,
    \`email\` VARCHAR(255) NULL DEFAULT NULL,
    \`password\` VARCHAR(30) NULL DEFAULT NULL,
    \`topic\` VARCHAR(30) NULL DEFAULT NULL,
    PRIMARY KEY (\`id\`))
  ENGINE = InnoDB
  AUTO_INCREMENT = 11
  DEFAULT CHARACTER SET = latin1;
  `
};

-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema pixistore
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema pixistore
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `pixistore` DEFAULT CHARACTER SET utf8 ;
USE `pixistore` ;

-- -----------------------------------------------------
-- Table `pixistore`.`product`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `pixistore`.`product` ;

CREATE TABLE IF NOT EXISTS `pixistore`.`product` (
  `product_id` INT NOT NULL AUTO_INCREMENT,
  `product_name` VARCHAR(250) NOT NULL,
  `product_desc` VARCHAR(250) NULL DEFAULT NULL,
  `product_img` VARCHAR(250) NOT NULL,
  `product_img_mini` VARCHAR(250) NOT NULL,
  `product_price` FLOAT NOT NULL,
  `product_creation_date` DATE NOT NULL,
  PRIMARY KEY (`product_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `pixistore`.`item`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `pixistore`.`item` ;

CREATE TABLE IF NOT EXISTS `pixistore`.`item` (
  `item_id` INT NOT NULL AUTO_INCREMENT,
  `item_qty` INT NOT NULL,
  `item_product_id` INT NOT NULL,
  PRIMARY KEY (`item_id`),
  INDEX `fk_item_product_idx` (`item_qty` ASC) VISIBLE,
  INDEX `fk_item_product_idx1` (`item_product_id` ASC) VISIBLE,
  CONSTRAINT `fk_item_product`
    FOREIGN KEY (`item_product_id`)
    REFERENCES `pixistore`.`product` (`product_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

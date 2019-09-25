CREATE DATABASE  IF NOT EXISTS `evogsm` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci */;
USE `evogsm`;
-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: localhost    Database: evogsm
-- ------------------------------------------------------
-- Server version	5.7.26-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `gsm_device`
--

DROP TABLE IF EXISTS `gsm_device`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `gsm_device` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `BRAND` varchar(45) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `TYPE` varchar(45) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `DELETED` varchar(45) COLLATE utf8_hungarian_ci NOT NULL DEFAULT '0',
  `VERSION` int(65) NOT NULL DEFAULT '0',
  `CREATED_TS` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `CREATED_BY` varchar(45) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `MODIFIED_BY` varchar(45) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `MODIFIED_TS` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gsm_device`
--

LOCK TABLES `gsm_device` WRITE;
/*!40000 ALTER TABLE `gsm_device` DISABLE KEYS */;
INSERT INTO `gsm_device` VALUES (1,'Huawei','Honor 20','0',0,'2019-05-30 13:40:45',NULL,NULL,'2019-05-30 13:41:32'),(2,'Huawei','Honor 20 Pro','0',0,'2019-05-30 13:40:45',NULL,NULL,'2019-05-30 13:41:32'),(3,'Huawei','P Smart Z','0',0,'2019-05-30 13:40:45',NULL,NULL,'2019-05-30 13:41:32'),(4,'Huawei','Honor 20 Lite','0',0,'2019-05-30 13:40:45',NULL,NULL,'2019-05-30 13:41:32'),(5,'Huawei','Y7 Pro','0',0,'2019-05-30 13:40:45',NULL,NULL,'2019-05-30 13:41:32'),(6,'Huawei','Y5','0',0,'2019-05-30 13:40:45',NULL,NULL,'2019-05-30 13:41:32'),(7,'Huawei','Honor 20i','0',0,'2019-05-30 13:40:45',NULL,NULL,'2019-05-30 13:41:32'),(8,'Huawei','Y6 Prime','0',0,'2019-05-30 13:40:45',NULL,NULL,'2019-05-30 13:41:32'),(9,'Huawei','P30 Lite','0',0,'2019-05-30 13:40:45',NULL,NULL,'2019-05-30 13:41:32'),(10,'Huawei','P30','0',0,'2019-05-30 13:40:45',NULL,NULL,'2019-05-30 13:41:32'),(11,'Apple','iPhone Xs','0',0,'2019-05-30 13:40:45',NULL,NULL,'2019-05-30 13:41:32'),(12,'Apple','iPhone Xr','0',0,'2019-05-30 13:40:45',NULL,NULL,'2019-05-30 13:41:32'),(13,'Apple','iPhone Xs Max','0',0,'2019-05-30 13:40:45',NULL,NULL,'2019-05-30 13:41:32'),(14,'Apple','iPhone X','0',0,'2019-05-30 13:40:45',NULL,NULL,'2019-05-30 13:41:32'),(15,'Apple','iPhone 8','0',0,'2019-05-30 13:40:45',NULL,NULL,'2019-05-30 13:41:32'),(16,'Apple','iPhone 8 Plus','0',0,'2019-05-30 13:40:45',NULL,NULL,'2019-05-30 13:41:32'),(17,'Apple','iPhone 7','0',0,'2019-05-30 13:40:45',NULL,NULL,'2019-05-30 13:41:32'),(18,'Apple','iPhone 7 Plus','0',0,'2019-05-30 13:40:45',NULL,NULL,'2019-05-30 13:41:32'),(19,'Apple','iPhone SE','0',0,'2019-05-30 13:40:45',NULL,NULL,'2019-05-30 13:41:32'),(20,'Apple','iPhone 6s','0',0,'2019-05-30 13:40:45',NULL,NULL,'2019-05-30 13:41:32');
/*!40000 ALTER TABLE `gsm_device` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gsm_item`
--

DROP TABLE IF EXISTS `gsm_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `gsm_item` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `IMEI` varchar(15) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `USED` tinyint(4) DEFAULT NULL,
  `SECURITY_CODE` varchar(45) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `MODEL_NR` varchar(45) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `WARRANTY_EXPIRY` date DEFAULT NULL,
  `GSM_DEVICE_ID` int(11) NOT NULL,
  `DELETED` varchar(45) COLLATE utf8_hungarian_ci NOT NULL DEFAULT '0',
  `VERSION` int(65) NOT NULL DEFAULT '0',
  `CREATED_TS` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `CREATED_BY` varchar(45) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `MODIFIED_BY` varchar(45) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `MODIFIED_TS` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`),
  KEY `fk_gsm_item_gsm_device_idx` (`GSM_DEVICE_ID`),
  CONSTRAINT `fk_gsm_item_gsm_device` FOREIGN KEY (`GSM_DEVICE_ID`) REFERENCES `gsm_device` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gsm_item`
--

LOCK TABLES `gsm_item` WRITE;
/*!40000 ALTER TABLE `gsm_item` DISABLE KEYS */;
INSERT INTO `gsm_item` VALUES (1,'104322908484002',1,'3144','M8CTIHO','2019-06-20',1,'0',0,'2019-05-30 13:41:53',NULL,NULL,'2019-05-30 13:42:44'),(2,'987709187228187',0,'6546','7HWKQ19','2019-06-11',2,'0',0,'2019-05-30 13:41:56',NULL,NULL,'2019-05-30 13:42:44'),(3,'496974856324048',1,'8290','WHMNGGW','2019-07-09',3,'0',0,'2019-05-30 13:41:58',NULL,NULL,'2019-05-30 13:42:44'),(4,'307705103713602',0,'6987','VTUUPY1','2019-07-10',4,'0',0,'2019-05-30 13:41:59',NULL,NULL,'2019-05-30 13:42:44'),(5,'530243302661272',1,'8172','M6Z772Q','2019-08-13',5,'0',0,'2019-05-30 13:42:00',NULL,NULL,'2019-05-30 13:42:44'),(6,'537291199732436',0,'8551','YZ9JHBR','2019-09-18',6,'0',0,'2019-05-30 13:42:01',NULL,NULL,'2019-05-30 13:42:44'),(7,'500945581333847',1,'1464','3OFEFY4','2019-10-08',7,'0',0,'2019-05-30 13:42:02',NULL,NULL,'2019-05-30 13:42:44'),(8,'987683227759446',0,'3168','7WT9L65','2019-10-17',8,'0',0,'2019-05-30 13:42:03',NULL,NULL,'2019-05-30 13:42:44'),(9,'523918173551749',1,'5956','Q2GN35X','2019-10-18',9,'0',0,'2019-05-30 13:42:04',NULL,NULL,'2019-05-30 13:42:44'),(10,'866880030707796',0,'1043','DB915LX','2019-10-25',10,'0',0,'2019-05-30 13:42:05',NULL,NULL,'2019-05-30 13:42:44'),(11,'504928657003326',1,'4843','QMTGZ7T','2019-11-07',11,'0',0,'2019-05-30 13:42:06',NULL,NULL,'2019-05-30 13:42:44'),(12,'501343650756743',0,'5070','NRPO9EM','2019-11-11',12,'0',0,'2019-05-30 13:42:07',NULL,NULL,'2019-05-30 13:42:44'),(13,'306388919476085',1,'3220','U79VZTX','2019-11-13',13,'0',0,'2019-05-30 13:42:07',NULL,NULL,'2019-05-30 13:42:44'),(14,'532687265898719',0,'1329','WWX1KGC','2019-11-14',14,'0',0,'2019-05-30 13:42:08',NULL,NULL,'2019-05-30 13:42:44'),(15,'516239459457819',1,'6671','N7O956E','2019-11-18',15,'0',0,'2019-05-30 13:42:10',NULL,NULL,'2019-05-30 13:42:44'),(16,'510915824535993',0,'8003','MI0Y58Z','2019-12-03',16,'0',0,'2019-05-30 13:42:10',NULL,NULL,'2019-05-30 13:42:44'),(17,'519892515907180',1,'9381','FXWCFH2','2019-12-10',17,'0',0,'2019-05-30 13:42:11',NULL,NULL,'2019-05-30 13:42:44'),(18,'452541151444375',0,'8078','ZTJGMXM','2019-12-12',18,'0',0,'2019-05-30 13:42:12',NULL,NULL,'2019-05-30 13:42:44'),(19,'527677012319496',1,'8871','WQ7BQAD','2019-12-17',19,'0',0,'2019-05-30 13:42:13',NULL,NULL,'2019-05-30 13:42:44'),(20,'337306070007427',0,'7430','LKV65H9','2019-07-22',20,'0',0,'2019-05-30 13:42:15',NULL,NULL,'2019-05-30 13:42:44');
/*!40000 ALTER TABLE `gsm_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gsm_partner`
--

DROP TABLE IF EXISTS `gsm_partner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `gsm_partner` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(45) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `EMAIL` varchar(45) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `PHONE` varchar(45) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `PERSONAL_ID` varchar(45) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `POSTAL_CODE` varchar(45) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `CITY` varchar(45) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `STREET` varchar(45) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `STREET_NUMBER` varchar(45) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `DELETED` varchar(45) COLLATE utf8_hungarian_ci NOT NULL DEFAULT '0',
  `VERSION` int(65) NOT NULL DEFAULT '0',
  `CREATED_TS` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `CREATED_BY` varchar(45) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `MODIFIED_BY` varchar(45) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `MODIFIED_TS` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gsm_partner`
--

LOCK TABLES `gsm_partner` WRITE;
/*!40000 ALTER TABLE `gsm_partner` DISABLE KEYS */;
INSERT INTO `gsm_partner` VALUES (1,'Nemes Zalán','olakatos@torok.biz','+36302875330','991156DY','2030','Érd','Hunyadi János u.','46','0',0,'2019-05-30 14:19:40',NULL,NULL,'2019-05-30 14:20:37'),(2,'Péter Ernő','dbarta@peter.com','+36208497595','770014HI','1014','Budapest','Szőke mélyút','141','0',0,'2019-05-30 14:19:40',NULL,NULL,'2019-05-30 14:20:37'),(3,'Váradi Barna','barnad66@szekeres.info','+36705562736','030167PB','1016','Budapest','Zsolt u.','22','0',0,'2019-05-30 14:19:40',NULL,NULL,'2019-05-30 14:20:37'),(4,'Orsós Panna','orsos.panna@soos.org','+36303048927','197171JV','1112','Budapest','Gulyás u.','91','0',0,'2019-05-30 14:19:40',NULL,NULL,'2019-05-30 14:20:37'),(5,'Tóth Jázmin','jazmin88@jakab.info','+36203330273','452185RU','1081',' Budapest','Dorián köz','4','0',0,'2019-05-30 14:19:40',NULL,NULL,'2019-05-30 14:20:37'),(6,'Pásztor Rudolf','rpasztor@gmail.com','+36702384511','498841RZ','1075','Budapest','Bálint udvar','37','0',0,'2019-05-30 14:19:40',NULL,NULL,'2019-05-30 14:20:37'),(7,'Barta Marianna','noel38@yahoo.com','+36305362532','868039VF','1116','Budapest','Hunyadi Mátyás út','38','0',0,'2019-05-30 14:19:40',NULL,NULL,'2019-05-30 14:20:37'),(8,'Váradi Katalin','kati93@gmail.com','+36203898010','795521ER','1103','Budapest','Pásztor tere','83','0',0,'2019-05-30 14:19:40',NULL,NULL,'2019-05-30 14:20:37'),(9,'Kelemen Flóra','major.flora@gmail.com','+36707267261','032357JP','1107','Budapest','Végh tere','75','0',0,'2019-05-30 14:19:40',NULL,NULL,'2019-05-30 14:20:37'),(10,'Jakab Bettina','jakab.bettina@gmail.com','+36308072056','350644HV','1113','Budapest','Zita útja','1','0',0,'2019-05-30 14:19:40',NULL,NULL,'2019-05-30 14:20:37'),(11,'Lakatos Márton','lmarton@hotmail.com','+36203614065','676855PK','1212','Budapest','Szent István út','67','0',0,'2019-05-30 14:19:40',NULL,NULL,'2019-05-30 14:20:37'),(12,'Hegedűs Ármin','armin.hegedus@szucs.biz','+36702062509','437510HQ','1116','Budapest','Marietta útja','79','0',0,'2019-05-30 14:19:40',NULL,NULL,'2019-05-30 14:20:37'),(13,'Papp Balázsné','ocsonka@nemes.net','+36303786928','942881UG','1098','Budapest','Hegedűs gát','1','0',0,'2019-05-30 14:19:40',NULL,NULL,'2019-05-30 14:20:37'),(14,'Fodor Szabina','fszabina28@barta.com','+36203706504','161844UL','1108','Budapest','Hajdu hatatársor','74','0',0,'2019-05-30 14:19:40',NULL,NULL,'2019-05-30 14:20:37'),(15,'Veres Milán','veres.milan@hotmail.com','+36702743787','698717WB','1118','Budapest','Hegedűs udvar','42','0',0,'2019-05-30 14:19:40',NULL,NULL,'2019-05-30 14:20:37'),(16,'Bálint Mihály','balint.misi@gaspar.info','+36303765820','859564ZS','1038','Budapest','Pataki átjáró','59','0',0,'2019-05-30 14:19:40',NULL,NULL,'2019-05-30 14:20:37'),(17,'Orosz Hunor','xhunor@gmail.com','+36204437498','804747AP','1021','Budapest','Papp körönd','2','0',0,'2019-05-30 14:19:40',NULL,NULL,'2019-05-30 14:20:37'),(18,'Rácz Zsoltné','zsoltne.racz@gmail.com','+36701179314','375722MM','1012','Budapest','Balla u.','24','0',0,'2019-05-30 14:19:40',NULL,NULL,'2019-05-30 14:20:37'),(19,'Dudás Imre','adudas@yahoo.com','+36300208522','075631UF','1015','Budapest','Zoltán határút','44','0',0,'2019-05-30 14:19:40',NULL,NULL,'2019-05-30 14:20:37'),(20,'Szekeres Vince','vince63@hotmail.com','+36208682119','593819LP','1086','Budapest','Tamás kert','118','0',0,'2019-05-30 14:19:40',NULL,NULL,'2019-05-30 14:20:37');
/*!40000 ALTER TABLE `gsm_partner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gsm_service`
--

DROP TABLE IF EXISTS `gsm_service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `gsm_service` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `GSM_PARTNER_ID` int(11) NOT NULL,
  `DELETED` varchar(45) COLLATE utf8_hungarian_ci NOT NULL DEFAULT '0',
  `VERSION` int(65) NOT NULL DEFAULT '0',
  `CREATED_TS` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `CREATED_BY` varchar(45) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `MODIFIED_BY` varchar(45) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `MODIFIED_TS` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `GSM_ITEM_ID` int(11) NOT NULL,
  `GSM_WORKSHEET_ID` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `fk_gsm_service_gsm_partner1_idx` (`GSM_PARTNER_ID`),
  KEY `fk_gsm_service_gsm_item1_idx` (`GSM_ITEM_ID`),
  KEY `fk_gsm_service_gsm_worksheet1_idx` (`GSM_WORKSHEET_ID`),
  CONSTRAINT `fk_gsm_service_gsm_item1` FOREIGN KEY (`GSM_ITEM_ID`) REFERENCES `gsm_item` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_gsm_service_gsm_partner1` FOREIGN KEY (`GSM_PARTNER_ID`) REFERENCES `gsm_partner` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_gsm_service_gsm_worksheet1` FOREIGN KEY (`GSM_WORKSHEET_ID`) REFERENCES `gsm_worksheet` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gsm_service`
--

LOCK TABLES `gsm_service` WRITE;
/*!40000 ALTER TABLE `gsm_service` DISABLE KEYS */;
/*!40000 ALTER TABLE `gsm_service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gsm_storage`
--

DROP TABLE IF EXISTS `gsm_storage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `gsm_storage` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `SOLD` tinyint(4) DEFAULT NULL,
  `BUY_PRICE` double DEFAULT NULL,
  `SALE_PRICE` double DEFAULT NULL,
  `GSM_PARTNER_ID` int(11) NOT NULL,
  `GSM_PARTNER2_ID` int(11) DEFAULT NULL,
  `GSM_ITEM_ID` int(11) NOT NULL,
  `DELETED` varchar(45) COLLATE utf8_hungarian_ci NOT NULL DEFAULT '0',
  `VERSION` int(65) NOT NULL DEFAULT '0',
  `CREATED_TS` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `CREATED_BY` varchar(45) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `MODIFIED_BY` varchar(45) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `MODIFIED_TS` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`),
  KEY `fk_gsm_storage_gsm_partner1_idx` (`GSM_PARTNER_ID`),
  KEY `fk_gsm_storage_gsm_item1_idx` (`GSM_ITEM_ID`),
  KEY `fk_gsm_storage_gsm_partner2_idx` (`GSM_PARTNER2_ID`),
  CONSTRAINT `fk_gsm_storage_gsm_item1` FOREIGN KEY (`GSM_ITEM_ID`) REFERENCES `gsm_item` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_gsm_storage_gsm_partner1` FOREIGN KEY (`GSM_PARTNER_ID`) REFERENCES `gsm_partner` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_gsm_storage_gsm_partner2` FOREIGN KEY (`GSM_PARTNER2_ID`) REFERENCES `gsm_partner` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gsm_storage`
--

LOCK TABLES `gsm_storage` WRITE;
/*!40000 ALTER TABLE `gsm_storage` DISABLE KEYS */;
INSERT INTO `gsm_storage` VALUES (1,0,296215,NULL,1,NULL,1,'0',0,'2019-05-30 16:22:02',NULL,NULL,'2019-05-30 16:22:23'),(2,0,143989,NULL,2,NULL,2,'0',0,'2019-05-30 16:22:02',NULL,NULL,'2019-05-30 16:22:23'),(3,0,333800,NULL,3,NULL,3,'0',0,'2019-05-30 16:22:02',NULL,NULL,'2019-05-30 16:22:23'),(4,0,340034,NULL,4,NULL,4,'0',0,'2019-05-30 16:22:02',NULL,NULL,'2019-05-30 16:22:23'),(5,0,270110,NULL,5,NULL,5,'0',0,'2019-05-30 16:22:02',NULL,NULL,'2019-05-30 16:22:23'),(6,1,253548,412060,6,NULL,6,'0',0,'2019-05-30 16:22:02',NULL,NULL,'2019-05-30 16:22:23'),(7,1,270110,439720,7,NULL,7,'0',0,'2019-05-30 16:22:02',NULL,NULL,'2019-05-30 16:22:23'),(8,1,251798,612696,8,NULL,8,'0',0,'2019-05-30 16:22:02',NULL,NULL,'2019-05-30 16:22:23'),(9,1,495566,522645,9,NULL,9,'0',0,'2019-05-30 16:22:02',NULL,NULL,'2019-05-30 16:22:23'),(10,1,382994,529649,10,NULL,10,'0',0,'2019-05-30 16:22:02',NULL,NULL,'2019-05-30 16:22:23');
/*!40000 ALTER TABLE `gsm_storage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gsm_worksheet`
--

DROP TABLE IF EXISTS `gsm_worksheet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `gsm_worksheet` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `STATUS` varchar(45) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `DAMAGE_DESCRIPTION` varchar(3000) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `IMG_1` varchar(255) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `IMG_2` varchar(255) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `IMG_3` varchar(255) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `WORK_HOURS` int(11) DEFAULT NULL,
  `MATERIAL_PRICE` double DEFAULT NULL,
  `SERVICE_PRICE` double DEFAULT NULL,
  `DELETED` varchar(45) COLLATE utf8_hungarian_ci NOT NULL DEFAULT '0',
  `VERSION` int(65) NOT NULL DEFAULT '0',
  `CREATED_TS` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `CREATED_BY` varchar(45) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `MODIFIED_BY` varchar(45) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `MODIFIED_TS` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gsm_worksheet`
--

LOCK TABLES `gsm_worksheet` WRITE;
/*!40000 ALTER TABLE `gsm_worksheet` DISABLE KEYS */;
/*!40000 ALTER TABLE `gsm_worksheet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user` (
  `ID` int(11) NOT NULL,
  `USERNAME` varchar(45) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `PASSWORD` varchar(65) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `ROLE` varchar(20) COLLATE utf8_hungarian_ci DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'evoadmin','7d0b775d6cbca07929abcbd06eb5c5f5db8a3856fb7cf61974df96ef055d8988','admin');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-09-17 15:03:45

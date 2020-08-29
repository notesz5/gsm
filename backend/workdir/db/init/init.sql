CREATE DATABASE  IF NOT EXISTS `gsm` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci */;
USE `gsm`;
-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: localhost    Database: gsm
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
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gsm_device`
--

LOCK TABLES `gsm_device` WRITE;
/*!40000 ALTER TABLE `gsm_device` DISABLE KEYS */;
INSERT INTO `gsm_device` VALUES (1,'Huawei','Honor 20','0'),(2,'Huawei','Honor 20 Pro','0'),(3,'Huawei','P Smart Z','0'),(4,'Huawei','Honor 20 Lite','0'),(5,'Huawei','Y7 Pro','0'),(6,'Huawei','Y5','0'),(7,'Huawei','Honor 20i','0'),(8,'Huawei','Y6 Prime','0'),(9,'Huawei','P30 Lite','0'),(10,'Huawei','P30','0'),(11,'Apple','iPhone Xs','0'),(12,'Apple','iPhone Xr','0'),(13,'Apple','iPhone Xs Max','0'),(14,'Apple','iPhone X','0'),(15,'Apple','iPhone 8','0'),(16,'Apple','iPhone 8 Plus','0'),(17,'Apple','iPhone 7','0'),(18,'Apple','iPhone 7 Plus','0'),(19,'Apple','iPhone SE','0'),(20,'Apple','iPhone 6s','0'),(22,'Samsung','S9','0'),(23,'OnePlus','7T','0'),(24,'Samsung','Galaxy S10','0'),(25,'Samsung','Galaxy Note 10','0'),(26,'Huawei','P30 Pro','0'),(27,'Apple','iPhone 11','0'),(28,'Apple','iPhone 5','0'),(29,'Google','Pixel 4','0'),(30,'Xiaomi','Mi 9','0'),(31,'Google','Pixel 3','0'),(32,'Xiaomi','Mi Note 10 Pro','0'),(33,'LG','G8','0');
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
  `GSM_DEVICE_ID` int(11) NOT NULL,
  `DELETED` varchar(45) COLLATE utf8_hungarian_ci NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`),
  KEY `fk_gsm_item_gsm_device_idx` (`GSM_DEVICE_ID`),
  CONSTRAINT `fk_gsm_item_gsm_device` FOREIGN KEY (`GSM_DEVICE_ID`) REFERENCES `gsm_device` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gsm_item`
--

LOCK TABLES `gsm_item` WRITE;
/*!40000 ALTER TABLE `gsm_item` DISABLE KEYS */;
INSERT INTO `gsm_item` VALUES (1,'104322908484002',1,15,'0'),(2,'987709187228187',0,2,'0'),(3,'496974856324048',1,3,'0'),(4,'307705103713602',0,4,'0'),(5,'530243302661272',0,5,'0'),(6,'537291199732436',0,6,'0'),(7,'500945581333847',1,7,'0'),(8,'987683227759446',0,8,'0'),(9,'523918173551749',1,9,'0'),(10,'866880030707796',0,10,'0'),(11,'504928657003326',1,11,'0'),(12,'501343650756743',0,12,'0'),(13,'306388919476085',1,13,'0'),(14,'532687265898719',0,14,'0'),(15,'516239459457819',1,15,'0'),(16,'510915824535993',0,16,'0'),(17,'519892515907180',1,17,'0'),(18,'452541151444375',0,18,'0'),(19,'527677012319496',1,19,'0'),(20,'337306070007427',0,20,'0'),(24,'520815183483561',1,13,'0'),(25,'491284421480994',0,1,'0'),(26,'333253288891222',1,23,'0'),(29,'513808878264221',0,25,'0'),(35,'986652805425275',1,26,'0'),(36,'915672804759041',1,27,'0'),(37,'522074786639439',0,28,'0'),(38,'155154545454545',1,12,'0'),(39,'125762325613263',1,25,'0'),(40,'149976262336262',1,29,'0'),(41,'465678799522223',1,30,'0'),(42,'145557478888899',1,30,'0'),(43,'145564484956624',0,31,'0'),(44,'989562674941165',1,29,'0'),(45,'156565654554545',1,29,'0'),(46,'156565654554545',1,29,'0'),(47,'144415216415566',1,29,'0'),(48,'111111111111111',1,30,'0'),(49,'222222222222222',1,30,'0'),(50,'469856666467889',1,24,'0'),(51,'687489489618587',1,32,'0'),(52,'145154784148162',1,23,'0'),(53,'149696156656564',1,17,'0'),(54,'414116616458865',1,32,'0'),(55,'251451748979511',1,30,'0'),(56,'146995462758465',1,32,'0'),(57,'466879562646646',1,23,'0'),(58,'789987789987789',1,29,'0'),(59,'456654456654456',1,31,'0'),(60,'789987789987789',1,10,'0'),(61,'748521348665656',1,9,'0'),(62,'149998785663235',1,23,'0'),(63,'156566999877777',1,29,'0'),(64,'147899999999965',1,31,'0'),(65,'162696462366158',0,33,'0'),(66,'151515151515155',1,12,'0'),(67,'659889526262626',1,30,'0'),(68,'156667999989979',1,13,'0'),(69,'446565656566455',1,31,'0'),(70,'789456123123123',1,33,'0'),(71,'146578978979890',1,1,'0'),(72,'156565656677779',1,24,'0'),(73,'156589859898977',1,14,'0'),(74,'145565656564655',1,12,'0'),(75,'145665689989898',1,33,'0'),(76,'148998989878456',1,12,'0'),(77,'146568589895996',1,24,'0'),(78,'144162685865285',1,33,'0'),(79,'146598596524621',1,33,'0'),(80,'145654565665656',1,29,'0'),(81,'145654565665656',1,29,'0'),(82,'146598564745219',1,32,'0'),(83,'146896985248565',1,23,'0'),(84,'156589656565656',1,24,'0'),(85,'114516216415456',1,32,'0'),(86,'514565416454445',1,23,'0'),(87,'156655674445645',0,25,'0'),(88,'146565655478565',1,23,'0'),(89,'156541648515455',1,32,'0'),(90,'454556656564546',1,31,'0'),(91,'156565665656556',1,25,'0'),(92,'418594846974674',0,23,'0'),(93,'146667846892336',1,31,'0'),(94,'415656564546556',1,24,'0'),(95,'178945632189695',1,32,'0');
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
  `POSTAL_CODE` varchar(45) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `CITY` varchar(45) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `STREET` varchar(45) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `STREET_NUMBER` varchar(45) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `DELETED` varchar(45) COLLATE utf8_hungarian_ci NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gsm_partner`
--

LOCK TABLES `gsm_partner` WRITE;
/*!40000 ALTER TABLE `gsm_partner` DISABLE KEYS */;
INSERT INTO `gsm_partner` VALUES (1,'Nemes Zoltán','olakatos@torok.bi','36302875331','2030','Érd','Hunyadi u.','49','0'),(2,'Péter Ernő','dbarta@peter.com','+36208497595','1014','Budapest','Szőke mélyút','141','0'),(3,'Váradi Barna','barnad66@szekeres.info','+36705562736','1016','Budapest','Zsolt u.','22','0'),(4,'Orsós Panna','orsos.panna@soos.org','+36303048927','1112','Budapest','Gulyás u.','91','0'),(5,'Tóth Jázmin','jazmin88@jakab.info','+36203330273','1081',' Budapest','Dorián köz','4','0'),(6,'Pásztor Rudolf','rpasztor@gmail.com','+36702384511','1075','Budapest','Bálint udvar','37','0'),(7,'Barta Marianna','noel38@yahoo.com','+36305362532','1116','Budapest','Hunyadi Mátyás út','38','0'),(8,'Váradi Katalin','kati93@gmail.com','+36203898010','1103','Budapest','Pásztor tere','83','0'),(9,'Kelemen Flóra','major.flora@gmail.com','+36707267261','1107','Budapest','Végh tere','75','0'),(10,'Jakab Bettina','jakab.bettina@gmail.com','+36308072056','1113','Budapest','Zita útja','1','0'),(11,'Lakatos Márton','lmarton@hotmail.com','+36203614065','1212','Budapest','Szent István út','67','0'),(12,'Hegedűs Ármin','armin.hegedus@szucs.biz','+36702062509','1116','Budapest','Marietta útja','79','0'),(13,'Papp Balázsné','ocsonka@nemes.net','+36303786928','1098','Budapest','Hegedűs gát','1','0'),(14,'Fodor Szabina','fszabina28@barta.com','+36203706504','1108','Budapest','Hajdú határsor','74','0'),(15,'Veres Milán','veres.milan@hotmail.com','+36702743787','1118','Budapest','Hegedűs udvar','42','0'),(16,'Bálint Mihály','balint.misi@gaspar.info','+36303765820','1038','Budapest','Pataki átjáró','59','0'),(17,'Orosz Hunor','xhunor@gmail.com','+36204437498','1021','Budapest','Papp körönd','2','0'),(18,'Rácz Zsoltné','zsoltne.racz@gmail.com','+36701179314','1012','Budapest','Balla u.','24','0'),(19,'Dudás Imre','adudas@yahoo.com','+36300208522','1015','Budapest','Zoltán határút','44','0'),(20,'Szekeres Vince','vince63@hotmail.com','+36208682119','1086','Budapest','Tamás kert','118','0'),(23,'Kovács Kornél','kovacskornel@gmail.com','+36201114415','1091','Budapest','Mester u. ','44','0'),(24,'Szabó Béla','szabobela@citromail.hu','+36704256682','1101','Budapest','Talizmán u.','42','0'),(25,'Vas Elemér','vaselem@gmail.com','54545488888','1515','Budapest','Akácfa u.','15','0'),(26,'Noah Varran','nvarran0@va.gov','35135227590','4720','Além','Hoard','989','0'),(27,'Arturo Matus','amatus1@reference.com','48140445478','7320','Choszczno','Forest','763','0'),(28,'Peirce Birdwhistle','pbirdwhistlef@list-manage.com','35823626106','7180','Chengzhai','Crescent Oaks','2895','0'),(29,'Ursa Plumer','uplumerg@google.de','92283523264','7220','Naranjo','Raven','537','0'),(30,'Wake Blazeby','wblazeby4@hc360.com','92838669097','4349','Nagrog','Superior','40','0'),(31,'Salomon Smaling','ssmalingc@oracle.com','+63507574707','5702','Aurelliana','Bay street','7757','0'),(32,'Glori Fairs','gfairsh@independent.co.uk','63213282561','3102','Baliton','Arapahoe','2508','0');
/*!40000 ALTER TABLE `gsm_partner` ENABLE KEYS */;
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
  PRIMARY KEY (`ID`),
  KEY `fk_gsm_storage_gsm_partner1_idx` (`GSM_PARTNER_ID`),
  KEY `fk_gsm_storage_gsm_item1_idx` (`GSM_ITEM_ID`),
  KEY `fk_gsm_storage_gsm_partner2_idx` (`GSM_PARTNER2_ID`),
  CONSTRAINT `fk_gsm_storage_gsm_item1` FOREIGN KEY (`GSM_ITEM_ID`) REFERENCES `gsm_item` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_gsm_storage_gsm_partner1` FOREIGN KEY (`GSM_PARTNER_ID`) REFERENCES `gsm_partner` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_gsm_storage_gsm_partner2` FOREIGN KEY (`GSM_PARTNER2_ID`) REFERENCES `gsm_partner` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gsm_storage`
--

LOCK TABLES `gsm_storage` WRITE;
/*!40000 ALTER TABLE `gsm_storage` DISABLE KEYS */;
INSERT INTO `gsm_storage` VALUES (0,1,156666,146999,6,25,1,'0'),(1,1,143989,150000,2,6,2,'0'),(2,1,333800,125670,3,9,3,'0'),(3,1,340034,15666,4,2,4,'0'),(4,1,142665,156666,5,1,5,'0'),(5,1,253548,412060,6,11,6,'0'),(6,1,270110,439720,7,12,7,'0'),(7,1,251798,612696,8,13,8,'0'),(8,1,495566,522645,9,14,9,'0'),(9,1,382994,529649,10,15,10,'0'),(10,1,359947,166333,16,1,11,'0'),(11,1,295723,66666,17,1,12,'0'),(12,1,303342,200000,18,2,13,'0'),(13,1,213082,169999,19,8,14,'0'),(14,1,238236,15555,20,8,15,'0'),(18,1,150001,156666,20,7,24,'0'),(19,1,140000,250000,7,1,25,'0'),(20,1,200000,15666,24,2,26,'0'),(23,1,400000,265488,17,7,29,'0'),(29,1,300000,157995,2,3,35,'0'),(30,1,400000,166669,24,2,36,'0'),(31,0,60000,NULL,23,NULL,37,'0'),(32,1,15555,156666,2,9,38,'0'),(33,1,15215,146664,25,30,39,'0'),(34,1,182000,200000,6,3,40,'0'),(35,0,110000,NULL,11,NULL,41,'0'),(36,0,109000,NULL,12,NULL,42,'0'),(37,0,156646,NULL,10,NULL,43,'0'),(38,0,150000,NULL,1,NULL,44,'0'),(39,0,150000,NULL,1,NULL,45,'0'),(40,0,152000,NULL,1,NULL,46,'0'),(41,0,147926,NULL,6,NULL,47,'0'),(42,0,111111,NULL,8,NULL,48,'0'),(43,0,222222,NULL,25,NULL,49,'0'),(44,0,115777,NULL,6,NULL,50,'0'),(45,0,152200,NULL,6,NULL,51,'0'),(46,0,444444,NULL,6,NULL,52,'0'),(47,1,332333,200000,6,8,53,'0'),(48,1,144444,168965,20,30,54,'0'),(49,1,149595,185296,20,7,55,'0'),(50,0,154554,NULL,6,NULL,56,'0'),(51,0,156697,NULL,8,NULL,57,'0'),(52,0,123456,NULL,24,NULL,58,'0'),(53,0,456789,NULL,24,NULL,59,'0'),(54,0,123456,NULL,7,NULL,60,'0'),(55,0,154699,NULL,7,NULL,61,'0'),(56,0,199898,NULL,11,NULL,62,'0'),(57,0,415455,NULL,11,NULL,63,'0'),(58,0,156655,NULL,5,NULL,64,'0'),(59,0,400000,NULL,18,NULL,65,'0'),(60,0,115555,NULL,3,NULL,66,'0'),(61,1,157656,169999,8,2,67,'0'),(62,0,156664,NULL,11,NULL,68,'0'),(63,0,145666,NULL,8,NULL,69,'0'),(64,0,149978,NULL,10,NULL,70,'0'),(65,0,156565,NULL,10,NULL,71,'0'),(66,0,156465,NULL,7,NULL,72,'0'),(67,0,156564,NULL,8,NULL,73,'0'),(68,0,200000,NULL,1,NULL,74,'0'),(69,0,152990,NULL,1,NULL,75,'0'),(70,0,152000,NULL,2,NULL,76,'0'),(71,1,146999,156999,30,5,77,'0'),(72,0,156868,NULL,9,NULL,78,'0'),(73,1,212626,220000,30,9,79,'0'),(74,0,156650,NULL,8,NULL,80,'0'),(75,0,156650,NULL,8,NULL,81,'0'),(76,0,156646,NULL,7,NULL,82,'0'),(77,0,158888,NULL,7,NULL,83,'0'),(78,0,1566556,NULL,7,NULL,84,'0'),(79,1,156666,176988,30,24,85,'0'),(80,0,156666,NULL,7,NULL,86,'0'),(81,0,156626,NULL,5,NULL,87,'0'),(82,0,156666,NULL,2,NULL,88,'0'),(83,0,156666,NULL,10,NULL,89,'0'),(84,0,156666,NULL,8,NULL,90,'0'),(85,0,320000,NULL,6,NULL,91,'0'),(86,0,156666,NULL,9,NULL,92,'0'),(87,0,156744,NULL,8,NULL,93,'0'),(88,0,156647,NULL,6,NULL,94,'0'),(89,0,145000,NULL,1,NULL,95,'0');
/*!40000 ALTER TABLE `gsm_storage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `USERNAME` varchar(45) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `PASSWORD` varchar(65) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `ROLE` varchar(20) COLLATE utf8_hungarian_ci DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin','8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918','admin'),(2,'guest','84983c60f7daadc1cb8698621f802c0d9f9a3c3c295c810748fb048115c186ec','guest');
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

-- Dump completed on 2020-08-25  2:38:44
